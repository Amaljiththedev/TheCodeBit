
from rest_framework import serializers
from .models import Project, File


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        Model=Project
        fields="__all__"

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        Model=File
        Fields="__all__"


