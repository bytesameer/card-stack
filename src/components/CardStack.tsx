
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

    // Clear existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Set initial positions
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.set(card, {
          scale: index === 0 ? 1 : 0.8,
          y: index === 0 ? 0 : 100,
          zIndex: cards.length - index,
          transformOrigin: "center center"
        });
      }
    });

    // Create animations for each card
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      if (index > 0) {
        // Animation for cards coming in
        ScrollTrigger.create({
          trigger: container,
          start: `top+=${(index - 1) * window.innerHeight * 0.8} top`,
          end: `top+=${index * window.innerHeight * 0.8} top`,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Current card scales up and moves to center
            gsap.to(card, {
              scale: 0.8 + (progress * 0.2),
              y: 100 - (progress * 100),
              duration: 0.1,
              ease: "none"
            });
          }
        });
      }

      if (index < cards.length - 1) {
        // Animation for cards going out (being covered)
        ScrollTrigger.create({
          trigger: container,
          start: `top+=${index * window.innerHeight * 0.8} top`,
          end: `top+=${(index + 1) * window.innerHeight * 0.8} top`,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Previous card scales down and moves slightly up
            gsap.to(card, {
              scale: 1 - (progress * 0.1),
              y: -progress * 30,
              duration: 0.1,
              ease: "none"
            });
          }
        });
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
      className="relative bg-gray-100"
      style={{ height: `${cards.length * 80}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
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
