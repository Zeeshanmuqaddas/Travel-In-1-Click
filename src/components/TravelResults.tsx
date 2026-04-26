import React from "react";
import { TravelPlan } from "../lib/genai";
import { motion } from "motion/react";
import { Plane, Bed, MapPin, BadgeCheck, Lightbulb, Wallet, Clock, CheckCircle2, ChevronRight, FileText } from "lucide-react";

interface TravelResultsProps {
  plan: TravelPlan;
}

export function TravelResults({ plan }: TravelResultsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-5xl mx-auto space-y-8 mt-12 pb-24"
    >
      {/* Header Dashboard */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-3xl shadow-lg shadow-blue-900/20 col-span-1 md:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-white rounded-full blur-3xl opacity-10 -z-0 translate-x-16 -translate-y-16"></div>
          <div className="relative z-10 flex flex-col h-full justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Trip to {plan.destination}
            </h1>
            <p className="text-blue-100 flex items-center gap-2">
              <Wallet className="w-4 h-4" /> Allocated Budget: {plan.budget}
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl flex flex-col justify-center items-center text-center shadow-sm">
          <div className="p-3 bg-green-50 text-green-600 rounded-full mb-3">
            <BadgeCheck className="w-8 h-8" />
          </div>
          <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">Total Estimated Cost</h3>
          <p className="text-2xl tracking-tight font-bold text-slate-800">{plan.total_estimated_cost}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Flights Section */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                <Plane className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">Flight Options</h2>
            </div>
            <div className="space-y-4">
              {plan.flights.map((flight, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-1">{flight.airline}</h3>
                    <p className="text-slate-500 text-sm">{flight.route}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-lg text-slate-800">{flight.price}</p>
                    <p className="text-slate-400 text-xs mt-1 max-w-[200px] truncate" title={flight.notes}>{flight.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Hotels Section */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                <Bed className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">Hotel Recommendations</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {plan.hotels.map((hotel, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group">
                  <h3 className="font-semibold text-slate-800 mb-2 truncate" title={hotel.name}>{hotel.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                      <span className="text-slate-500">Price</span>
                      <span className="font-medium text-slate-900">{hotel.price_per_night}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4 opacity-50 shrink-0" />
                      <span className="truncate">{hotel.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <BadgeCheck className="w-4 h-4 opacity-50 shrink-0 text-amber-500" />
                      <span>{hotel.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Itinerary */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-teal-100 text-teal-600 rounded-xl">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">Daily Itinerary</h2>
            </div>
            <div className="relative pl-4 space-y-6">
              {/* Timeline line */}
              <div className="absolute left-[27px] top-4 bottom-4 w-px bg-slate-200"></div>
              
              {plan.itinerary.map((day, idx) => (
                <div key={idx} className="relative flex gap-6">
                  <div className="w-10 h-10 shrink-0 bg-white border-2 border-teal-500 text-teal-600 rounded-full flex items-center justify-center font-bold text-sm z-10 shadow-sm">
                    {day.day}
                  </div>
                  <div className="flex-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm pt-4">
                    <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                       Day {day.day}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                      {day.plan}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

        </div>

        <div className="space-y-8">
          
          {/* Visa Guidance */}
          <motion.section variants={itemVariants} className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl overflow-hidden relative">
             <div className="absolute top-0 right-0 p-24 bg-slate-800 rounded-full blur-3xl opacity-50 -z-0 translate-x-12 -translate-y-12"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-800 text-blue-400 rounded-xl border border-slate-700">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-semibold">Visa Guidance</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                  <span className="block text-slate-400 text-xs mb-1 uppercase tracking-wider font-semibold">Requirement</span>
                  <span className="font-medium text-blue-100">{plan.visa.requirement}</span>
                </div>
                
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                  <span className="block text-slate-400 text-xs mb-1 uppercase tracking-wider font-semibold">Processing Time</span>
                  <span className="font-medium text-slate-200 flex items-center gap-2"><Clock className="w-4 h-4 opacity-50" /> {plan.visa.processing_time}</span>
                </div>
                
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                  <span className="block text-slate-400 text-xs mb-1 uppercase tracking-wider font-semibold">Cost</span>
                  <span className="font-medium text-slate-200">{plan.visa.cost}</span>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                  <span className="block text-slate-400 text-xs mb-1 uppercase tracking-wider font-semibold">Documents Needed</span>
                  <p className="text-sm text-slate-300 leading-relaxed mt-2 p-3 bg-slate-900/50 rounded-xl whitespace-pre-wrap border border-slate-700/30">
                    {plan.visa.documents}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Expert Tips */}
          <motion.section variants={itemVariants} className="bg-amber-50 p-6 rounded-3xl border border-amber-200 text-amber-900">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-200 text-amber-700 rounded-xl">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">Expert Tips</h2>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {plan.tips}
            </p>
          </motion.section>
        </div>

      </div>
    </motion.div>
  );
}
