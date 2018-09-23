from django.db import models
from petitions.models import Petition

class Person(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)
    zip_code = models.CharField(max_length=10)
    petitions = models.ManyToManyField(Petition)

    def __str__(self):
        return self.email
