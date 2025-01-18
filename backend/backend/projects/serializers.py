
from rest_framework import serializers
from .models import Project, File


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields="__all__"

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model=File
        fields="__all__"

