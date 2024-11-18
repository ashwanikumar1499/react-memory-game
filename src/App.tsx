import React, { useState, useEffect } from 'react';
import { Card } from './components/Card';
import { GridSizeSelector } from './components/GridSizeSelector';
import { SuccessModal } from './components/SuccessModal';

function App() {
  const [gridSize, setGridSize] = useState<number | null>(null);
  const [cards, setCards] = useState<number[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [gameTime, setGameTime] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('bestScore');
    return saved ? parseInt(saved) : Infinity;
  });

  useEffect(() => {
    if (gridSize) {
      initializeGame(gridSize);
    }
  }, [gridSize]);

  useEffect(() => {
    let interval: number;
    if (gameStartTime && !showSuccess) {
      interval = window.setInterval(() => {
        setGameTime(Math.floor((Date.now() - gameStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStartTime, showSuccess]);

  const initializeGame = (size: number) => {
    const pairs = Array.from({ length: (size * size) / 2 }, (_, i) => i);
    const allCards = [...pairs, ...pairs].sort(() => Math.random() - 0.5);
    setCards(allCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameStartTime(Date.now());
    setGameTime(0);
    setShowSuccess(false);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedPairs.includes(cards[index])) return;
    
    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);
    
    if (flippedIndices.length === 1) {
      setMoves(m => m + 1);
      const firstCard = cards[flippedIndices[0]];
      const secondCard = cards[index];
      
      if (firstCard === secondCard) {
        setMatchedPairs(prev => [...prev, firstCard]);
        setFlippedIndices([]);
        
        if (matchedPairs.length + 1 === cards.length / 2) {
          const score = moves + 1;
          if (score < bestScore) {
            setBestScore(score);
            localStorage.setItem('bestScore', score.toString());
          }
          setShowSuccess(true);
        }
      } else {
        setTimeout(() => setFlippedIndices([]), 1000);
      }
    }
  };

  if (!gridSize) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <GridSizeSelector onSelect={setGridSize} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Memory Game</h1>
          <div className="text-lg text-gray-600">
            Time: {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')} | 
            Moves: {moves} | Best Score: {bestScore === Infinity ? '-' : bestScore}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-2 mb-8">
          <div
            className="grid gap-0.5 justify-center"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            }}
          >
            {cards.map((card, index) => (
              <Card
                key={index}
                value={card}
                isFlipped={flippedIndices.includes(index) || matchedPairs.includes(card)}
                isMatched={matchedPairs.includes(card)}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setGridSize(null)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-bold text-lg hover:bg-gray-700 transition-colors mr-4"
          >
            Change Grid
          </button>
          <button
            onClick={() => initializeGame(gridSize)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            Restart
          </button>
        </div>
      </div>

      {showSuccess && (
        <SuccessModal
          moves={moves}
          time={gameTime}
          onRestart={() => initializeGame(gridSize)}
        />
      )}
    </div>
  );
}

export default App;