from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import AppUser
from .models import Events, Shift
from django.core import serializers
import json
from django.core.serializers import serialize
import requests as HTTP_Client
from requests_oauthlib import OAuth1
import os
from django.contrib.auth import authenticate, login, logout
import http.client
import holidayapi
from .serializers import UserSerializer
from rest_framework.response import Response

def index(request):
    index_file = open('static/index.html').read()
    return HttpResponse(index_file)
@api_view(['POST'])
def signup(request):
    pass
@api_view(['POST'])
def season(request):
    print('SEASON?????????')
    print(request.data)
    month = request.data['month']
    auth = OAuth1('57f7857f16a041e2b5b66d9fc24b375c', '04514af5fa6649c7ada57e3feb5ffbfc')
    endpoint = f"http://api.thenounproject.com/icon/{month}"

    response = HTTP_Client.get(endpoint, auth=auth)
    response_json = response.json()
    url = response_json['icon']['preview_url']

    data = {
        'image_url': url,
    }
    return JsonResponse(data)
@api_view(['GET','POST'])
def calendar_view(request):
    if request.method == 'GET':
        events = Events.objects.all()
        serialized_events = serialize('json', events)
        serialized_events = json.loads(serialized_events)
        return JsonResponse({'events':serialized_events})
    if request.method == 'POST':
        json_data = json.loads(request.body)
        print(json_data['event'])
        Events.objects.create(date=json_data['date'],event=json_data['title'])
        query_set = Events.objects.all()
        print(query_set)
        qs_json=serializers.serialize('json',query_set)
        return JsonResponse({'events':[qs_json]})

@api_view(['GET','POST'])
def the_people(request):
    print('------------------------it goes to the people-------------------------')
    if request.method == 'GET':
        # data = [{'name':'bill', 'shift':'mids'},{'name':'bill', 'shift':'days'},{'name':'bill', 'shift':'swings'}]
        # query = AppUser.objects.all()
        # qs_json=serializers.serialize('json',query)
        # print(qs_json)
        # return JsonResponse({'data': qs_json})
        users = AppUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    return JsonResponse({'success':False})

@api_view(['POST'])
def email_check(request):
    json_data = json.loads(request.body)
    print(json_data['email'])
    user_check = AppUser.objects.filter(email=json_data['email'])
    print(user_check)
    if user_check:
        return JsonResponse({'success':True})
    else:
        return JsonResponse({'success':False}) 

@api_view(['POST'])
def register(request):
    json_data = json.loads(request.body)
    print('------FROM THE REGISTER-------',json_data['email'])
    print('------FROM THE REGISTER-------',json_data['pass'])
    AppUser.objects.create_user(username=json_data['email'],email=json_data['email'],password=json_data['pass'])
    query = AppUser.objects.all()
    print(query)
    return JsonResponse({'success':True})
@api_view(['POST'])
def login_request(request):
    json_data = json.loads(request.body)
    print('------FROM THE LOGIN-------',json_data['email'])
    print('------FROM THE LOGIN-------',json_data['pass'])
    email = json_data['email']
    password = json_data['pass']
    query = AppUser.objects.get(username=email)
    print(query)
    user = authenticate(username=email,password=password)
    print('USER EMAIL',user.email)
    print(user.is_active)
    if user is not None:
        if user.is_active:
            try:
                login(request._request, user)
                return JsonResponse({'success':True})
            except Exception as e:
                print(e)
                return JsonResponse({'success':False, 'reason':'login failed'})
        else:
            return JsonResponse({'success':False,'reason':'User is not active'})
    else:
        return JsonResponse({'success':False,'reason':'User does not exist'})
@api_view(['POST'])
def logout_request(request):
    try:
        logout(request._request)
        return JsonResponse({'success':True})
    except Exception as e:
        print(e)
        return JsonResponse({'success':False, 'reason':'not able to logout'})

@api_view(['GET'])
def current_user(request):
    if request.user.is_authenticated:
        print('---------THIS IS FROM CURRENT USER-------',request.user)
        user = str(request.user)
        print(user)
        print(type(user))
        return JsonResponse({'success':user})
    return JsonResponse({'success':False})

@api_view(['PUT'])
def update_email(request):
    if request.user.is_authenticated:
        print('---------THIS IS FROM CURRENT USER-------',request.user)
        user = str(request.user)
        print('made it to update')
        json_data = json.loads(request.body)
        print('------FROM THE UPDATE-------',json_data['email'])
        email = json_data['email']
        query = AppUser.objects.get(username=user)
        query.username = email
        query.email = email
        query.save()
        return JsonResponse({'success':True})
    return JsonResponse({'success':False})

@api_view(['DELETE'])
def del_user(request):
    if request.user.is_authenticated:
        print('---------THIS IS FROM CURRENT USER-------',request.user)
        user = str(request.user)
        logout(request._request)
        query = AppUser.objects.get(username=user)
        query.delete()
        return JsonResponse({'success':True})
    return JsonResponse({'success':False})

@api_view(['GET'])
def weather(request):
    print('hello')
    conn = http.client.HTTPSConnection("community-hacker-news-v1.p.rapidapi.com")

    headers = {
        'X-RapidAPI-Key': "62065c5400msh1eb73f21e9c56d1p13b83djsndd4960c60d73",
        'X-RapidAPI-Host': "community-hacker-news-v1.p.rapidapi.com"
        }

    conn.request("GET", "/updates.json?print=pretty", headers=headers)

    res = conn.getresponse()
    data = res.read()

    print(data.decode("utf-8"))
    return JsonResponse({'data':data})

@api_view(['GET'])
def holiday(request):
    hapi = holidayapi.v1('_YOUR_API_KEY_')

    parameters = {
        # Required
        'country': 'US',
        'year':    2016,
        # Optional
        # 'month':    7,
        # 'day':      4,
        # 'previous': True,
        # 'upcoming': True,
        # 'public':   True,
        # 'pretty':   True,
    }

    holidays = hapi.holidays(parameters)
    return JsonResponse({'response': holidays})