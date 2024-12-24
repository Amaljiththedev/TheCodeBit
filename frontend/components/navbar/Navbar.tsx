import React from "react";
import { AiOutlineRobot, AiOutlineShareAlt, AiOutlineSetting } from "react-icons/ai";
import { FiUsers, FiVideo, FiTerminal, FiGithub, FiSearch } from "react-icons/fi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-black text-white px-4 py-2">
      {/* Branding */}
      <div className="flex items-center gap-2">
        
        <span className="text-xl font-bold">CodeBiT</span>
      </div>

      {/* Main Tools */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700">
          <HiOutlineChatBubbleOvalLeftEllipsis className="text-xl" />
          Ask CodeBit AI
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700">
          <FiVideo className="text-xl" />
          Start Meeting
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700">
          <AiOutlineShareAlt className="text-xl" />
          Share
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700">
          <FiUsers className="text-xl" />
          Invite Collaborators
        </button>
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700">
          <FiTerminal className="text-xl" />
          Terminal
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700">
          <FiGithub className="text-xl" />
          GitHub Sync
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700">
          <FiSearch className="text-xl" />
          Search
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700">
          <AiOutlineSetting className="text-xl" />
          Settings
        </button>
      </div>
    </nav>
  );
};

export default Navbar;