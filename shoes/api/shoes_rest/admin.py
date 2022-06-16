from django.contrib import admin

from .models import Shoes

# Register your models here.
@admin.register(Shoes)
class ShoesAdmin(admin.ModelAdmin):
    pass