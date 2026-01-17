import { Box, Button, Icon, IconButton, Stack, Typography } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';

type RadialTreeNode = {
  label: string;
  icon: React.ReactNode;
  children?: RadialTree | null;
}

type RadialTree = {
  [key: string]: RadialTreeNode
}

export function getTreeByPath(tree: RadialTree, path: string[]): RadialTree {
  let currentTree = tree;
  for (const nodeKey of path) {
    const node = currentTree[nodeKey];
    if (node && node.children) {
      currentTree = node.children;
    }
    else {
      return {};
    }
  }
  return currentTree;
}

interface RadialTreeSelectorProps {
  tree: RadialTree;
  selectedPath: string[];
  setSelectedPath: (selectedPath: string[]) => void;
}

const RadialTreeSelector: React.FC<RadialTreeSelectorProps> = ({ tree, selectedPath, setSelectedPath }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  /* const selectedNode: RadialTreeNode | null = getNodeByPath(tree, selectedPath); */
  const currentTree: RadialTree = getTreeByPath(tree, currentPath);
  const numChildren = Object.keys(currentTree).length;

  function getTransformStyle(index: number, total: number) {
    const angle = 180 - (180 / (total - 1)) * index;
    if (!isCollapsed) {
      return `rotate(${angle}deg) translate(4em) rotate(-${angle}deg)`;
    }
    else {
      return `translateX(-2em) translateY(${index * 1}em)`;
    }
  }

  function handleRootClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    e.preventDefault();
    if (!isCollapsed) {
      setCurrentPath([]);
      setIsCollapsed(true);
    }
    else {
      setIsCollapsed(false);
    }
  }

  function handleNodeClick(e: React.MouseEvent<HTMLElement>, nodeKey: string) {
    e.stopPropagation();
    e.preventDefault();
    const node = currentTree[nodeKey];
    const newPath = [...currentPath, nodeKey];
    if (node.children) {
      setCurrentPath(newPath);
    }
    else {
      setSelectedPath(newPath);
      setCurrentPath([]);
      setIsCollapsed(true);
    }
  }

  return (
    <Stack sx={{
      position: "relative",
      width: "3em",
      height: "3em",
    }}>
      {numChildren > 0 && Object.keys(currentTree).map((nodeKey, index) => {
        const node = currentTree[nodeKey];
        return (
          <Button key={nodeKey} variant="contained" startIcon={node.icon} disabled={isCollapsed} onClick={(e) => handleNodeClick(e, nodeKey)} sx={{
            position: "absolute",
            top: "0",
            left: "0",
            transform: getTransformStyle(index, numChildren),
            transition: "transform 0.3s ease-in-out",
            textWrap: "nowrap",
          }}>
            <Typography sx={{
              maxWidth: isCollapsed ? "0em" : "6em",
              overflow: "hidden",
              transition: "max-width 0.3s ease-in-out",
            }}>
              {node.label}
            </Typography>
            </Button>
        );
      })}
      <IconButton onClick={handleRootClick} sx={{
        flex: "1",
        backgroundColor: "primary.main",
      }}>
        {/* {selectedNode && selectedNode.icon} */}
      </IconButton>
    </Stack>
  );
}

export default RadialTreeSelector;
