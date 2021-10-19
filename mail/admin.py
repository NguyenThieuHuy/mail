from django.contrib import admin
from django.contrib.admin.options import InlineModelAdmin
from django.contrib.admin.options import ModelAdmin
from .models import User,Email

# Register your models here.
admin.site.register(User)
admin.site.register(Email)