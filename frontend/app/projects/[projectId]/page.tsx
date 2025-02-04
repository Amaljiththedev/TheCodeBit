"use client";

import React, { useState, useEffect } from "react";
import IdeEditor from "@/components/Ide/Editor";
import TerminalComponent from "@/components/Ide/terminal";
import Navbar from "@/components/navbar/Navbar";
import  FileTreeDemo  from "@/components/Tree/FileDemo";

// Define types for FileNode
interface FileNode {
  id: number; // IDs are returned as numbers
  name: string;
  is_folder: boolean;
  children?: FileNode[];
  path?: string;
  size?: number;
  file_type?: string;
  created_at?: string;
  updated_at?: string;
}

// Define API response type (matches FileNode)
interface FileAPIResponse extends FileNode {
  children?: FileAPIResponse[];
}

// Define the IDEPage component
const IDEPage: React.FC = () => {
  const [data, setData] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const projectId = 1; // TODO: Replace with dynamic project ID if needed

  // Fetch files for a given project
  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/files/?project_id=${projectId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch files: ${response.statusText}`);
      }

      const files: FileAPIResponse[] = await response.json();
      console.log("Fetched files:", files); // ✅ Debugging API response
      setData(files);
      setError(null);
    } catch (err) {
      console.error("Error fetching files:", err);
      setError("Failed to load project files.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch file content when a file is clicked
  const fetchFileContent = async (fileId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/files/content?file_id=${fileId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch file content: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("File Content:", result); // ✅ Debugging file content response

      setFileContent(result.content || "");
      setSelectedFile(data.find((file) => file.id === fileId) || null);
      setError(null);
    } catch (err) {
      console.error("Error fetching file content:", err);
      setError("Unable to fetch file content.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch files on component mount
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

          {loading && <p className="text-gray-400">Loading files...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && <FileTreeDemo data={data} onFileClick={fetchFileContent} />}
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-black text-white flex flex-col">
          <header className="border-b border-gray-700 p-4">
            <h1 className="text-xl font-bold">
              {selectedFile ? `Editing: ${selectedFile.name}` : "Select a file"}
            </h1>
          </header>

          {/* Editor and Terminal Container */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Editor */}
            <div className="flex-1 overflow-auto bg-black">
              <IdeEditor content={fileContent} />
            </div>

            {/* Terminal */}
            <div className="h-40 bg-black border-t border-gray-700">
              <TerminalComponent />
            </div>
          </div>
        </main>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 p-4">{error}</div>}
    </>
  );
};

export default IDEPage;
