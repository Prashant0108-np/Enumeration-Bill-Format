from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create yo[ur views here.
@api_view(['GET'])
def index(request):
    return Response({'message':'hellow'})
