from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators
from .models import AppUser

def index(request):
    index_file = open('static/index.html').read()
    return HttpResponse(index_file)
@api_view
def signup(request):
    pass
@api_view
def login(request):
    pass
@api_view
def logout(request):
    pass
@api_view
def whoami(request):
    pass