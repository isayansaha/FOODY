"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  price: z.number().positive({ message: "Price must be positive." }),
  category: z.string().min(1, { message: "Category is required." }),
});

export default function MenuManagement() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Real implementation will POST to NestJS backend
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
        <p className="text-muted-foreground">Add, edit, or remove items from your menu.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="border rounded-xl p-6 bg-card">
          <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Item Name</label>
              <input 
                {...form.register("name")} 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {form.formState.errors.name && <p className="text-sm text-red-500 mt-1">{form.formState.errors.name.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <input 
                type="number" step="0.01"
                {...form.register("price", { valueAsNumber: true })} 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {form.formState.errors.price && <p className="text-sm text-red-500 mt-1">{form.formState.errors.price.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select 
                {...form.register("category")} 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a category</option>
                <option value="Starters">Starters</option>
                <option value="Mains">Mains</option>
                <option value="Desserts">Desserts</option>
                <option value="Beverages">Beverages</option>
              </select>
              {form.formState.errors.category && <p className="text-sm text-red-500 mt-1">{form.formState.errors.category.message}</p>}
            </div>

            <button type="submit" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-orange-600 hover:bg-orange-700 text-white">
              Save Item
            </button>
          </form>
        </div>

        <div className="border rounded-xl p-6 bg-card overflow-hidden">
          <h2 className="text-xl font-semibold mb-4">Current Menu</h2>
          <div className="space-y-4">
             <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Truffle Fries</p>
                  <p className="text-sm text-muted-foreground">Starters</p>
                </div>
                <p className="font-semibold">$8.99</p>
             </div>
             <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Margherita Pizza</p>
                  <p className="text-sm text-muted-foreground">Mains</p>
                </div>
                <p className="font-semibold">$14.99</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
