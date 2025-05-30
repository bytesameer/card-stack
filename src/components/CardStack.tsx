
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardStackItem from './CardStackItem';
import { Card } from '@/types/Card';

gsap.registerPlugin(ScrollTrigger);

interface CardStackProps {
  cards: Card[];
}

const CardStack: React.FC<CardStackProps> = ({ cards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || cards.length === 0) return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Set initial positions - all cards start at bottom except first
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.set(card, {
          yPercent: index === 0 ? 0 : 100,
          zIndex: cards.length - index,
        });
      }
    });

    // Create animations for each card transition
    cardsRef.current.forEach((card, index) => {
      if (card && index < cards.length - 1) {
        const nextCard = cardsRef.current[index + 1];
        
        if (nextCard) {
          ScrollTrigger.create({
            trigger: container,
            start: `top+=${index * window.innerHeight} top`,
            end: `top+=${(index + 1) * window.innerHeight} top`,
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              
              // Current card slides up and out
              gsap.to(card, {
                yPercent: -100 * progress,
                duration: 0.1,
                ease: "none"
              });
              
              // Next card slides up from bottom
              gsap.to(nextCard, {
                yPercent: 100 - (100 * progress),
                duration: 0.1,
                ease: "none"
              });
            }
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [cards.length]);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: `${cards.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {cards.map((card, index) => (
          <CardStackItem
            key={card.id}
            card={card}
            index={index}
            ref={setCardRef(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardStack;
