import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css"; // Import Xterm.js styles

const TerminalComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const term = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (terminalRef.current) {
      // Initialize Terminal
      term.current = new Terminal({
        cursorBlink: true,
        theme: {
          background: "#1e1e1e", // VSCode terminal background
          foreground: "#ffffff", // VSCode terminal foreground
        },
      });

      // Add FitAddon for responsive resizing
      fitAddon.current = new FitAddon();
      term.current.loadAddon(fitAddon.current);

      // Open terminal in the container
      term.current.open(terminalRef.current);

      // Fit the terminal to the container size
      fitAddon.current.fit();

      // Simulate initial output
      term.current.writeln("Welcome to the VSCode-like Terminal!");
      term.current.writeln("Type your commands below:");

      // Handle user input
      term.current.onData((data) => {
        handleInput(data);
      });
    }

    // Clean up on component unmount
    return () => {
      term.current?.dispose();
    };
  }, []);

  const handleInput = (input: string) => {
    const command = input.trim();
    if (command === "") return;

    if (term.current) {
      // Echo user input
      term.current.write(`\r\n$ ${command}\r\n`);

      // Example commands
      if (command === "help") {
        term.current.writeln("Available commands:");
        term.current.writeln(" - help: Show this help message");
        term.current.writeln(" - clear: Clear the terminal");
      } else if (command === "clear") {
        term.current.clear();
      } else {
        term.current.writeln(`Unknown command: ${command}`);
      }

      // Show prompt again
      term.current.write("\r\n$ ");
    }
  };

  return (
    <div
      ref={terminalRef}
      className="h-64 w-full bg-black rounded shadow-md"
    />
  );
};

export default TerminalComponent;
