import React from 'react';

interface Shape {
  type: string;
  id: number;
}

interface CanvasProps {
  shapes: Shape[];
}

const shapeStyles: Record<string, string> = {
  circle: 'w-12 h-12 rounded-full border',
  square: 'w-12 h-12 border',
  triangle: 'w-0 h-0 border-l-[24px] border-r-[24px] border-b-[48px] border-transparent border-b-black',
};

export default function Canvas({ shapes }: CanvasProps) {
  return (
    <div className="flex-1 border p-4 relative bg-white">
      <p className="text-center text-gray-500">Canvas</p>
      <div className="flex flex-wrap gap-4 mt-4">
        {shapes.map((shape) => (
          <div key={shape.id} className={shapeStyles[shape.type]} />
        ))}
      </div>
    </div>
  );
}

