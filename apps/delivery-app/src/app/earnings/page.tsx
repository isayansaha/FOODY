export default function Earnings() {
  const deliveries = [
    { id: 1, time: '12:30 PM', amount: 8.50, distance: '2.4 mi' },
    { id: 2, time: '1:15 PM', amount: 12.20, distance: '4.1 mi' },
    { id: 3, time: '2:45 PM', amount: 6.00, distance: '1.2 mi' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Earnings</h1>
        <p className="text-muted-foreground">Your performance for today.</p>
      </div>

      <div className="bg-orange-600 text-white rounded-3xl p-6 shadow-xl shadow-orange-600/20">
        <p className="text-orange-100 font-medium mb-1">Today's Total</p>
        <h2 className="text-5xl font-extrabold">$26.70</h2>
        <div className="mt-6 flex justify-between text-sm">
          <div>
            <p className="text-orange-200">Deliveries</p>
            <p className="font-bold text-lg">3</p>
          </div>
          <div>
            <p className="text-orange-200">Online Time</p>
            <p className="font-bold text-lg">3h 45m</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-4">Trip History</h3>
        <div className="space-y-4">
          {deliveries.map((trip) => (
            <div key={trip.id} className="bg-card border p-4 rounded-2xl flex justify-between items-center">
              <div>
                <p className="font-bold">{trip.time}</p>
                <p className="text-sm text-muted-foreground">{trip.distance}</p>
              </div>
              <p className="font-bold text-lg text-green-600 dark:text-green-500">+${trip.amount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
