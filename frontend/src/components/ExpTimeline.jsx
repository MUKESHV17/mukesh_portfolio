import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Award } from 'lucide-react';

const ExpTimeline = ({ experiences }) => {
  if (!experiences || experiences.length === 0) return null;

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-12">
      {/* Central Axis Glowing Line */}
      <div className="timeline-track" />

      <div className="flex flex-col gap-12">
        {experiences.map((exp, idx) => {
          const { role, company, duration, description } = exp;
          // Alternating layouts for desktop (left / right side)
          const isEven = idx % 2 === 0;

          return (
            <div key={exp._id || idx} className="relative flex flex-col md:flex-row items-center justify-between">
              {/* Outer dot axis coordinate */}
              <div className="absolute left-[20px] md:left-1/2 transform -translate-x-[9px] md:-translate-x-1/2 z-20 flex items-center justify-center">
                <div className="w-[18px] h-[18px] rounded-full bg-cyber-black border-2 border-neon-cyan shadow-neon-cyan animate-pulse flex items-center justify-center">
                  <div className="w-[6px] h-[6px] rounded-full bg-neon-cyan" />
                </div>
              </div>

              {/* Left Side spacer / Content block for alternate alignments */}
              <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:text-right md:order-1' : 'md:order-2'}`}>
                {isEven && (
                  <div className="hidden md:block">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold font-orbitron uppercase bg-neon-cyan/10 border border-neon-cyan text-neon-cyan rounded-full mb-3 shadow-neon-cyan/20">
                      <Calendar className="w-3.5 h-3.5" /> {duration}
                    </span>
                  </div>
                )}
              </div>

              {/* Active Experience Card */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, type: 'spring', damping: 20 }}
                className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:order-2' : 'md:order-1'}`}
              >
                <div className="glass-card p-6 rounded-2xl relative border border-white/10 hover:border-neon-cyan/30 transition-all duration-300">
                  {/* Glowing corner overlay */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-neon-cyan/5 to-transparent rounded-tr-2xl pointer-events-none" />

                  {/* Header Row */}
                  <div className="flex flex-col gap-2 mb-4">
                    {/* Duration badge mobile */}
                    <div className="md:hidden">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-bold font-orbitron uppercase bg-neon-cyan/10 border border-neon-cyan text-neon-cyan rounded-full shadow-neon-cyan/25">
                        <Calendar className="w-3 h-3" /> {duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/35 text-neon-cyan">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <h3 className="text-xl font-bold font-orbitron text-white text-left">
                        {role}
                      </h3>
                    </div>
                    
                    <h4 className="text-sm font-semibold font-rajdhani text-neon-cyan uppercase tracking-wider pl-9 text-left">
                      {company}
                    </h4>
                  </div>

                  {/* Description points */}
                  <ul className="flex flex-col gap-2.5 pl-9 text-sm text-gray-400 text-left list-none">
                    {(description || []).map((bullet, i) => (
                      <li key={i} className="relative pl-4 leading-relaxed font-sans">
                        <span className="absolute left-0 top-[8px] w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpTimeline;
