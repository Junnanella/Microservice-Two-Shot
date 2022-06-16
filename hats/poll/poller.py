import django
import os
import sys
import time
import json
import requests

# Actually, when it's run in Docker it will have access to the
# hats_rest and hats_project. Check docker-compose.yml and see
# the hats-poller volume section to learn more

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hats_project.settings")
django.setup()

# Must load Django models after django.setup()
# Don't mind the squigglies. See the previous comment about Docker
# volume binding trick
from hats_rest.models import LocationVO


def get_locations():
    response = requests.get("http://wardrobe-api:8000/api/locations/")

    content = json.loads(response.content)
    for location in content["locations"]:
        LocationVO.objects.update_or_create(
            location_id=location["id"],
            defaults={"closet_name": location["closet_name"]},
        )


def poll():
    while True:
        try:
            get_locations()
        except Exception as e:
            print(e, file=sys.stderr)

        time.sleep(60)


# common magic trick that means:
# - Only run this if called directly from command line
# - Do not run this if some other python file is importing this file
if __name__ == "__main__":
    poll()
