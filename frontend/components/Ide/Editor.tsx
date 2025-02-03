import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";

interface IdeEditorProps {
  content?: string;
  language?: string;
  theme?: string;
  fontSize?: number;
  onContentChange?: (newValue: string) => void;
}

const IdeEditor: React.FC<IdeEditorProps> = ({
  content = "// Write your code here...",
  language = "javascript",
  theme = "vs-dark",
  fontSize = 14,
  onContentChange,
}) => {
  const [code, setCode] = useState(content);
  const [editorLanguage, setEditorLanguage] = useState(language);
  const [editorTheme, setEditorTheme] = useState(theme);
  const [editorFontSize, setEditorFontSize] = useState(fontSize);

  useEffect(() => {
    setCode(content);
  }, [content]);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
    onContentChange?.(value || ""); // Notify parent component if needed
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="h-12 bg-black text-white flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Editing: {editorLanguage.toUpperCase()}</span>

          {/* Language Selector */}
          <select
            value={editorLanguage}
            onChange={(e) => setEditorLanguage(e.target.value)}
            className="bg-black text-white px-2 py-1 rounded"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="typescript">TypeScript</option>
            <option value="java">Java</option>
            <option value="html">HTML</option>
          </select>

          {/* Theme Selector */}
          <select
            value={editorTheme}
            onChange={(e) => setEditorTheme(e.target.value)}
            className="bg-black text-white px-2 py-1 rounded"
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
          </select>

          {/* Font Size */}
          <input
            type="number"
            value={editorFontSize}
            onChange={(e) => setEditorFontSize(Number(e.target.value))}
            className="w-16 px-2 py-1 bg-black text-white rounded"
            min={10}
            max={24}
          />
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-grow">
        <MonacoEditor
          language={editorLanguage}
          value={code}
          theme={editorTheme}
          fontSize={editorFontSize}
          height="100%"
          onChange={handleEditorChange}
          options={{
            automaticLayout: true,
            minimap: { enabled: false },
            wordWrap: "on",
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            parameterHints: true,
            hover: true,
            snippetSuggestions: "inline",
          }}
        />
      </div>
    </div>
  );
};

export default IdeEditor;
