import React, { useEffect, useState } from 'react';
import { generateDailyInsight } from '../services/geminiService';
import { InsightState } from '../types';

interface DailyInsightProps {
  username: string;
}

export const DailyInsight: React.FC<DailyInsightProps> = ({ username }) => {
  const [state, setState] = useState<InsightState>({
    message: '',
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const fetchInsight = async () => {
      try {
        const message = await generateDailyInsight(username);
        if (mounted) {
          setState({ message, loading: false, error: null });
        }
      } catch (err) {
        if (mounted) {
          setState({ 
            message: '', 
            loading: false, 
            error: 'Could not load insight.' 
          });
        }
      }
    };

    fetchInsight();

    return () => {
      mounted = false;
    };
  }, [username]);

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-indigo-300 opacity-10 rounded-full blur-xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-2">
          <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
          </svg>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-100">Daily AI Insight</h3>
        </div>
        
        {state.loading ? (
          <div className="animate-pulse flex space-x-4">
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
          </div>
        ) : (
          <p className="text-lg md:text-xl font-medium leading-relaxed">
            "{state.message}"
          </p>
        )}
      </div>
    </div>
  );
};
