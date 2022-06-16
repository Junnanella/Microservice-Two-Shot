from django.db import models

# Create your models here.
class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()
    import_href = models.CharField(max_length=200, unique=True)
class Shoes(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=100)
    pictureUrl = models.URLField(null=True)
    bin = models.ForeignKey(BinVO, related_name='shoes', on_delete=models.CASCADE)

    def __str__(self) -> str:
        return super().__str__()