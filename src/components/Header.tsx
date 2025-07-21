import React from 'react';

interface HeaderProps {
  title: string;
  setTitle: (title: string) => void;
}

export default function Header({ title, setTitle }: HeaderProps) {
  return (
    <div className="flex justify-between items-center border p-2">
      <input
        className="border p-1 w-1/3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Painting Title"
      />
      <div className="space-x-2">
        <button className="hover:bg-blue-100 border px-3 py-1">Export</button>
        <button className="hover:bg-blue-100 border px-3 py-1">Import</button>
      </div>
    </div>
  );
}

