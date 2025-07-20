import React from 'react';
import { useApp } from '../context/AppContext';
import ScrollReveal from '../components/ScrollReveal';
import { Minus, Plus, X, ShoppingBag, CreditCard, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const cartItems = state.cart.map(item => ({
    ...item,
    product: state.products.find(p => p.id === item.productId)!
  }));

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 499 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: itemId, quantity } });
    }
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="w-full bg-gray-50 min-h-screen flex items-center justify-center page-enter">
        <div className="text-center animate-fadeInUp">
          <ShoppingBag className="w-32 h-32 text-gray-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 text-lg">Add some amazing skincare products to get started</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 font-bold text-lg transform hover:scale-105"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen page-enter">
      <div className="container mx-auto px-4 py-8">
        <ScrollReveal direction="down">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <ScrollReveal direction="left">
            <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <ScrollReveal
                key={item.id} 
                direction="up"
                delay={index * 100}
              >
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-contain bg-gradient-to-br from-orange-100 to-orange-300 rounded-lg"
                    />
                    {item.product.isOnSale && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Sale
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.product.name}</h3>
                    <p className="text-gray-600 mb-2">{item.description || item.product.description}</p>
                    {item.size && (
                      <p className="text-sm text-gray-500 mb-2">Size: <span className="font-medium">{item.size}</span></p>
                    )}
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900">₹{item.product.price}</span>
                      {item.product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{item.product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                </div>
              </ScrollReveal>
            ))}
            </div>
          </ScrollReveal>

          {/* Order Summary */}
          <ScrollReveal direction="right">
            <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (GST 18%)</span>
                <span className="font-medium">₹{tax}</span>
              </div>
              
              <hr className="border-gray-200" />
              
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {subtotal < 499 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-yellow-600" />
                  <p className="text-sm text-yellow-800">
                    Add ₹{499 - subtotal} more to get free shipping!
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 px-6 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 mt-6 font-bold text-lg flex items-center justify-center space-x-2 transform hover:scale-105"
            >
              <CreditCard className="w-5 h-5" />
              <span>Proceed to Checkout</span>
            </button>

            <button
              onClick={() => navigate('/products')}
              className="w-full text-teal-600 hover:text-teal-800 py-3 px-6 border-2 border-teal-200 rounded-lg mt-3 font-medium transition-colors"
            >
              Continue Shopping
            </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}