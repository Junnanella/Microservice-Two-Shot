from django.urls import path

# import views from .api_views
from .api_views import api_list_hats, api_detail_hat

urlpatterns = [
    path("locations/<int:location_vo_id>/hats/", api_list_hats, name="api_list_hats"),
    path("hats/", api_list_hats, name="api_create_hat"),
    path("hats/<int:pk>/", api_detail_hat, name="api_detail_hat")
]
