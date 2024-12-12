"use client"
import React, { useState, useEffect } from 'react';
import { FaBookmark, FaSyncAlt, FaSearch } from 'react-icons/fa';

const IDETextBox: React.FC = () => {
  const [code, setCode] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const linesOfCode = [
    'function smallestEvenMultiple(n) {',
    '  return n % 2 === 0 ? n : n * 2;',
    '}',
    '',
    'console.log(smallestEvenMultiple(5)); // Expected output: 10',
  ];

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (lineIndex < linesOfCode.length) {
        setCode((prev) => prev + linesOfCode[lineIndex] + '\n');
        setLineIndex((prev) => prev + 1);
      } else {
        setIsTyping(false);
      }
    }, 1000); // Type each line with a 1 second delay

    return () => clearInterval(typingInterval);
  }, [lineIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500); // Cursor blink interval

    return () => clearInterval(cursorInterval);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="relative p-6 bg-gray-900 text-white font-mono text-lg w-full max-w-3xl mx-auto my-8 rounded-md shadow-lg overflow-hidden">
      {/* Toolbar Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <button
            disabled
            className="text-gray-400 p-2 rounded-full cursor-not-allowed"
            title="Bookmark"
          >
            <FaBookmark size={20} />
          </button>
          <button
            disabled
            className="text-gray-400 p-2 rounded-full cursor-not-allowed"
            title="Reload"
          >
            <FaSyncAlt size={20} />
          </button>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search..."
              className="bg-gray-800 text-white rounded-md pl-8 pr-4 py-2 w-48 cursor-not-allowed"
              disabled
            />
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <button
          disabled
          className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm cursor-not-allowed"
        >
          Save
        </button>
      </div>

      {/* Code Editor Area */}
      <div className="relative bg-black p-4 rounded-md overflow-hidden">
        <div className="flex">
          {/* Line Numbers */}
          <div className="text-gray-400 mr-4 pt-2">
            {linesOfCode.map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>

          {/* Code Block */}
          <div className="relative w-full">
            <pre className="whitespace-pre-wrap">{code}</pre>
            {/* Blinking Cursor */}
            <div
              className={`absolute bottom-3 right-0 bg-white w-1 h-6 rounded-md transition-all duration-200 ${
                cursorVisible ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDETextBox;
