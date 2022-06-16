from django.urls import path

from .api_views import api_shoes, api_show_shoe

urlpatterns = [
    path('shoes/', api_shoes, name='api_shoes'),
    path('shoes/<int:pk>/', api_show_shoe, name='api_show_shoe'),
]