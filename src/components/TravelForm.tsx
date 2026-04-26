import { form } from "motion/react-client";
import React, { useState } from "react";
import { PlaneTakeoff, Loader2 } from "lucide-react";
import { motion } from "motion/react";

interface TravelFormProps {
  onPlanGenerated: (planData: any) => void;
  isGenerating: boolean;
  setIsGenerating: (status: boolean) => void;
}

export function TravelForm({ onPlanGenerated, isGenerating, setIsGenerating }: TravelFormProps) {
  const [query, setQuery] = useState("Mujhe 50k budget main Dubai trip plan karo from Pakistan");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsGenerating(true);
    setError(null);
    try {
      const { generateTravelPlan } = await import("../lib/genai");
      const plan = await generateTravelPlan(query);
      onPlanGenerated(plan);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate plan. Please verify your API key and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-xl border border-blue-100 p-6 sm:p-10 rounded-3xl shadow-xl shadow-blue-900/5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-32 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10 translate-x-16 -translate-y-16"></div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/30">
          <PlaneTakeoff className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">Plan Your Journey</h2>
          <p className="text-slate-500 text-sm">Describe your dream trip in detail.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="travel-query" className="text-sm font-medium text-slate-700 ml-1">
            Trip Description
          </label>
          <textarea
            id="travel-query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isGenerating}
            placeholder="e.g. Mujhe 50k budget main Dubai trip plan karo from Pakistan..."
            className="w-full min-h-[140px] bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 resize-none disabled:opacity-50"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isGenerating || !query.trim()}
          className="w-full bg-slate-900 text-white font-medium py-4 px-6 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-600 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-slate-900 shadow-xl shadow-slate-900/10 group"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Consulting Multi-Agent System...</span>
            </>
          ) : (
            <>
              <span>Generate Travel Plan</span>
              <PlaneTakeoff className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
