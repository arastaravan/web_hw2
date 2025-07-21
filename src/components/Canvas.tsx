import React, { useRef } from 'react';

interface Shape {
  type: string;
  id: number;
  x: number;
  y: number;
}

interface CanvasProps {
  shapes: Shape[];
  updateShapePosition: (id: number, x: number, y: number) => void;
  removeShape: (id: number) => void;
}

const shapeStyles: Record<string, string> = {
  circle: 'w-12 h-12 rounded-full border bg-blue-200',
  square: 'w-12 h-12 border bg-green-200',
  triangle: 'w-0 h-0 border-l-[24px] border-r-[24px] border-b-[48px] border-transparent border-b-red-500',
};

export default function Canvas({ shapes, updateShapePosition, removeShape }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.MouseEvent, id: number) => {
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    const newX = e.clientX - canvasRect.left - 24; // center adjust
    const newY = e.clientY - canvasRect.top - 24;

    updateShapePosition(id, newX, newY);
  };

  const handleMouseDown = (
    e: React.MouseEvent,
    id: number
  ) => {
    if (e.button === 2) {
      e.preventDefault();
      removeShape(id);
    }

    const onMouseMove = (moveEvent: MouseEvent) => handleDrag(moveEvent as any, id);
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={canvasRef}
      className="w-full h-full relative"
      onContextMenu={(e) => e.preventDefault()}
    >
      {shapes.map((shape) => (
        <div
          key={shape.id}
          onMouseDown={(e) => handleMouseDown(e, shape.id)}
          className={`${shapeStyles[shape.type]} absolute cursor-move`}
          style={{ left: shape.x, top: shape.y }}
        />
      ))}
    </div>
  );
}

