"use client";
import React, { useReducer, useLayoutEffect, useCallback } from "react";
import _cloneDeep from "lodash.clonedeep";
import { TreeContext } from "./TreeContext";
import { StyledTree } from "./Tree.style";
import { Folder } from "./TreeFolder";
import { File } from "./TreeFile";
import {
  searchDFS,
  createFile,
  createFolder,
  useDidMountEffect
} from "../utils";
import { v4 } from "uuid";

// Pre-process data and assign IDs if not present
const preprocessData = (data) => {
  return data.map(item => {
    if (!item.id) {
      item.id = v4();
    }
    if (item.type === "folder" && item.files) {
      item.files = preprocessData(item.files);
    }
    return item;
  });
};

// Reducer functions for different actions
const handleCreateFile = (state, action) => {
  const { node } = action.payload;
  node.files.push(createFile({ name: action.payload.name }));
  return state;
};

const handleEditFile = (state, action) => {
  const { node } = action.payload;
  node.name = action.payload.name;
  return state;
};

const handleDeleteFile = (state, action) => {
  const { parent, node } = action.payload;
  if (!parent) {
    return state.filter(file => file.id !== node.id);
  }
  parent.files = parent.files.filter(file => file.id !== node.id);
  return state;
};

const handleCreateFolder = (state, action) => {
  const { node } = action.payload;
  node.files.push(createFolder({ name: action.payload.name }));
  return state;
};

const handleRenameFolder = (state, action) => {
  const { node } = action.payload;
  node.name = action.payload.name;
  return state;
};

const handleDeleteFolder = (state, action) => {
  const { parent, node } = action.payload;
  if (!parent) {
    return state.filter(item => item.id !== node.id);
  }
  parent.files = parent.files.filter(item => item.id !== node.id);
  return state;
};

// Reducer function
const reducer = (state, action) => {
  let newState = _cloneDeep(state);
  let node = null;
  let parent = null;
  if (action.payload && action.payload.id) {
    let foundNode = searchDFS({
      data: newState,
      cond: item => item.id === action.payload.id
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
    onUpdate && onUpdate(state);
  }, [state]);

  // Callback to generate components
  const makeComponents = useCallback(
    data => {
      return data.map(item => {
        // No need to regenerate ids here since they're already assigned
        if (item.type === "file") {
          return <File key={item.id} id={item.id} name={item.name} />;
        }

        return (
          <Folder key={item.id} id={item.id} name={item.name}>
            {item.files &&
              item.files.map(file => {
                // Files already have ids, no need to regenerate
                file.parent = item; // reference to the parent folder
                if (file.type === "folder") {
                  return makeComponents([file]);
                }
                return (
                  <File
                    parent={item}
                    id={file.id}
                    key={file.id}
                    name={file.name}
                  />
                );
              })}
          </Folder>
        );
      });
    },
    []
  );

  const isImparative = data && !children;

  return (
    <TreeContext.Provider
      value={{
        isImparative,
        state,
        dispatch,
        onNodeClick: path => {
          onNodeClick && onNodeClick(path);
        }
      }}
    >
      <StyledTree>{isImparative ? makeComponents(state) : children}</StyledTree>
    </TreeContext.Provider>
  );
};

// Exporting components for use
Tree.File = File;
Tree.Folder = Folder;

export default Tree;
