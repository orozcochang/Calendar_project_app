from django.db import models
from django.contrib.auth.models import (AbstractUser)
# Create your models here.


class AppUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    USERNAME_FIELD= 'email'
    REQUIRED_FIELDS=[]

class Events(models.Model):
    date = models.DateField
    event = models.CharField(max_length=255)
    user = models.ForeignKey('AppUser', on_delete=models.CASCADE)

class Shift(models.Model):
    date = models.DateField
    shift = models.CharField(max_length=15)
    user = models.ForeignKey('AppUser', on_delete=models.CASCADE)
