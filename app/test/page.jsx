"use client"
import React, { useState } from 'react';
import Draggable from 'react-draggable';

const DraggableClickableElement = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [touchStartPosition, setTouchStartPosition] = useState({ x: 0, y: 0 });

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setTouchStartPosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (event) => {
    if (!isDragging) {
      const touch = event.touches[0];
      const offsetX = touch.clientX - touchStartPosition.x;
      const offsetY = touch.clientY - touchStartPosition.y;
      setDragOffset({ x: offsetX, y: offsetY });
      setIsDragging(true);
    }
  };

  const handleDrag = (event, data) => {
    if (isDragging) {
      // Handle drag event here
      console.log('Element Dragged!', data.x, data.y);
    }
  };

  const handleStop = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    console.log('Container Clicked!');
  };

  return (
      <div className='mainContentPage'>
        <Draggable
        onStart={(event) => event.stopPropagation()} // Prevent dragging when interacting with child elements
        onDrag={handleDrag}
        onStop={handleStop}
        defaultPosition={{ x: 0, y: 0 }}
        bounds="parent"
        >
        <div
            className="draggable-clickable-element"
            onMouseDown={() => setIsDragging(false)} // Reset dragging state on mouse down
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onClick={handleClick}
        >
            Drag and Click Me!
        </div>
        </Draggable>

      </div>
  );
};

export default DraggableClickableElement;


