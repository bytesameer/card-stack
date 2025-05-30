
import React from 'react';
import CardStack from '@/components/CardStack';
import { cardData } from '@/data/cardData';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center min-h-screen flex flex-col justify-center">
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
      <CardStack cards={cardData} />

      {/* Demo Content After Cards */}
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="container mx-auto px-4 py-32">
          <div className="text-center text-white mb-16">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our holistic solutions can drive your digital transformation forward.
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Started Today
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-600">
              <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
              <p className="text-gray-300">Cutting-edge solutions that drive business growth</p>
            </div>
            <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-600">
              <h3 className="text-xl font-bold text-white mb-4">Scalability</h3>
              <p className="text-gray-300">Built to grow with your business needs</p>
            </div>
            <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-600">
              <h3 className="text-xl font-bold text-white mb-4">Support</h3>
              <p className="text-gray-300">24/7 dedicated support for your success</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Demo Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-white mb-8">The Future is Here</h2>
          <p className="text-2xl text-gray-400 max-w-4xl mx-auto">
            Experience seamless integration of technology and business strategy that propels your organization into the digital age.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
