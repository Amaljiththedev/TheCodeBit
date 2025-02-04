
from rest_framework import serializers
from .models import Project, File


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields="__all__"

class FileSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = File
        fields = ["id", "name", "is_folder", "path", "size", "file_type", "created_at", "updated_at", "children"]

    def get_children(self, obj):
        if obj.is_folder:  # Only folders can have children
            return FileSerializer(obj.children.all(), many=True).data
        return []

