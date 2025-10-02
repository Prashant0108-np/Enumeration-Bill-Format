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
