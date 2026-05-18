"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="border rounded-xl p-6 bg-card">
          <h3 className="font-semibold text-sm text-muted-foreground">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">$2,450.00</p>
        </div>
        <div className="border rounded-xl p-6 bg-card">
          <h3 className="font-semibold text-sm text-muted-foreground">Active Orders</h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
        <div className="border rounded-xl p-6 bg-card">
          <h3 className="font-semibold text-sm text-muted-foreground">Menu Items</h3>
          <p className="text-3xl font-bold mt-2">48</p>
        </div>
      </div>

      <div className="border rounded-xl p-6 bg-card h-[400px]">
        <h3 className="font-semibold mb-4">Revenue (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="revenue" stroke="#ea580c" strokeWidth={3} />
            <CartesianGrid stroke="#333" strokeDasharray="5 5" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: '#222', borderColor: '#444' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
