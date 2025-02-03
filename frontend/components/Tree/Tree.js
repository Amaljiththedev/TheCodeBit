import React, { useReducer, useLayoutEffect, useCallback } from "react";
import _cloneDeep from "lodash.clonedeep";
import PropTypes from 'prop-types';
import { TreeContext } from "./TreeContext";
import { StyledTree } from "./Tree.style";
import { Folder } from "./TreeFolder";
import { File } from "./TreeFile";
import { searchDFS, createFile, createFolder, useDidMountEffect } from "../utils";
import { v4 } from "uuid";

// Pre-process data and assign IDs if not present
const preprocessData = (data) => {
  return data.map(item => {
    if (!item.id) {
      item.id = v4(); // Assign unique id
    }
    if (item.type === "folder" && item.files) {
      item.files = preprocessData(item.files); // Recursively process sub-folders
    }
    return item;
  });
};

// Reducer functions for different actions
const handleCreateFile = (state, action) => {
  const { node, name } = action.payload;
  node.files.push(createFile({ name }));
  return state;
};

const handleEditFile = (state, action) => {
  const { node, name } = action.payload;
  node.name = name;
  return state;
};

const handleDeleteFile = (state, action) => {
  const { parent, node } = action.payload;
  if (!parent) {
    return state.filter(file => file.id !== node.id);
  }
  parent.files = parent.files?.filter(file => file.id !== node.id);
  return state;
};

const handleCreateFolder = (state, action) => {
  const { node, name } = action.payload;
  node.files.push(createFolder({ name }));
  return state;
};

const handleRenameFolder = (state, action) => {
  const { node, name } = action.payload;
  node.name = name;
  return state;
};

const handleDeleteFolder = (state, action) => {
  const { parent, node } = action.payload;
  if (!parent) {
    return state.filter(item => item.id !== node.id);
  }
  parent.files = parent.files?.filter(item => item.id !== node.id);
  return state;
};

// Reducer function
const reducer = (state, action) => {
  let newState = _cloneDeep(state);
  let node = null;
  let parent = null;
  if (action.payload && action.payload.id) {
    const foundNode = searchDFS({
      data: newState,
      cond: (item) => item.id === action.payload.id,
    });
    parent = foundNode.parent;
    node = foundNode.item;
  }

  switch (action.type) {
    case "SET_DATA":
      return action.payload;
    case "CREATE_FILE":
      return handleCreateFile(newState, action);
    case "EDIT_FILE":
      return handleEditFile(newState, action);
    case "DELETE_FILE":
      return handleDeleteFile(newState, action);
    case "CREATE_FOLDER":
      return handleCreateFolder(newState, action);
    case "RENAME_FOLDER":
      return handleRenameFolder(newState, action);
    case "DELETE_FOLDER":
      return handleDeleteFolder(newState, action);
    default:
      return state;
  }
};

// Tree component
const Tree = ({ children, data, onNodeClick, onUpdate }) => {
  const [state, dispatch] = useReducer(reducer, preprocessData(data));

  useLayoutEffect(() => {
    dispatch({ type: "SET_DATA", payload: preprocessData(data) });
  }, [data]);

  useDidMountEffect(() => {
    if (onUpdate) onUpdate(state);
  }, [state, onUpdate]);

  // Function to generate components
  const makeComponents = (data) => {
    return data.map(item => {
      // Handling file node
      if (item.type === "file") {
        return <File key={item.id} id={item.id} name={item.name} />;
      }

      // Handling folder node
      return (
        <Folder key={item.id} id={item.id} name={item.name}>
          {item.files &&
            item.files.map(file => {
              file.parent = item; // Reference to the parent folder
              return file.type === "folder" ? makeComponents([file]) : (
                <File parent={item} id={file.id} key={file.id} name={file.name} />
              );
            })}
        </Folder>
      );
    });
  };

  const isImparative = data && !children;

  return (
    <TreeContext.Provider
      value={{
        isImparative,
        state,
        dispatch,
        onNodeClick: (path) => {
          onNodeClick(path);
        },
      }}
    >
      <StyledTree>{isImparative ? makeComponents(state) : children}</StyledTree>
    </TreeContext.Provider>
  );
};

// Prop validation using PropTypes
Tree.propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.node,
  onNodeClick: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
};

Tree.File = File;
Tree.Folder = Folder;

export default Tree;
