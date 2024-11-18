import React from 'react';

interface GridSizeSelectorProps {
  onSelect: (size: number) => void;
}

export function GridSizeSelector({ onSelect }: GridSizeSelectorProps) {
  const sizes = [2, 4, 6];

  return (
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Grid Size</h2>
      <div className="flex gap-4">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className="px-6 py-3 bg-white border-2 border-indigo-500 text-indigo-500 rounded-lg font-semibold
              hover:bg-indigo-500 hover:text-white transition-all duration-300"
          >
            {size}x{size}
          </button>
        ))}
      </div>
    </div>
  );
}