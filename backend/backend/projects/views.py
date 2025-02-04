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
    permission_classes = []

    def get_queryset(self):
        project_id = self.request.query_params.get("project_id")
        if project_id:
            return File.objects.filter(project_id=project_id, parent_file=None)  # Fetch only top-level files/folders 
        return File.objects.none()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)  #  No extra list wrapping