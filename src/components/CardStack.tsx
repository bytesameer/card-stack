
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || cards.length === 0) return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Set initial positions for all cards
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.set(card, {
          yPercent: index === 0 ? 0 : 100,
          zIndex: cards.length - index
        });
      }
    });

    // Create scroll animations for each card
    cardRefs.current.forEach((card, index) => {
      if (card && index > 0) {
        const previousCard = cardRefs.current[index - 1];
        
        ScrollTrigger.create({
          trigger: container,
          start: `top+=${index * window.innerHeight * 0.8} top`,
          end: `top+=${(index + 1) * window.innerHeight * 0.8} top`,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Animate current card sliding up
            gsap.to(card, {
              yPercent: 100 - (progress * 100),
              duration: 0.1,
              ease: "none"
            });
            
            // Animate previous card sliding up and out
            if (previousCard) {
              gsap.to(previousCard, {
                yPercent: -(progress * 100),
                duration: 0.1,
                ease: "none"
              });
            }
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [cards.length]);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: `${cards.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
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
