from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import BinVO, Shoes

class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = ['closet_name','import_href']

class ShoesListEncoder(ModelEncoder):
    model = Shoes
    properties = ['model_name']

    def get_extra_data(self, o):
        return {'bin': o.bin.closet_name}

class ShoeDetailEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "model_name",
        "manufacturer",
        "color",
        "bin",
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }

    #do i need get extra data here for something? 

@require_http_methods(["GET", "POST"])
def api_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoes.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoes.objects.all()
            return JsonResponse(
                {'shoes': shoes},
                encoder=ShoesListEncoder,
            )
    else: 
        content = json.loads(request.body)
        try:
            bin_href = content['bin']
            bin = BinVO.objects.get(import_href=bin_href)
            content['bin'] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid bin id'},
                status=400,
            )
        shoes = Shoes.objects.create(**content)
        return JsonResponse(
            shoes,
            encoder=ShoeDetailEncoder,
            safe=False,
        )


def api_show_shoe(request, pk):
    shoe = Shoes.objects.get(id=pk)
    return JsonResponse(
        shoe,
        encoder=ShoeDetailEncoder,
        safe=False,
    )