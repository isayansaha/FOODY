import { Search, ShieldAlert } from 'lucide-react';

export default function UserManagement() {
  const users = [
    { id: 'u1', email: 'alice@example.com', role: 'CUSTOMER', status: 'ACTIVE' },
    { id: 'u2', email: 'driver.dan@example.com', role: 'DELIVERY', status: 'ACTIVE' },
    { id: 'u3', email: 'scammer@bad.com', role: 'CUSTOMER', status: 'BANNED' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage customers and delivery partners.</p>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center space-x-4 bg-muted/20">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search users by email..." 
              className="w-full pl-9 pr-4 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
            />
          </div>
          <select className="bg-background border rounded-md px-3 py-2 text-sm focus:outline-none">
            <option>All Roles</option>
            <option>Customer</option>
            <option>Delivery</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium">{u.email}</td>
                  <td className="px-6 py-4 text-muted-foreground">{u.role}</td>
                  <td className="px-6 py-4">
                    {u.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/50">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800/50">
                        Banned
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                     <button className="text-red-500 hover:text-red-600 p-1 flex items-center justify-end w-full space-x-1 font-medium" title="Ban User">
                        <ShieldAlert className="h-4 w-4" /> <span>Ban</span>
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
