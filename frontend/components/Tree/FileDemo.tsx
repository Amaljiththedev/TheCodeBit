"use client";

import React, { useState } from "react";

// Define types for FileNode
interface FileNode {
  id: number;
  name: string;
  is_folder: boolean;
  children?: FileNode[];
}

// Define props for FileTreeDemo
interface FileTreeProps {
  data: FileNode[];
  onFileClick: (fileId: number) => void;
}

const FileTreeDemo: React.FC<FileTreeProps> = ({ data, onFileClick }) => {
  const [openFolders, setOpenFolders] = useState<{ [key: number]: boolean }>({});

  const toggleFolder = (folderId: number) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId], // Toggle open state
    }));
  };

  return (
    <ul className="text-white">
      {data.map((file) => (
        <li key={file.id} className="mb-2">
          <button
            onClick={() => (file.is_folder ? toggleFolder(file.id) : onFileClick(file.id))}
            className={`text-left w-full px-2 py-1 rounded-md flex items-center ${
              file.is_folder ? "text-blue-400" : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            {file.is_folder ? (openFolders[file.id] ? "📂 ▼ " : "📂 ▶ ") : "📄 "}
            {file.name}
          </button>

          {/* Show children only if folder is open */}
          {file.is_folder && file.children && openFolders[file.id] && (
            <ul className="pl-4 transition-all duration-300 ease-in-out">
              <FileTreeDemo data={file.children} onFileClick={onFileClick} />
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FileTreeDemo;
