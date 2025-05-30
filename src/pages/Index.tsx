
import React from 'react';
import CardStack from '@/components/CardStack';
import { cardData } from '@/data/cardData';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6 text-white">
          Holistic Solutions
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          From concept to execution, we deliver end-to-end digital solutions that are 
          tailored, data-driven, and built to scale with your business needs.
        </p>
        <Button 
          variant="outline" 
          size="lg"
          className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white"
        >
          Explore our solutions
        </Button>
      </div>

      {/* Card Stack Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Our Projects</h2>
          <p className="text-gray-400">Scroll to explore our latest projects and achievements</p>
        </div>
        
        <CardStack cards={cardData} containerHeight="60vh" />
      </div>

      {/* Additional Content Section */}
      <div className="py-32 container mx-auto px-4">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how our holistic solutions can drive your digital transformation forward.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
