export default function OrdersManagement() {
  return (
    <div className="space-y-8 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Active Orders</h1>
        <p className="text-muted-foreground">Manage incoming orders in real-time.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Column */}
        <div className="bg-muted/50 rounded-xl p-4 flex flex-col">
          <h2 className="font-semibold mb-4 text-orange-500">PENDING (2)</h2>
          <div className="space-y-3 flex-1 overflow-y-auto">
            <div className="bg-card border p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">#1024</span>
                <span className="text-sm text-muted-foreground">2 mins ago</span>
              </div>
              <p className="text-sm">1x Truffle Fries</p>
              <p className="text-sm">2x Margherita Pizza</p>
              <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white rounded-md py-2 text-sm font-medium transition-colors">
                Accept Order
              </button>
            </div>
          </div>
        </div>

        {/* Preparing Column */}
        <div className="bg-muted/50 rounded-xl p-4 flex flex-col">
          <h2 className="font-semibold mb-4 text-blue-500">PREPARING (1)</h2>
          <div className="space-y-3 flex-1 overflow-y-auto">
             <div className="bg-card border p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">#1023</span>
                <span className="text-sm text-muted-foreground">15 mins ago</span>
              </div>
              <p className="text-sm">3x Sushi Platter</p>
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 text-sm font-medium transition-colors">
                Mark Ready
              </button>
            </div>
          </div>
        </div>

        {/* Ready Column */}
        <div className="bg-muted/50 rounded-xl p-4 flex flex-col">
          <h2 className="font-semibold mb-4 text-green-500">READY FOR PICKUP (0)</h2>
          <div className="space-y-3 flex-1 overflow-y-auto">
            <div className="h-32 flex items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground text-sm">
              No orders ready.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
