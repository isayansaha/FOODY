"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Users, Store, Activity } from 'lucide-react';

const data = [
  { name: 'Week 1', revenue: 40000, users: 2400 },
  { name: 'Week 2', revenue: 45000, users: 3100 },
  { name: 'Week 3', revenue: 52000, users: 4800 },
  { name: 'Week 4', revenue: 68000, users: 6200 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Global Overview</h1>
        <p className="text-muted-foreground">Platform-wide metrics and performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-semibold text-sm text-muted-foreground">Total Revenue</h3>
             <DollarSign className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-3xl font-bold">$205,000</p>
          <p className="text-xs text-green-500 mt-2">↑ +14.5% from last month</p>
        </div>
        
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-semibold text-sm text-muted-foreground">Active Users</h3>
             <Users className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-3xl font-bold">16,500</p>
          <p className="text-xs text-blue-500 mt-2">↑ +8.2% from last month</p>
        </div>

        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-semibold text-sm text-muted-foreground">Partner Restaurants</h3>
             <Store className="h-4 w-4 text-orange-500" />
          </div>
          <p className="text-3xl font-bold">245</p>
          <p className="text-xs text-orange-500 mt-2">12 pending approval</p>
        </div>

        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-semibold text-sm text-muted-foreground">System Health</h3>
             <Activity className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-3xl font-bold">99.9%</p>
          <p className="text-xs text-muted-foreground mt-2">All systems operational</p>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6 h-[500px] shadow-sm">
        <h3 className="font-semibold mb-6 text-lg">Growth Trajectory (Last 30 Days)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: '#222', borderColor: '#444' }} />
            <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
