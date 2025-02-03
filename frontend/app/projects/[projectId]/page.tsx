"use client";

import React, { useState, useEffect } from "react";
import IdeEditor from "@/components/Ide/Editor";
import Tree from "@/components/Tree/Tree";
import TerminalComponent from "@/components/Ide/terminal";
import Navbar from "@/components/navbar/Navbar";

// Define types for FileNode
interface FileNode {
  id: number;
  name: string;
  is_folder: boolean;
  path: string;
  contents?: FileNode[]; // Recursive contents for nested folders
}

// Define API response types
interface FileAPIResponse {
  id: number;
  name: string;
  is_folder: boolean;
  path: string;
  contents?: FileAPIResponse[];
}

const IDEPage: React.FC = () => {
  const [data, setData] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<number | null>(null);
  const [fileContent, setFileContent] = useState<string>("");

  // Fetch files for a given project
  const fetchFiles = async (parentId: number | null = null) => {
    try {
      const projectId = 2; // Replace with dynamic project ID if needed
      const response = await fetch(
        `http://localhost:8000/api/files/content/?file_id=${parentId}`
      );
      const data = await response.json();
      setData(mapFilesToTree(data.folder_contents || []));
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  // Fetch file content for selected file
  const fetchFileContent = async (fileId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/files/content?file_id=${fileId}`
      );
      const result = await response.json();
      if (result.content) {
        setFileContent(result.content);
        setSelectedFile(fileId);
      } else {
        console.error("Error fetching file content:", result.error);
      }
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  // Convert flat list to hierarchical tree (for folder structure)
  const mapFilesToTree = (files: FileAPIResponse[]): FileNode[] => {
    return files.map((file) => ({
      id: file.id,
      name: file.name,
      is_folder: file.is_folder,
      path: file.path,
      contents: file.contents ? mapFilesToTree(file.contents) : [],
    }));
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        {/* Sidebar - File Explorer */}
        <aside className="w-64 border-r text-white p-4">
          <h2 className="text-lg font-bold mb-4">Project Explorer</h2>
          <Tree 
            data={data} 
            onNodeClick={(node) => fetchFileContent(node.id)} 
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-black text-white flex flex-col">
          <header className="border-b border-black p-4">
            <h1 className="text-xl font-bold">
              {selectedFile ? `Editing: ${selectedFile}` : "Select a file"}
            </h1>
          </header>

          {/* Editor and Terminal Container */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Editor */}
            <div className="flex-1 overflow-auto bg-black">
              <IdeEditor content={fileContent} />
            </div>

            {/* Terminal */}
            <div className="h-40 bg-black border-t">
              <TerminalComponent />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default IDEPage;
