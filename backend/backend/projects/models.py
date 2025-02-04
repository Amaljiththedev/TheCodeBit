from django.db import models

from users.models import CustomUser

# Create your models here.
class Project(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  # Link to User
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class File(models.Model):
    name = models.CharField(max_length=255)
    is_folder = models.BooleanField(default=False)
    parent_file = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE, related_name="children")
    project_id = models.IntegerField()  # Assuming a project-based file system
    path = models.CharField(max_length=1024, unique=True)
    size = models.BigIntegerField(default=0)
    file_type = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
