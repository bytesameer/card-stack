
import React from 'react';
import { Card as CardType } from '@/types/Card';

interface CardStackItemProps {
  card: CardType;
  index: number;
}

const CardStackItem = React.forwardRef<HTMLDivElement, CardStackItemProps>(
  ({ card, index }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute inset-0 flex items-center justify-center p-8"
        style={{ 
          willChange: 'transform',
          zIndex: index + 1
        }}
      >
        <div className="w-full max-w-5xl h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden flex">
          {/* Image Section */}
          <div className="w-1/2 bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
            {card.imageUrl ? (
              <img 
                src={card.imageUrl} 
                alt={card.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-white text-6xl font-bold">
                {card.id}
              </div>
            )}
          </div>
          
          {/* Content Section */}
          <div className="w-1/2 p-8 flex flex-col justify-center">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {card.year}
              </span>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ml-2 ${
                card.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {card.status}
              </span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {card.title}
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {card.description}
            </p>
            
            {card.achievements && (
              <div className="flex flex-wrap gap-2">
                {card.achievements.map((achievement, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

CardStackItem.displayName = 'CardStackItem';

export default CardStackItem;
