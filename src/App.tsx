// RootApp.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';
import Tools from './components/Tools';
import Report from './components/Report';

export default function RootApp() {
  const [title, setTitle] = useState('My Painting');
  const [shapes, setShapes] = useState<{ type: string; id: number; x: number; y: number }[]>([]);
  const [idCounter, setIdCounter] = useState(1);

  const addShape = (type: string) => {
    setShapes([
      ...shapes,
      { type, id: idCounter, x: 50, y: 50 }
    ]);
    setIdCounter(idCounter + 1);
  };

  const updateShapePosition = (id: number, x: number, y: number) => {
    setShapes(prev =>
      prev.map(shape =>
        shape.id === id ? { ...shape, x, y } : shape
      )
    );
  };

  const removeShape = (id: number) => {
    setShapes(prev => prev.filter(shape => shape.id !== id));
  };

  return (
    <div className="flex flex-col h-screen border p-4 gap-4 bg-white text-black">
      <Header title={title} setTitle={setTitle} />
      <div className="flex flex-1 gap-4">
        <div className="flex-1 border p-2 relative">
          <Canvas shapes={shapes} updateShapePosition={updateShapePosition} removeShape={removeShape} />
        </div>
        <Tools addShape={addShape} />
      </div>
      <Report shapes={shapes} />
    </div>
  );
}

