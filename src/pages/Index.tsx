
import React from 'react';
import CardStack from '@/components/CardStack';
import { cardData } from '@/data/cardData';

const Index = () => {
  return (
    <div className="min-h-screen">
      <CardStack cards={cardData} />
    </div>
  );
};

export default Index;
