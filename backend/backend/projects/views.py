from django.shortcuts import render
from .models import Project, File
from .serializers import ProjectSerializer, FileSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound

from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
import os


# Viewset for Project
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = []  # Ensure user is authenticated

    def get_queryset(self):
        user = self.request.user

        return Project.objects.all()  # Filter projects for the logged-in user


class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer

    def get_queryset(self):
        project_id = self.request.query_params.get('project_id')
        if not project_id:
            raise NotFound("Project ID is required.")
        return File.objects.filter(project_id=project_id)

    @action(detail=False, methods=['GET'])
    def content(self, request):
        """ API to fetch file content or folder contents based on path """
        file_id = request.query_params.get("file_id")
        if not file_id:
            return Response({"error": "File ID is required"}, status=400)
        
        file_obj = get_object_or_404(File, id=file_id)

        if file_obj.is_folder:
            # If the file is a folder, return folder contents recursively
            folder_contents = self.get_folder_contents(file_obj)
            return Response({"folder_contents": folder_contents})
        
        # For non-folder file, return content
        try:
            with open(file_obj.path, "r", encoding="utf-8") as f:
                content = f.read()
            return Response({"content": content})
        except FileNotFoundError:
            return Response({"error": "File not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    def get_folder_contents(self, folder):
        """ Recursively get folder contents (files/folders inside it) """
        contents = File.objects.filter(parent_file=folder)
        result = []
        for content in contents:
            if content.is_folder:
                result.append({
                    "id": content.id,
                    "name": content.name,
                    "is_folder": content.is_folder,
                    "path": content.path,
                    "contents": self.get_folder_contents(content)  # Recursively get subfolder contents
                })
            else:
                result.append({
                    "id": content.id,
                    "name": content.name,
                    "is_folder": content.is_folder,
                    "path": content.path
                })
        return result