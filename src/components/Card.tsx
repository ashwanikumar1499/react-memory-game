import React from 'react';

interface CardProps {
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const pokemonImages = [
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png',
];

export function Card({ value, isFlipped, isMatched, onClick }: CardProps) {
  const imageUrl = pokemonImages[value % pokemonImages.length];

  return (
    <div
      onClick={!isFlipped && !isMatched ? onClick : undefined}
      className={`relative w-28 h-28 cursor-pointer perspective-1000 ${isMatched ? 'opacity-60' : ''}`}
    >
      <div
        className={`absolute w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute w-full h-full bg-white rounded-lg shadow-md border border-gray-200 backface-hidden">
          <div className="w-full h-full flex items-center justify-center bg-red-50 rounded-lg">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              alt="Pokeball"
              className="w-16 h-16"
            />
          </div>
        </div>
        <div className="absolute w-full h-full bg-white rounded-lg shadow-md border border-gray-200 backface-hidden rotate-y-180">
          <div className="w-full h-full flex items-center justify-center bg-white rounded-lg">
            <img
              src={imageUrl}
              alt="Pokemon"
              className="w-20 h-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}