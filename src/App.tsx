import React, { useState } from 'react';
import { TravelForm } from './components/TravelForm';
import { TravelResults } from './components/TravelResults';
import { TravelPlan } from './lib/genai';
import { Sparkles, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="min-h-screen selection:bg-blue-200">
      <header className="bg-slate-900 border-b border-slate-800 text-white relative overflow-hidden">
         <div className="absolute top-0 left-1/4 p-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -z-0 translate-x-12 -translate-y-32"></div>
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-xl border border-blue-500 shadow-md">
              <Map className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">Travel in 1 Click</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-slate-400 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>AI Multi-Agent System</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 sm:py-20 flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          {!plan && (
            <motion.div 
              key="hero"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, height: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 max-w-2xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                Your entire trip, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">planned in minutes</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                Just tell us where you want to go, from where, and your budget. Our AI agents will hunt down flights, hotels, and create a full itinerary.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <TravelForm 
          onPlanGenerated={setPlan} 
          isGenerating={isGenerating} 
          setIsGenerating={setIsGenerating} 
        />

        <AnimatePresence>
          {plan && (
            <motion.div key="results" className="w-full">
              <TravelResults plan={plan} />
            </motion.div>
          )}
        </AnimatePresence>
        
      </main>
    </div>
  );
}
