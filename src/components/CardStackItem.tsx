
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
        className="absolute inset-0 w-full h-full flex items-center justify-center p-8"
      >
        <Card className="w-full max-w-4xl h-[600px] bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 text-white shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="outline" className="text-purple-300 border-purple-300">
                {card.year}
              </Badge>
              <Badge 
                variant={card.status === 'Active' ? 'default' : 'secondary'}
                className={card.status === 'Active' ? 'bg-green-600' : 'bg-gray-600'}
              >
                {card.status}
              </Badge>
            </div>
            <CardTitle className="text-4xl font-bold text-white">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <CardDescription className="text-gray-300 text-xl leading-relaxed">
              {card.description}
            </CardDescription>
            
            {card.achievements && (
              <div className="grid grid-cols-3 gap-6">
                {card.achievements.map((achievement, idx) => (
                  <div key={idx} className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-600">
                    <div className="text-lg font-medium text-purple-300">
                      {achievement}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between pt-6 border-t border-gray-600">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-500/20 to-transparent ml-4"></div>
              <span className="text-sm text-gray-400 ml-4">Project #{card.id}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
);

CardStackItem.displayName = 'CardStackItem';

export default CardStackItem;
