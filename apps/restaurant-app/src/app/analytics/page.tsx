"use client";

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const weeklyData = [
  { name: 'Mon', revenue: 1200, orders: 45 },
  { name: 'Tue', revenue: 1800, orders: 60 },
  { name: 'Wed', revenue: 1500, orders: 55 },
  { name: 'Thu', revenue: 2100, orders: 80 },
  { name: 'Fri', revenue: 3200, orders: 120 },
  { name: 'Sat', revenue: 4500, orders: 160 },
  { name: 'Sun', revenue: 3800, orders: 140 },
];

const monthlyData = [
  { name: 'Week 1', revenue: 12000, orders: 450 },
  { name: 'Week 2', revenue: 15000, orders: 520 },
  { name: 'Week 3', revenue: 13500, orders: 480 },
  { name: 'Week 4', revenue: 18200, orders: 610 },
];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');

  const currentData = timeframe === 'weekly' ? weeklyData : monthlyData;
  const totalRevenue = currentData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalOrders = currentData.reduce((acc, curr) => acc + curr.orders, 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track your restaurant's performance and growth.</p>
        </div>
        <div className="flex bg-muted p-1 rounded-lg">
          <button 
            onClick={() => setTimeframe('weekly')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${timeframe === 'weekly' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setTimeframe('monthly')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${timeframe === 'monthly' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-green-500 mt-2 font-medium">+14.5% from last period</p>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">{totalOrders.toLocaleString()}</p>
          <p className="text-sm text-green-500 mt-2 font-medium">+8.2% from last period</p>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Average Order Value</h3>
          <p className="text-3xl font-bold mt-2">${(totalRevenue / totalOrders).toFixed(2)}</p>
          <p className="text-sm text-red-500 mt-2 font-medium">-1.4% from last period</p>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Customer Satisfaction</h3>
          <p className="text-3xl font-bold mt-2">4.8/5</p>
          <p className="text-sm text-green-500 mt-2 font-medium">+0.2 from last period</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-card p-6 rounded-xl border shadow-sm h-[400px]">
          <h2 className="text-xl font-bold mb-6">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.2} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888888' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888888' }} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Line type="monotone" dataKey="revenue" stroke="#ea580c" strokeWidth={4} dot={{ r: 4, fill: '#ea580c', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card p-6 rounded-xl border shadow-sm h-[400px]">
          <h2 className="text-xl font-bold mb-6">Order Volume</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.2} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888888' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888888' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: 'transparent' }}
              />
              <Bar dataKey="orders" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
