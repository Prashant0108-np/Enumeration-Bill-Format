# Create your views here.
# exam/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .firebase_config import db
from firebase_admin import auth as firebase_auth


class ExamBillView(APIView):
    def post(self, request):
        try:
            # getting token from header in frontend 
            id_token = request.headers.get("Authorization").split(" ")[1]
            decoded_token = firebase_auth.verify_id_token(id_token)
            uid = decoded_token["uid"]

            # saving the data in firebase collections
            data = request.data
            print(uid)
            db.collection("examBills").add({**data, "uid": uid})

            return Response({"message": "Form saved successfully!"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    
    # def get(self, request):
    #     try:
    #         # ✅ 1. Check Authorization header
    #         auth_header = request.headers.get("Authorization")
    #         if not auth_header:
    #             return Response({"error": "Missing token"}, status=status.HTTP_401_UNAUTHORIZED)

    #         token = auth_header.split(" ")[1]
            
    #         # ✅ 2. Decode Firebase ID Token
    #         decoded = firebase_auth.verify_id_token(token)
    #         uid = decoded["uid"]

    #         # ✅ 3. Fetch user document directly
    #         doc_ref = db.collection("users").document(uid).get()

    #         if not doc_ref.exists:
    #             return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    #         # ✅ 4. Convert to dict and return
    #         user_data = doc_ref.to_dict()

    #         return Response(user_data, status=status.HTTP_200_OK)

    #     except Exception as e:
    #         return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# # exam/views.py
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from firebase_admin import auth as firebase_auth
# from .firebase_config import db


class UserDataView(APIView):
    def get(self, request):
        try:
            # ✅ Check for token
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                return Response({"error": "Missing token"}, status=status.HTTP_401_UNAUTHORIZED)

            token = auth_header.split(" ")[1]
            decoded = firebase_auth.verify_id_token(token)
            uid = decoded["uid"]

            # ✅ Fetch Firestore user document
            doc = db.collection("users").document(uid).get()

            if not doc.exists:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            # ✅ Return user data
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
            decoded = firebase_auth.verify_id_token(token)
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
            forms = [{ "id": d.id, **d.to_dict() } for d in docs]

            print("✅ Total exam bills:", len(forms))

            return Response(forms, status=200)

        except Exception as e:
            print("❌ SERVER ERROR:", str(e))
            return Response({"error": str(e)}, status=400)

class DeleteExamBillView(APIView):
    def delete(self, request, doc_id):
        try:
            # ✅ Verify token
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                return Response({"error": "Missing token"}, status=401)

            token = auth_header.split(" ")[1]
            decoded = firebase_auth.verify_id_token(token)
            uid = decoded["uid"]

            # ✅ Check if user is admin
            user_doc = db.collection("users").document(uid).get()
            if not user_doc.exists:
                return Response({"error": "User not found"}, status=404)

            if user_doc.to_dict().get("role") != "admin":
                return Response({"error": "Forbidden"}, status=403)

            # ✅ Delete exam bill
            db.collection("examBills").document(doc_id).delete()

            return Response({"message": "Form deleted successfully"}, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=400)


class AddRemarkView(APIView):
    def post(self, request, doc_id):
        try:
            # ✅ Verify token
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                return Response({"error": "Missing token"}, status=401)

            token = auth_header.split(" ")[1]
            decoded = firebase_auth.verify_id_token(token)
            uid = decoded["uid"]

            # ✅ Check admin role
            user_doc = db.collection("users").document(uid).get()
            if not user_doc.exists or user_doc.to_dict().get("role") != "admin":
                return Response({"error": "Permission denied"}, status=403)

            # ✅ Get remark text
            remark = request.data.get("remark")
            if not remark:
                return Response({"error": "Remark cannot be empty"}, status=400)

            # ✅ Update Firestore document
            db.collection("examBills").document(doc_id).update({
                "remark": remark
            })

            return Response({"message": "Remark added successfully"}, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=400)
