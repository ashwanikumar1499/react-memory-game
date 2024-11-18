import React from 'react';
import { Trophy } from 'lucide-react';

interface SuccessModalProps {
  moves: number;
  time: number;
  onRestart: () => void;
}

export function SuccessModal({ moves, time, onRestart }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all">
        <div className="flex flex-col items-center">
          <Trophy className="w-16 h-16 text-yellow-400 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Congratulations!</h2>
          <p className="text-gray-600 text-center mb-6">
            You've completed the game in {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')} minutes with {moves} moves!
          </p>
          <button
            onClick={onRestart}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}