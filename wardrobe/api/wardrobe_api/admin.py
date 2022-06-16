from django.contrib import admin

# Register your models here.
from .models import Bin

@admin.register(Bin)
class BinAdmin(admin.ModelAdmin):
    pass