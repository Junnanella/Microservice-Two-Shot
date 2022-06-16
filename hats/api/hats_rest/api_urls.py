from django.urls import path

# import views from .api_views
from .api_views import api_list_hats

urlpatterns = [
    path("locations/<int:location_vo_id>/hats/", api_list_hats, name="api_list_hats"),
    path("hats/", api_list_hats, name="api_create_hat"),
]
