from rest_framework import serializers
from .models import Patients

class PatientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patients
        fields = ("name", "age", "symptoms", "room_number", "comments")

    def update(self, instance, validated_data):
        instance.title = validated_data.get("name", instance.name)
        instance.age = validated_data.get("age", instance.age)
        instance.symptoms = validated_data.get("symptoms", instance.symptoms)
        instance.room_number = validated_data.get("room_number", instance.room_number)
        instance.comments = validated_data.get("comments", instance.comments)
        instance.save()
        return instance