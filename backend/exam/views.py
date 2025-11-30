# exam/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .firebase_config import db
from firebase_admin import auth as firebase_auth
from google.cloud.firestore_v1 import DELETE_FIELD


class ExamBillView(APIView):
    def post(self, request):
        try:
            # getting token from header in frontend 
            id_token = request.headers.get("Authorization").split(" ")[1]
            # allow small clock skew to account for minor client/server clock differences
            decoded_token = firebase_auth.verify_id_token(id_token, clock_skew_seconds=60)
            uid = decoded_token["uid"]

            # saving the data in firebase collections
            data = request.data
            db.collection("examBills").add({**data, "uid": uid})

            return Response({"message": "Form saved successfully!"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserDataView(APIView):
    def get(self, request):
        try:
            # Check for token
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                return Response({"error": "Missing token"}, status=status.HTTP_401_UNAUTHORIZED)

            token = auth_header.split(" ")[1]
            # allow small clock skew
            decoded = firebase_auth.verify_id_token(token, clock_skew_seconds=60)
            uid = decoded["uid"]

            # Fetch user document
            doc = db.collection("users").document(uid).get()

            if not doc.exists:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            return Response(doc.to_dict(), status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class AdminExamBillList(APIView):
    def get(self, request):
        try:
            print("🔵 Admin API called")

            # 1. Check token
            auth_header = request.headers.get("Authorization")
            print("🔵 Received header:", auth_header)

            if not auth_header:
                print("❌ Missing Authorization Header")
                return Response({"error": "Missing token"}, status=401)

            token = auth_header.split(" ")[1]
            print("🔵 Token:", token[:20], "...")

            # 2. Decode
            # allow small clock skew
            decoded = firebase_auth.verify_id_token(token, clock_skew_seconds=60)
            print("✅ Token decoded:", decoded)

            uid = decoded["uid"]
            print("🔵 UID =", uid)

            # 3. Fetch user data
            user_doc = db.collection("users").document(uid).get()
            print("🔵 UserDoc exists?", user_doc.exists)

            if not user_doc.exists:
                print("❌ User not found in Firestore")
                return Response({"error": "User not found"}, status=404)

            user = user_doc.to_dict()
            print("🔵 USER DATA:", user)

            if user.get("role") != "admin":
                print("❌ User is not admin")
                return Response({"error": "Access denied"}, status=403)

            # 4. Fetch all exam bills
            docs = db.collection("examBills").get()
            forms = [{"id": d.id, **d.to_dict()} for d in docs]

            print("✅ Total exam bills:", len(forms))

            return Response(forms, status=200)

        except Exception as e:
            print("❌ SERVER ERROR:", str(e))
            return Response({"error": str(e)}, status=400)


class DeleteExamBillView(APIView):
    def delete(self, request, doc_id):
        try:
            # Verify token
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                return Response({"error": "Missing token"}, status=401)

            token = auth_header.split(" ")[1]
            # allow small clock skew
            decoded = firebase_auth.verify_id_token(token, clock_skew_seconds=60)
            uid = decoded["uid"]

            # Check if user is admin
            user_doc = db.collection("users").document(uid).get()
            if not user_doc.exists:
                return Response({"error": "User not found"}, status=404)

            if user_doc.to_dict().get("role") != "admin":
                return Response({"error": "Forbidden"}, status=403)

            # Delete exam bill
            db.collection("examBills").document(doc_id).delete()

            return Response({"message": "Form deleted successfully"}, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=400)


class UserExamBillList(APIView):
    def get(self, request):
        try:
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                return Response({"error": "Missing token"}, status=401)

            token = auth_header.split(" ")[1]
            # allow small clock skew
            decoded = firebase_auth.verify_id_token(token, clock_skew_seconds=60)
            uid = decoded["uid"]

            # Fetch only forms where uid matches
            docs = db.collection("examBills").where("uid", "==", uid).get()
            forms = [{"id": d.id, **d.to_dict()} for d in docs]

            return Response(forms, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=400)


class AddRemarkView(APIView):
    def post(self, request, doc_id):
        try:
            # Verify token
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                return Response({"error": "Missing token"}, status=401)

            token = auth_header.split(" ")[1]
            # allow small clock skew
            decoded = firebase_auth.verify_id_token(token, clock_skew_seconds=60)
            uid = decoded["uid"]

            # Check admin role
            user_doc = db.collection("users").document(uid).get()
            if not user_doc.exists or user_doc.to_dict().get("role") != "admin":
                return Response({"error": "Permission denied"}, status=403)

            # Get remark text
            remark = request.data.get("remark")
            if not remark:
                return Response({"error": "Remark cannot be empty"}, status=400)

            # Update Firestore document
            db.collection("examBills").document(doc_id).set(
                {"remark": remark}, merge=True
            )

            return Response({"message": "Remark added successfully"}, status=200)

        except Exception as e:
            print("AddRemarkView error:", str(e))
            return Response({"error": str(e)}, status=400)


class UserExamBillList(APIView):
    def get(self, request):
        try:
            auth_header = request.headers.get("Authorization")
            print("[UserExamBillList] Received Authorization header:", auth_header)
            if not auth_header:
                return Response({"error": "Missing token"}, status=401)

            token = auth_header.split(" ")[1]
            print("[UserExamBillList] Extracted token (first 20 chars):", token[:20] if token else None)
            # allow small clock skew
            decoded = firebase_auth.verify_id_token(token, clock_skew_seconds=60)
            uid = decoded["uid"]

            # Fetch only forms where uid matches
            docs = db.collection("examBills").where("uid", "==", uid).get()
            forms = [{ "id": d.id, **d.to_dict() } for d in docs]

            return Response(forms, status=200)

        except Exception as e:
            import traceback
            print("[UserExamBillList] Exception while handling request:", str(e))
            traceback.print_exc()
            return Response({"error": str(e)}, status=400)


class UpdateExamBillView(APIView):
    def patch(self, request, doc_id):
        try:
            # 1. Verify Firebase token
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                return Response({"error": "Missing token"}, status=401)

            token = auth_header.split(" ")[1]
            # allow small clock skew
            decoded = firebase_auth.verify_id_token(token, clock_skew_seconds=60)
            uid = decoded["uid"]

            # 2. Determine if the user is admin or owner of the document
            user_doc = db.collection("users").document(uid).get()
            if not user_doc.exists:
                return Response({"error": "User not found"}, status=404)

            user_role = user_doc.to_dict().get("role")

            # 3. Fetch the exam bill document to check ownership
            doc_ref = db.collection("examBills").document(doc_id)
            existing = doc_ref.get()
            if not existing.exists:
                return Response({"error": "Form not found"}, status=404)

            existing_data = existing.to_dict()
            owner_uid = existing_data.get("uid")

            # allow update if admin OR owner
            if user_role != "admin" and owner_uid != uid:
                return Response({"error": "Permission denied"}, status=403)

            # 4. Get update data
            update_data = request.data
            if not update_data:
                return Response({"error": "No data provided"}, status=400)

            # 5. Perform update
            doc_ref.update(update_data)

            # 6. If the updater is the owner (not admin), remove any existing remark
            if owner_uid == uid and user_role != "admin":
                try:
                    doc_ref.update({"remark": DELETE_FIELD})
                except Exception:
                    # best-effort: ignore failures to delete remark
                    pass

            return Response({"message": "Form updated successfully"}, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=400)
