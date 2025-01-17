"use client";

import React, { useState, useLayoutEffect } from "react";
import IdeEditor from "@/components/Ide/Editor";
import Tree from "@/components/Tree/Tree";
import TerminalComponent from "@/components/Ide/terminal"; // Import the terminal
import Navbar from "@/components/navbar/Navbar";

const structure = [
  {
    type: "folder",
    name: "client",
    files: [
      {
        type: "folder",
        name: "ui",
        files: [
          { type: "file", name: "Toggle.js" },
          { type: "file", name: "Button.js" },
          { type: "file", name: "Button.style.js" },
        ],
      },
      {
        type: "folder",
        name: "components",
        files: [
          { type: "file", name: "Tree.js" },
          { type: "file", name: "Tree.style.js" },
        ],
      },
      { type: "file", name: "setup.js" },
      { type: "file", name: "setupTests.js" },
    ],
  },
  {
    type: "folder",
    name: "packages",
    files: [
      {
        type: "file",
        name: "main.js",
      },
    ],
  },
  { type: "file", name: "index.js" },
];

const Page = () => {
  const [data, setData] = useState(structure);

  // Handle node click event
  const handleClick = (node) => {
    console.log("Node clicked:", node);
  };

  // Handle tree structure update and save to localStorage
  const handleUpdate = (state) => {
    localStorage.setItem(
      "tree",
      JSON.stringify(state, (key, value) => {
        if (key === "parent" || key === "id") {
          return null; // Remove sensitive properties
        }
        return value;
      })
    );
    console.log("Tree updated:", state);
  };

  // Load the saved tree structure from localStorage on page load
  useLayoutEffect(() => {
    try {
      const savedStructure = JSON.parse(localStorage.getItem("tree"));
      if (savedStructure) {
        setData(savedStructure); // Set saved data
      }
    } catch (err) {
      console.error("Error loading tree from localStorage:", err);
    }
  }, []);

  return (
    <>
  <Navbar/>
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <aside className="w-64 border-r  text-white-300 p-4">
        <h2 className="text-lg font-bold mb-4">Project Explorer</h2>
        <Tree data={data} onUpdate={handleUpdate} onNodeClick={handleClick} children={undefined} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-black text-white flex flex-col">
        <header className="border-b border-black p-4">
          <h1 className="text-xl font-bold">File Name</h1>
        </header>

        {/* Editor and Terminal Container */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Editor */}
          <div className="flex-1 overflow-auto bg-black">
            <IdeEditor />
          </div>

          {/* Terminal */}
          <div className="h-40 bg-black border-t ">
            <TerminalComponent />
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default Page;
