
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
        className="card-stack-item absolute inset-0 w-full"
        style={{ zIndex: 10 - index }}
      >
        <Card className="h-full bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 text-white shadow-2xl hover:shadow-3xl transition-shadow duration-300 group hover:border-purple-500/50">
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
            <CardTitle className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <CardDescription className="text-gray-300 text-lg leading-relaxed">
              {card.description}
            </CardDescription>
            
            {card.achievements && (
              <div className="grid grid-cols-3 gap-4">
                {card.achievements.map((achievement, idx) => (
                  <div key={idx} className="text-center p-3 bg-gray-800/50 rounded-lg border border-gray-600">
                    <div className="text-sm font-medium text-purple-300">
                      {achievement}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-500/20 to-transparent ml-2"></div>
              <span className="text-xs text-gray-400 ml-2">Project #{card.id}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
);

CardStackItem.displayName = 'CardStackItem';

export default CardStackItem;
