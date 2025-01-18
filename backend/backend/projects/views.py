from django.shortcuts import render
from .models import Project, File
from .serializers import ProjectSerializer, FileSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound

# Viewset for Project
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = []  # Ensure user is authenticated

    def get_queryset(self):
        user = self.request.user

        return Project.objects.all()  # Filter projects for the logged-in user



# Viewset for File
class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = []  # Ensure user is authenticated

    def get_queryset(self):
        project_id = self.request.query_params.get('project_id')  # Get project ID from query params
        if not project_id:
            raise NotFound("Project ID is required.")
        return File.objects.filter(project_id=project_id)  # Filter files for the given project
