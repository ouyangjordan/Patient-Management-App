from rest_framework import generics
from .models import Patients
from .serializers import PatientsSerializer
from rest_framework.response import Response
from rest_framework.views import status

class ListPatientsView(generics.ListAPIView):
    """
    GET patients/
    POST patients/
    DELETE patients/
    """

    queryset = Patients.objects.all()
    serializer_class = PatientsSerializer

    def post(self, request, *args, **kwargs):
        a_patient = Patients.objects.create(
            name=request.data["name"],
            age=request.data["age"],
            symptoms=request.data["symptoms"],
            room_number=request.data["room_number"],
            comments=request.data["comments"]
        )
        return Response(
            data=PatientsSerializer(a_patient).data,
            status=status.HTTP_201_CREATED
        )

    def delete(self, request, *args, **kwargs):
        try:
            a_patient = self.queryset.get(pk=request.data["name"])
            a_patient.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Patients.DoesNotExist:
            return Response(
                data={
                    "message": "Patient with id: {} does not exist".format(request.data["name"])
                },
                status=status.HTTP_404_NOT_FOUND
            )