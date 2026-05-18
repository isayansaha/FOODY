import Link from 'next/link';

// Simulate SSR fetching
async function getRestaurants() {
  // In a real app, this would be a fetch to our NestJS backend
  return [
    { id: '1', name: 'Pizza Paradise', cuisine: 'Italian', rating: 4.8 },
    { id: '2', name: 'Burger Joint', cuisine: 'American', rating: 4.5 },
    { id: '3', name: 'Sushi Spot', cuisine: 'Japanese', rating: 4.9 },
  ];
}

export default async function RestaurantsPage() {
  const restaurants = await getRestaurants();

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <h1 className="text-3xl font-bold mb-6">Popular Restaurants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id}>
            <div className="border rounded-xl p-4 transition-all hover:shadow-lg hover:border-orange-500 bg-card cursor-pointer">
              <div className="aspect-video w-full bg-muted rounded-md mb-4 flex items-center justify-center text-muted-foreground">
                [Image Placeholder]
              </div>
              <h2 className="text-xl font-semibold">{restaurant.name}</h2>
              <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                <span>{restaurant.cuisine}</span>
                <span className="flex items-center text-yellow-500 font-medium">
                  ★ {restaurant.rating}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
