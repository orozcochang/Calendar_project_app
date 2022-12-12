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