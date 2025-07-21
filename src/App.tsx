// RootApp.tsx
import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';
import Tools from './components/Tools';
import Report from './components/Report';

export default function RootApp() {
  const [title, setTitle] = useState('Painting Title');
  const [shapes, setShapes] = useState<{ type: string; id: number; x: number; y: number }[]>([]);
  const [idCounter, setIdCounter] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleExport = () => {
    const data = JSON.stringify({"shapes": shapes, "title": title}, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'painting.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        setShapes(importedData["shapes"]);
        setTitle(importedData["title"])
        setIdCounter(
            importedData["shapes"].reduce((max, shape) => Math.max(max, shape.id), 0) + 1
        );
      } catch (err) {
        console.error('Invalid JSON');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-screen border p-4 gap-4 bg-white text-black">
      <Header
        title={title}
        setTitle={setTitle}
        onExport={handleExport}
        onImport={handleImportClick}
      />
      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex flex-1 gap-4">
        <div className="flex-1 border p-2 relative">
          <Canvas
            shapes={shapes}
            updateShapePosition={updateShapePosition}
            removeShape={removeShape}
          />
        </div>
        <Tools addShape={addShape} />
      </div>
      <Report shapes={shapes} />
    </div>
  );
}
