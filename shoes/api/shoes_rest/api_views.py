from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from json

from common.json import ModelEncoder
from .models import BinVO, Shoes

class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = ['name']

class ShoesListEncoder(ModelEncoder):
    model = Shoes
    properties = ['name']

class ShoeDetailEncoder(ModelEncoder)