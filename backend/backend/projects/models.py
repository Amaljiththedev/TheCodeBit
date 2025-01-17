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
    project = models.ForeignKey(Project, on_delete=models.CASCADE)  # Link to Project
    name = models.CharField(max_length=255)
    path = models.TextField()
    is_folder = models.BooleanField(default=False)
    parent_file = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)
    size = models.BigIntegerField()
    file_type = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

