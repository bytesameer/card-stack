
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardStackItem from './CardStackItem';
import { Card } from '@/types/Card';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface CardStackProps {
  cards: Card[];
  containerHeight?: string;
}

const CardStack: React.FC<CardStackProps> = ({ 
  cards, 
  containerHeight = '50vh' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || cards.length === 0) return;

    // Set initial positions and scales
    cardRefs.current.forEach((card, index) => {
      if (card) {
        const scale = Math.max(0.7, 1 - (index * 0.15));
        const yOffset = index * 20;
        
        gsap.set(card, {
          scale: scale,
          y: yOffset,
          zIndex: 10 - index,
          transformOrigin: 'center bottom'
        });
      }
    });

    let wheelTimeout: NodeJS.Timeout;
    
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;
      
      e.preventDefault();
      
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        const direction = e.deltaY > 0 ? 1 : -1;
        
        if (direction > 0 && currentIndex < cards.length - 1) {
          // Scroll down - next card
          animateToNext();
        } else if (direction < 0 && currentIndex > 0) {
          // Scroll up - previous card
          animateToPrevious();
        } else if (currentIndex === cards.length - 1 && direction > 0) {
          // Allow normal page scroll after last card
          document.body.style.overflow = 'auto';
          return;
        }
      }, 50);
    };

    const animateToNext = () => {
      if (currentIndex >= cards.length - 1) return;
      
      setIsAnimating(true);
      const nextIndex = currentIndex + 1;
      
      // Animate current card out (scale down and move up)
      const currentCard = cardRefs.current[currentIndex];
      if (currentCard) {
        gsap.to(currentCard, {
          scale: 0.7,
          y: -100,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
      
      // Animate all cards to new positions
      cardRefs.current.forEach((card, index) => {
        if (card && index > currentIndex) {
          const newScale = Math.max(0.7, 1 - ((index - nextIndex) * 0.15));
          const newY = (index - nextIndex) * 20;
          
          gsap.to(card, {
            scale: newScale,
            y: newY,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: index === nextIndex ? () => {
              setCurrentIndex(nextIndex);
              setIsAnimating(false);
            } : undefined
          });
        }
      });
    };

    const animateToPrevious = () => {
      if (currentIndex <= 0) return;
      
      setIsAnimating(true);
      const prevIndex = currentIndex - 1;
      
      // Animate all cards to new positions
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const newScale = Math.max(0.7, 1 - ((index - prevIndex) * 0.15));
          const newY = (index - prevIndex) * 20;
          
          gsap.to(card, {
            scale: newScale,
            y: newY,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: index === prevIndex ? () => {
              setCurrentIndex(prevIndex);
              setIsAnimating(false);
            } : undefined
          });
        }
      });
    };

    // Prevent normal scrolling when in card stack area
    document.body.style.overflow = 'hidden';
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
      document.body.style.overflow = 'auto';
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [cards.length, currentIndex, isAnimating]);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  // Support for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      gsap.globalTimeline.timeScale(0.1);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="card-stack-container relative mx-auto max-w-4xl px-4"
      style={{ height: containerHeight }}
      role="group"
      aria-label="Interactive card stack"
      aria-live="polite"
      aria-describedby="card-stack-instructions"
    >
      <div className="sr-only" id="card-stack-instructions">
        Use scroll wheel or swipe to navigate through cards. Currently showing card {currentIndex + 1} of {cards.length}.
      </div>
      
      {cards.map((card, index) => (
        <CardStackItem
          key={card.id}
          card={card}
          index={index}
          ref={setCardRef(index)}
        />
      ))}
      
      {/* Progress indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-purple-500' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardStack;
