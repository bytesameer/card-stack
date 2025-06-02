
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

    // Set initial positions and scales
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.set(card, {
          y: 0,
          scale: 1,
          zIndex: cards.length - index, // Higher index = higher z-index for stacking
          transformOrigin: "center center"
        });
      }
    });

    // Create scroll animations for each card
    cardsRef.current.forEach((card, index) => {
      if (card && index < cards.length - 1) {
        // Create animation for current card (scales down and moves up slightly)
        ScrollTrigger.create({
          trigger: container,
          start: `top+=${index * window.innerHeight} top`,
          end: `top+=${(index + 1) * window.innerHeight} top`,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Current card scales down and moves up slightly as it gets covered
            gsap.to(card, {
              scale: 1 - (progress * 0.1), // Scale from 1 to 0.9
              y: -progress * 50, // Move up slightly
              duration: 0.1,
              ease: "none"
            });
          }
        });
      }

      // Animation for the next card coming in
      if (card && index > 0) {
        const prevCard = cardsRef.current[index - 1];
        
        ScrollTrigger.create({
          trigger: container,
          start: `top+=${(index - 1) * window.innerHeight} top`,
          end: `top+=${index * window.innerHeight} top`,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Next card scales up from below as it comes into view
            gsap.to(card, {
              scale: 0.8 + (progress * 0.2), // Scale from 0.8 to 1
              y: 100 - (progress * 100), // Move from bottom to center
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
      className="relative"
      style={{ height: `${cards.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
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
