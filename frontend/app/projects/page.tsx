"use client";

import React, { ReactElement, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaPlusCircle } from "react-icons/fa";

// Define the structure of project data
interface Project {
  id: string;
  name: string;
}

// Main ProjectsPage component
const ProjectsPage: React.FC = () => {
  const projects: Project[] = [
    { id: "1", name: "Project One" },
    { id: "2", name: "Project Two" },
    { id: "3", name: "Project Three" },
  ];

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => Number(a.id) - Number(b.id)),
    [projects]
  );

  return (
    <div className="h-screen flex flex-col items-center bg-black text-white font-sans">
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-200 font-sans">
        Your Files
      </h2>
      </header>

      {/* Create New Project Button */}
      <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white text-lg rounded-md hover:bg-gray-700 transition-all mt-10">
        <FaPlusCircle size={20} className="text-green-400" />
        Create New Project
      </button>

      {/* Project List */}
      <main className="flex-1 flex flex-col items-center justify-start w-full max-w-3xl mt-10 px-4">
        {sortedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, x: 10 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="w-full p-6 mb-4 bg-black rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          >
            <Link href={`/projects/${project.id}`} className="flex justify-between">
              <span className="text-lg font-semibold text-white">{project.name}</span>
              <span className="text-white">View</span>
            </Link>
          </motion.div>
        ))}
      </main>
    </div>
  );
};

export default ProjectsPage;
