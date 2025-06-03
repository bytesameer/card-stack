
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
          scale: 1,
          y: index === 0 ? 0 : window.innerHeight, // First card at center, others below viewport
          zIndex: index + 1, // Later cards have higher z-index (card 2 on top of card 1, etc.)
          transformOrigin: "center center"
        });
      }
    });

    // Create animations for each card transition
    cardsRef.current.forEach((card, index) => {
      if (!card || index === 0) return; // Skip first card

      const prevCard = cardsRef.current[index - 1];
      if (!prevCard) return;

      // Animation for card coming in and previous card going out
      ScrollTrigger.create({
        trigger: container,
        start: `top+=${(index - 1) * window.innerHeight * 0.8} top`,
        end: `top+=${index * window.innerHeight * 0.8} top`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Current card slides up from bottom
          gsap.to(card, {
            y: window.innerHeight - (progress * window.innerHeight), // Move from bottom to center
            duration: 0.1,
            ease: "none"
          });

          // Previous card scales down and moves slightly up
          gsap.to(prevCard, {
            scale: 1 - (progress * 0.2), // Scale from 1.0 to 0.8
            y: -progress * 50, // Move slightly up
            duration: 0.1,
            ease: "none"
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [cards.length]);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  return (
    <div className="bg-gray-900">
      <div 
        ref={containerRef}
        className="relative"
        style={{ height: `${cards.length * 80}vh` }}
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
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
      {/* Extra blank space at bottom for testing scroll */}
      <div className="h-screen bg-gray-900"></div>
    </div>
  );
};

export default CardStack;
