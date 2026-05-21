"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { items: cartItems, clearCart } = useCartStore();
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const delivery = cartItems.length > 0 ? 3.99 : 0;
  const total = subtotal + tax + delivery;

  const isFormValid = cardNumber.length >= 16 && expiry.length >= 5 && cvc.length >= 3;

  const handleCheckout = async () => {
    if (!isFormValid) {
      setError('Please fill in your credit card details completely.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // 1. Simulate Stripe/Razorpay Payment Processing Network Latency
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPaymentSuccess(true);
      
      // Give the user 1 second to see the success checkmark
      await new Promise(resolve => setTimeout(resolve, 1000));

      const itemsPayload = cartItems.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity
      }));

      // 2. Create Order in Database
      const res = await fetchApi('/orders/checkout', {
        method: 'POST',
        body: JSON.stringify({ 
          restaurantId: cartItems[0]?.restaurantId || '22222222-2222-2222-2222-222222222222', 
          items: itemsPayload 
        })
      });

      clearCart();
      router.push(`/orders/${res.id}`);
    } catch (err: any) {
      setError(err.message || 'Payment processing failed');
      setPaymentSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 pt-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <button onClick={() => router.push('/')} className="text-orange-600 font-bold">Browse Restaurants</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 pt-24">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="bg-card border p-6 rounded-2xl shadow-sm relative overflow-hidden">
            {paymentSuccess && (
              <div className="absolute inset-0 bg-green-500/90 z-10 flex flex-col items-center justify-center text-white backdrop-blur-sm animate-in fade-in duration-300">
                 <svg className="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                 </svg>
                 <span className="font-bold text-xl">Payment Successful!</span>
              </div>
            )}
          
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium mb-1">Card Number</label>
                 <input 
                   type="text" 
                   value={cardNumber}
                   onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                   placeholder="•••• •••• •••• 4242" 
                   className="w-full border rounded-lg px-4 py-3 bg-background focus:ring-2 focus:ring-orange-600 outline-none transition-shadow" 
                 />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium mb-1">Expiry</label>
                   <input 
                     type="text" 
                     value={expiry}
                     onChange={e => {
                       let val = e.target.value.replace(/\D/g, '');
                       if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
                       setExpiry(val);
                     }}
                     placeholder="MM/YY" 
                     className="w-full border rounded-lg px-4 py-3 bg-background focus:ring-2 focus:ring-orange-600 outline-none transition-shadow" 
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium mb-1">CVC</label>
                   <input 
                     type="password" 
                     value={cvc}
                     onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                     placeholder="123" 
                     className="w-full border rounded-lg px-4 py-3 bg-background focus:ring-2 focus:ring-orange-600 outline-none transition-shadow" 
                   />
                 </div>
               </div>
               
               <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground bg-muted p-3 rounded-lg">
                 <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                 </svg>
                 Payments are secured by MockStripe 256-bit encryption.
               </div>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 p-6 rounded-2xl h-fit border shadow-sm">
           <h2 className="text-xl font-bold mb-4">Order Summary</h2>
           <div className="space-y-3 mb-6">
             {cartItems.map(item => (
               <div key={item.id} className="flex justify-between text-sm font-medium">
                 <span>{item.quantity}x {item.name}</span>
                 <span>${(item.price * item.quantity).toFixed(2)}</span>
               </div>
             ))}
           </div>
           
           <div className="border-t pt-4 space-y-2 text-sm text-muted-foreground">
             <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
             <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
             <div className="flex justify-between"><span>Delivery Fee</span><span>${delivery.toFixed(2)}</span></div>
           </div>

           <div className="border-t mt-4 pt-4 flex justify-between font-bold text-2xl">
             <span>Total</span>
             <span>${total.toFixed(2)}</span>
           </div>

           {error && <p className="text-red-500 text-sm mt-4 p-3 bg-red-50 rounded-lg">{error}</p>}

           <button 
             onClick={handleCheckout}
             disabled={loading || !isFormValid}
             className="w-full mt-8 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-600/30 disabled:opacity-50 relative overflow-hidden"
           >
             {loading ? (
               <span className="flex items-center justify-center gap-2">
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Processing Payment...
               </span>
             ) : (
               `Pay $${total.toFixed(2)}`
             )}
           </button>
        </div>
      </div>
    </div>
  );
}
