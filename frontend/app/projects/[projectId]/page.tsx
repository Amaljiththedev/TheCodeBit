"use client"
import { useParams } from 'next/navigation';

const ProjectDetailsPage = () => {
  const params = useParams();
  const { projectId } = params; // Access dynamic `projectId` from the URL

  return (
    <div style={{ padding: '20px' }}>
      <h1>Project Details</h1>
      <p>Project ID: {projectId}</p>
    </div>
  );
};

export default ProjectDetailsPage;
