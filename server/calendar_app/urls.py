from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('signup/', views.signup),
    path('login/', views.login),
    path('logout/', views.logout),
    path('whoami/', views.whoami),
    path('api/events/', views.calendar_view),
    path('api/season/', views.whoami),
    path('api/the_people/', views.the_people),
    path('api/email-check/', views.email_check),
    path('api/register/', views.register),
    path('api/login/', views.login_request),
    path('api/logout/', views.logout_request),
    path('api/current_user/', views.current_user),
    path('api/update-email/', views.update_email),
]