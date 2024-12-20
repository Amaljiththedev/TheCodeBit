"use client"
import React, { useState, useEffect } from "react";
import {
  AiOutlineFolderAdd,
  AiOutlineFileAdd,
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineDelete,
  AiOutlineEdit
} from "react-icons/ai";
import {
  ActionsWrapper,
  Collapse, // Ensure this is your custom Collapse component
  StyledFolder,
  StyledName,
  VerticalLine
} from "./Tree.style";
import { useTreeContext } from "./TreeContext";
import { PlaceholderInput } from "./TreePlaceholderInput";

const FolderName = ({ isOpen, name, handleClick }) => (
  <StyledName onClick={handleClick}>
    {isOpen ? <AiOutlineFolderOpen /> : <AiOutlineFolder />}
    &nbsp;&nbsp;{name}
  </StyledName>
);

const Folder = ({ id, name, level, children, parentPath }) => {
  const { state, dispatch, isImparative, onNodeClick } = useTreeContext();
  const [isEditing, setEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [childs, setChilds] = useState([]);

  // Ensure that the level is a valid number, and set it to 0 if invalid
  const safeLevel = isNaN(level) ? 0 : level;

  // Increase `level` recursively
  useEffect(() => {
    const nestedChilds = React.Children.map(children, (item) => {
      if (item.type === Folder) {
        return React.cloneElement(item, {
          level: safeLevel + 1,
          parentPath: `${parentPath}/${name}`
        });
      }
      return item;
    });
    setChilds(nestedChilds);
  }, [children, name, parentPath, safeLevel]);

  const handleFileCreation = (event) => {
    event.stopPropagation();
    setIsOpen(true);
    setChilds([
      ...childs,
      <PlaceholderInput
        type="file"
        handleSubmit={(name) => {
          dispatch({ type: "CREATE_FILE", payload: { id, name } });
        }}
      />
    ]);
  };

  const handleFolderCreation = (event) => {
    event.stopPropagation();
    setIsOpen(true);
    setChilds([
      ...childs,
      <PlaceholderInput
        type="folder"
        folderLevel={safeLevel}
        handleSubmit={(name) => {
          dispatch({ type: "CREATE_FOLDER", payload: { id, name } });
        }}
      />
    ]);
  };

  const handleDeleteFolder = () => {
    dispatch({ type: "DELETE_FOLDER", payload: { id } });
  };

  const handleFolderRename = (name) => {
    setIsOpen(true);
    setEditing(true);
  };

  return (
    <StyledFolder
      onClick={(event) => {
        event.stopPropagation();
        onNodeClick({
          state,
          name,
          level: safeLevel,
          path: `${parentPath}/${name}`,
          type: "folder"
        });
      }}
      className="tree__folder"
      indent={String(safeLevel)} // Convert level to string to avoid NaN warning
    >
      <VerticalLine>
        <ActionsWrapper>
          {isEditing ? (
            <PlaceholderInput
              type="folder"
              style={{ marginLeft: 0 }}
              folderLevel={safeLevel - 2}
              defaultValue={name}
              handleSubmit={(name) => {
                dispatch({ type: "RENAME_FOLDER", payload: { id, name } });
                setEditing(false);
              }}
            />
          ) : (
            <FolderName
              name={name}
              isOpen={isOpen} // This is passed to FolderName
              handleClick={() => setIsOpen(!isOpen)} // Toggle folder open/close
            />
          )}

          {isImparative && (
            <div className="actions">
              <AiOutlineEdit onClick={handleFolderRename} />
              <AiOutlineFileAdd onClick={handleFileCreation} />
              <AiOutlineFolderAdd onClick={handleFolderCreation} />
              <AiOutlineDelete onClick={handleDeleteFolder} />
            </div>
          )}
        </ActionsWrapper>

        {/* Make sure `isOpen` is only passed to the Collapse component */}
        <Collapse isOpen={isOpen}>
          {childs}
        </Collapse>
      </VerticalLine>
    </StyledFolder>
  );
};

Folder.defaultProps = {
  level: 0, // Set default value for level
  parentPath: ""
};

export { Folder, FolderName };
