from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, FileViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)  # Route for projects
router.register(r'files', FileViewSet,basename='file')       # Route for files

urlpatterns = [
    path('', include(router.urls)),  # Include the routes from the router
]
