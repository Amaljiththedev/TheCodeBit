import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";  // Correct import

const IdeEditor: React.FC = () => {
  const [code, setCode] = useState<string>("// Write your code here");
  const [language, setLanguage] = useState<string>("javascript");
  const [theme, setTheme] = useState<string>("vs-dark");
  const [fontSize, setFontSize] = useState<number>(14);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(event.target.value));
  };

  return (
    <div className="h-screen w-screen flex flex-row bg-gray-100">
      {/* Sidebar: Mimicking VSCode file explorer */}

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* Top Bar: Mimicking VSCode with file information and settings */}
        <div className="h-12 bg-black text-white flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium">Untitled - {language.toUpperCase()}</div>
            <div className="flex items-center space-x-2">
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-black text-white px-2 py-1 rounded"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="typescript">TypeScript</option>
                <option value="java">Java</option>
                <option value="html">HTML</option>
              </select>
            </div>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-grow">
          <MonacoEditor
            language={language}
            value={code}
            theme={theme}
            fontSize={15}
            onChange={handleEditorChange}
            height="100%"
            options={{
              automaticLayout: true,
              minimap: { enabled: false },
              wordWrap: "on",
              suggestOnTriggerCharacters: true, // Enable IntelliSense trigger on characters like `.`, `(`, etc.
              quickSuggestions: true, // Enable quick suggestions (Autocompletion)
              suggest: {
                filterGraceful: true,
                showWords: true,
              },
              parameterHints: true, // Enable parameter hints in functions/methods
              hover: true, // Show hover tooltips with info about code
              snippetSuggestions: "inline", // Allow snippets to be shown inline
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default IdeEditor;
