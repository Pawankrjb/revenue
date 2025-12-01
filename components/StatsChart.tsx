import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

const data: ChartDataPoint[] = [
  { name: 'Mon', value: 4000, revenue: 2400 },
  { name: 'Tue', value: 3000, revenue: 1398 },
  { name: 'Wed', value: 2000, revenue: 9800 },
  { name: 'Thu', value: 2780, revenue: 3908 },
  { name: 'Fri', value: 1890, revenue: 4800 },
  { name: 'Sat', value: 2390, revenue: 3800 },
  { name: 'Sun', value: 3490, revenue: 4300 },
];

export const StatsChart: React.FC = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stackId="1" 
            stroke="#4F46E5" 
            fill="url(#colorValue)" 
            fillOpacity={0.2} 
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stackId="1" 
            stroke="#10B981" 
            fill="url(#colorRevenue)" 
            fillOpacity={0.2} 
          />
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
