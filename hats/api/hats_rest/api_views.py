from turtle import color
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
    properties = ["closet_name", "import_href"]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["style_name", "location"]

    def get_extra_data(self, object):
        return {"location": object.location.closet_name}


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name",
        "color",
        "fabric",
        "picture_url",
        "location",
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
        return JsonResponse({"hats": hats}, encoder=HatListEncoder, safe=False)
    # else
    else:
        # content = parse the json request body
        content = json.loads(request.body)
        print("content: ", content)
        # try
        try:
            # location href = location in content
            location_href = content["location_href"]
            # location = LocationVO.objects.get(import_href=location href)
            location = LocationVO.objects.get(import_href=location_href)
            # location of content = location
            # content["location"] = location
        # except if LocationVO does not exist
        except LocationVO.DoesNotExist:
            # return a json reponse
            return JsonResponse(
                {"message": "Invalid location href"}, status=400, safe=False
            )

        # create the hat with the content
        hat = Hat.objects.create(
            style_name=content["style_name"],
            color=content["color"],
            fabric=content["fabric"],
            picture_url=content.get("picture_url", None),
            location=location,
        )

        # return json response with hat, encoder, and safe=False
        return JsonResponse(hat, encoder=HatDetailEncoder, safe=False)


@require_http_methods(["GET", "DELETE"])
def api_detail_hat(request, pk):
    # Returns details of hat specified by the pk parameter
    # should return a dictionary with style_name, color, fabric, picture_url
    # and properties of the location for the hat instance

    if request.method == "GET":
        # get hat object where id = pk
        hat = Hat.objects.get(id=pk)
        # return a Json Response
        return JsonResponse(
            # hat, encoder, and safe=False
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
    else:
        # unpack object filtered by id=pk and delete()
        # and declare a count for how many instances get filtered in
        # _ to represent any other properties in the object
        count, _ = Hat.objects.filter(id=pk).delete()
        # return a JsonResponse object to confirm deletion
        return JsonResponse({"deleted": count > 0})
