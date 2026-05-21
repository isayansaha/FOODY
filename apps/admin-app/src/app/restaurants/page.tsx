import { Search, MoreHorizontal, CheckCircle, XCircle } from 'lucide-react';

export default function RestaurantManagement() {
  const restaurants = [
    { id: '1', name: 'Pizza Paradise', owner: 'Luigi Mario', status: 'ACTIVE', joined: 'Oct 12, 2024' },
    { id: '2', name: 'Burger Joint', owner: 'Bob Belcher', status: 'ACTIVE', joined: 'Nov 04, 2024' },
    { id: '3', name: 'Sushi Spot', owner: 'Jiro Ono', status: 'PENDING', joined: 'Just Now' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Restaurant Management</h1>
          <p className="text-muted-foreground">Approve, suspend, and view partner restaurants.</p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm transition-colors">
          Export CSV
        </button>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center space-x-4 bg-muted/20">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search restaurants by name or owner..." 
              className="w-full pl-9 pr-4 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
            />
          </div>
          <select className="bg-background border rounded-md px-3 py-2 text-sm focus:outline-none">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Active</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Restaurant Name</th>
                <th className="px-6 py-4 font-medium">Owner</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {restaurants.map((r) => (
                <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium">{r.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{r.owner}</td>
                  <td className="px-6 py-4">
                    {r.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/50">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{r.joined}</td>
                  <td className="px-6 py-4 text-right">
                    {r.status === 'PENDING' ? (
                      <div className="flex justify-end space-x-2">
                        <button className="text-green-500 hover:text-green-600 p-1" title="Approve">
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button className="text-red-500 hover:text-red-600 p-1" title="Reject">
                          <XCircle className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <button className="text-muted-foreground hover:text-foreground p-1">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    )}
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
