from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from .models import AppUser

def index(request):
    index_file = open('static/index.html').read()
    return HttpResponse(index_file)
@api_view(['POST'])
def signup(request):
    pass
@api_view(['GET', 'POST'])
def login(request):
    pass
@api_view(['POST'])
def logout(request):
    pass
@api_view(['GET'])
def whoami(request):
    pass