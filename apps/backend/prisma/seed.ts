import { Client } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load the .env file
dotenv.config({ path: path.join(__dirname, '../.env') });
const connectionString = process.env.DATABASE_URL || 'postgresql://root:rootpassword@localhost:5432/foody_db?schema=public';

async function main() {
  console.log('Seeding database with RAW SQL...');
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log('Connected to PostgreSQL successfully.');

    const passwordHash = await bcrypt.hash('password123', 10);

    // Seed Users
    const users = [
      { id: '00000000-0000-0000-0000-000000000000', email: 'admin@foody.com', role: 'ADMIN' },
      { id: '88888888-8888-8888-8888-888888888888', email: 'driver@foody.com', role: 'DELIVERY' },
      { id: '99999999-9999-9999-9999-999999999999', email: 'customer@foody.com', role: 'CUSTOMER' },
      { id: '11111111-1111-1111-1111-111111111111', email: 'owner@foody.com', role: 'RESTAURANT' }
    ];

    for (const user of users) {
      await client.query(`
        INSERT INTO "User" (id, email, "passwordHash", role, "createdAt")
        VALUES ($1, $2, $3, $4, NOW())
        ON CONFLICT (email) DO NOTHING
      `, [user.id, user.email, passwordHash, user.role]);
    }

    // Seed Restaurant
    const ownerId = '11111111-1111-1111-1111-111111111111';
    const restaurantId = '22222222-2222-2222-2222-222222222222';
    
    await client.query(`
      INSERT INTO "Restaurant" (id, name, "ownerId")
      VALUES ($1, 'Pizza Paradise', $2)
      ON CONFLICT (id) DO NOTHING
    `, [restaurantId, ownerId]);

    // Seed Menu Items
    const items = [
      { id: '33333333-3333-3333-3333-333333333333', name: 'Truffle Fries', price: 8.99 },
      { id: '44444444-4444-4444-4444-444444444444', name: 'Margherita Pizza', price: 14.99 },
      { id: '55555555-5555-5555-5555-555555555555', name: 'Spicy Chicken Sandwich', price: 12.99 }
    ];

    for (const item of items) {
      await client.query(`
        INSERT INTO "MenuItem" (id, name, price, "restaurantId")
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING
      `, [item.id, item.name, item.price, restaurantId]);
    }

    console.log('Seeding finished successfully! You can now login.');
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
