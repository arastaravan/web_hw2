import React from 'react';

interface Shape {
  type: string;
}

interface ReportProps {
  shapes: Shape[];
}

export default function Report({ shapes }: ReportProps) {
  const counts = shapes.reduce(
    (acc, s) => {
      acc[s.type] = (acc[s.type] || 0) + 1;
      return acc;
    },
    { circle: 0, square: 0, triangle: 0 } as Record<string, number>
  );

  return (
    <div className="flex justify-around items-center border p-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full border" />
        <span>{counts.circle}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 border" />
        <span>{counts.square}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-transparent border-b-black" />
        <span>{counts.triangle}</span>
      </div>
    </div>
  );
}

