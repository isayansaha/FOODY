"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  price: z.number().positive({ message: "Price must be positive." }),
  category: z.string().min(1, { message: "Category is required." }),
});

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState([
    { id: '1', name: 'Truffle Fries', category: 'Starters', price: 8.99, imageUrl: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&q=80' },
    { id: '2', name: 'Margherita Pizza', category: 'Mains', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80' },
  ]);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
    },
  });

  const handleSimulatedUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate Cloudinary upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 150));
    }

    // Assign a beautiful stock image for the demo
    const stockImages = [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', // Burger
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80', // Dessert
      'https://images.unsplash.com/photo-1544025162-811114bd0547?w=400&q=80', // Drink
    ];
    setImageUrl(stockImages[Math.floor(Math.random() * stockImages.length)]);
    setIsUploading(false);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: values.name,
      category: values.category,
      price: values.price,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', // Default restaurant placeholder
    };
    
    setMenuItems((prev) => [...prev, newItem]);
    
    form.reset();
    setImageUrl(null);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
        <p className="text-muted-foreground">Add, edit, or remove items from your menu.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="border rounded-xl p-6 bg-card shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
          
          {/* Cloudinary Simulator Dropzone */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Item Image (Powered by Cloudinary)</label>
            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${imageUrl ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-orange-500 hover:bg-orange-50/50'}`}>
              
              {imageUrl ? (
                <div className="relative group">
                  <img src={imageUrl} alt="Uploaded" className="w-full h-40 object-cover rounded-lg shadow-sm" />
                  <button onClick={() => setImageUrl(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ) : isUploading ? (
                <div className="space-y-3 py-6">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-600 transition-all duration-150 ease-out" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground animate-pulse">Uploading to Cloudinary... {uploadProgress}%</p>
                </div>
              ) : (
                <label className="cursor-pointer block py-6 space-y-2">
                  <div className="mx-auto w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-orange-600">Click to upload image</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                  <input type="file" className="hidden" accept="image/*" onChange={handleSimulatedUpload} />
                </label>
              )}
            </div>
          </div>

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

            <button type="submit" disabled={isUploading} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white h-10 px-4 py-2 w-full bg-orange-600 hover:bg-orange-700">
              Save Item
            </button>
          </form>
        </div>

        <div className="border rounded-xl p-0 bg-card overflow-hidden shadow-sm h-fit">
          <div className="p-6 border-b bg-muted/30">
            <h2 className="text-xl font-semibold">Current Menu</h2>
          </div>
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {menuItems.length === 0 ? (
              <p className="text-muted-foreground text-sm p-6">Your menu is currently empty.</p>
            ) : (
              menuItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 hover:bg-muted/50 transition-colors">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-lg">{item.name}</p>
                        <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-md mt-1 font-medium">{item.category}</span>
                      </div>
                      <p className="font-bold text-lg text-orange-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
