from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from pkg_resources import require

from common.json import ModelEncoder
# import models
from .models import LocationVO, Hat

# Encoders
class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = ["name", "import_href"]

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "name"
    ]

    def get_extra_data(self, object):
        return {"location": object.location.name}

class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name", 
        "color",
        "fabric",
        "picture_url"
        "location"
    ]

    encoders = {
        "location": LocationVOEncoder(),
    }


# Views
@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    # lists the hat names 
    # and the link to the hat for the specified location id

    # Returns a dictionary with a single key "hats"
    # which is a list of hat name and urls
    # Each entry in the list is a dictionary that contain the name of the hat
    # and link to the hat's information

    # if the request method is "GET"
    if request.method == "GET":
        if location_vo_id is not None:
            # hats = filter Hat objects for location = location_vo_id
            hats = Hat.objects.filter(location=location_vo_id)
        # else
        else:
            hats = Hat.objects.all()
        # return a JSON response objects with "hats" = hats
        # and the corresponding encoder
        return JsonResponse(
            {"hats": hats},
            encoder = HatListEncoder
        )          
    # else 
    else:
        # content = parse the json request body
        content = json.loads(request.body)
        # try
        try:
            # location href = location in content
            location_href = content["location"]
            # location = LocationVO.objects.get(import_href=location href)
            location = LocationVO.objects.get(import_href=location_href)
            # location of content = location
            content["location"] = location
        # except if LocationVO does not exist
        except LocationVO.DoesNotExist:
            # return a json reponse
            return JsonResponse(
                 {"message:" "Invalid location id"},
                status=400,
            )
        
        # create the hat with the content
        hat = Hat.objects.create(**content)
        # return json response with hat, encoder, and safe=False
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False
        )
