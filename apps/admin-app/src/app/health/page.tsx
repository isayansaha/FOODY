"use client";

import { useState, useEffect } from 'react';

export default function SystemHealth() {
  const [cpuUsage, setCpuUsage] = useState(42);
  const [memoryUsage, setMemoryUsage] = useState(68);
  const [activeConnections, setActiveConnections] = useState(124);

  // Simulate live metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => {
        const jump = Math.floor(Math.random() * 10) - 5;
        return Math.min(Math.max(prev + jump, 10), 95);
      });
      setMemoryUsage(prev => {
        const jump = Math.floor(Math.random() * 4) - 2;
        return Math.min(Math.max(prev + jump, 40), 90);
      });
      setActiveConnections(prev => {
        const jump = Math.floor(Math.random() * 14) - 7;
        return Math.max(prev + jump, 50);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 pb-12 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Health</h1>
        <p className="text-muted-foreground">Monitor the global platform infrastructure and microservices.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-muted-foreground">CPU Usage</h2>
            <span className={`px-2 py-1 text-xs font-bold rounded-full ${cpuUsage > 80 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {cpuUsage > 80 ? 'HIGH' : 'HEALTHY'}
            </span>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-bold">{cpuUsage}%</span>
            <span className="text-muted-foreground text-sm mb-1">of 8 Cores</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2.5">
            <div className={`h-2.5 rounded-full transition-all duration-1000 ${cpuUsage > 80 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${cpuUsage}%` }}></div>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-muted-foreground">Memory Usage</h2>
            <span className={`px-2 py-1 text-xs font-bold rounded-full ${memoryUsage > 85 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
              {memoryUsage > 85 ? 'CRITICAL' : 'STABLE'}
            </span>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-bold">{memoryUsage}%</span>
            <span className="text-muted-foreground text-sm mb-1">of 16 GB</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2.5">
            <div className={`h-2.5 rounded-full transition-all duration-1000 ${memoryUsage > 85 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${memoryUsage}%` }}></div>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-muted-foreground">Active WebSockets</h2>
            <span className="px-2 py-1 text-xs font-bold rounded-full bg-orange-100 text-orange-600">LIVE</span>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-bold">{activeConnections}</span>
            <span className="text-muted-foreground text-sm mb-1">Clients connected</span>
          </div>
          <div className="flex gap-1 h-2.5">
             {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className={`flex-1 rounded-full ${i < (activeConnections / 10) ? 'bg-orange-500' : 'bg-secondary'} transition-all duration-500`}></div>
             ))}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Microservice Status</h2>
      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="p-4 font-semibold text-sm">Service Name</th>
              <th className="p-4 font-semibold text-sm">Port</th>
              <th className="p-4 font-semibold text-sm">Uptime</th>
              <th className="p-4 font-semibold text-sm">Latency</th>
              <th className="p-4 font-semibold text-sm">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              { name: 'Customer App (Next.js)', port: 3000, uptime: '14d 2h', latency: '45ms', status: 'Operational', color: 'bg-green-500' },
              { name: 'Core API (NestJS)', port: 3001, uptime: '14d 2h', latency: '12ms', status: 'Operational', color: 'bg-green-500' },
              { name: 'PostgreSQL DB', port: 5432, uptime: '30d 12h', latency: '2ms', status: 'Operational', color: 'bg-green-500' },
              { name: 'Redis Cache', port: 6379, uptime: '30d 12h', latency: '1ms', status: 'Operational', color: 'bg-green-500' },
              { name: 'Payment Gateway', port: 'External', uptime: 'N/A', latency: '230ms', status: 'Degraded', color: 'bg-yellow-500' },
            ].map((service, i) => (
              <tr key={i} className="hover:bg-muted/20 transition-colors">
                <td className="p-4 font-medium">{service.name}</td>
                <td className="p-4 text-muted-foreground font-mono text-sm">{service.port}</td>
                <td className="p-4 text-muted-foreground text-sm">{service.uptime}</td>
                <td className="p-4 text-muted-foreground text-sm">{service.latency}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${service.color} animate-pulse`}></span>
                    <span className="text-sm font-medium">{service.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
