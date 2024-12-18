import Tree from '@/components/FileTree/Tree';
import React from 'react';

const Page = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64  border-r p-4">
        <div>
          <h2 className="text-lg font-bold mb-4">Project Explorer</h2>
          <Tree/>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="border-b pb-4 mb-6">
          <h1 className="text-xl font-bold">Project Overview</h1>
        </header>
        <section>
          <p className="text-gray-600">
            Welcome to the project! Select a file or folder to get started.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Page;
