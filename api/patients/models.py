from django.db import models

class Patients(models.Model):

    name = models.CharField(max_length=255, null=False, primary_key = True)
    age = models.IntegerField(null=False)
    room_number = models.IntegerField(null=False)
    symptoms = models.CharField(max_length=255, null=False)
    comments = models.CharField(max_length=255, null=False)

    def __str__(self):
        return "{} - {}".format(self.name, self.age)