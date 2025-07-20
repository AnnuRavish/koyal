import React from 'react';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrderConfirmationPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your order. We've received your order and will process it shortly.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h2>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white mb-2">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <span className="text-sm text-gray-600">Confirmed</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-2">
                  <Package className="w-6 h-6" />
                </div>
                <span className="text-sm text-gray-600">Processing</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-2">
                  <Truck className="w-6 h-6" />
                </div>
                <span className="text-sm text-gray-600">Shipped</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-2">
                  <Home className="w-6 h-6" />
                </div>
                <span className="text-sm text-gray-600">Delivered</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/products')}
              className="w-full bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors font-medium"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full text-teal-600 hover:text-teal-800 py-3 px-6 border border-teal-200 rounded-lg font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}