import React from 'react';

interface ToolsProps {
  addShape: (type: string) => void;
}

export default function Tools({ addShape }: ToolsProps) {
  return (
    <div className="w-32 border p-4 flex flex-col items-center gap-4">
      <p className="font-semibold">Tools</p>
      <button onClick={() => addShape('circle')} className="w-12 h-12 rounded-full border" />
      <button onClick={() => addShape('square')} className="w-12 h-12 border" />
      <button onClick={() => addShape('triangle')} className="w-0 h-0 border-l-[24px] border-r-[24px] border-b-[48px] border-transparent border-b-black" />
    </div>
  );
}

