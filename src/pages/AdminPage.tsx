import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Edit, Trash2, Users, ShoppingBag, Package, TrendingUp, DollarSign, Eye, Star, Award } from 'lucide-react';
import { Product, User, Order } from '../types';

export default function AdminPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('products');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    image: '',
    additionalImage1: '',
    additionalImage2: '',
    additionalImage3: '',
    additionalImage4: '',
    category: '',
    description: '',
    keyHighlights: '',
    reviews: '',
    rating: '',
    inStock: true,
    sizes: '',
    isOnSale: false,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      image: '',
      additionalImage1: '',
      additionalImage2: '',
      additionalImage3: '',
      additionalImage4: '',
      category: '',
      description: '',
      keyHighlights: '',
      reviews: '',
      rating: '',
      inStock: true,
      sizes: '',
      isOnSale: false,
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create images array with main image and additional images
    const allImages = [
      formData.image || 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
      formData.additionalImage1,
      formData.additionalImage2,
      formData.additionalImage3,
      formData.additionalImage4
    ].filter(Boolean); // Remove empty strings
    
    const productData: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      image: formData.image || 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
      images: allImages,
      additionalImages: [formData.additionalImage1, formData.additionalImage2, formData.additionalImage3, formData.additionalImage4].filter(Boolean),
      category: formData.category,
      description: formData.description,
      keyHighlights: formData.keyHighlights.split('\n').filter(Boolean),
      reviews: Number(formData.reviews),
      rating: Number(formData.rating),
      inStock: formData.inStock,
      sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()) : undefined,
      isOnSale: formData.isOnSale,
    };

    if (editingProduct) {
      dispatch({ type: 'UPDATE_PRODUCT', payload: productData });
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: productData });
    }

    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    const additionalImages = product.additionalImages || [];
    setFormData({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      image: product.image,
      additionalImage1: additionalImages[0] || '',
      additionalImage2: additionalImages[1] || '',
      additionalImage3: additionalImages[2] || '',
      additionalImage4: additionalImages[3] || '',
      category: product.category,
      description: product.description,
      keyHighlights: product.keyHighlights.join('\n'),
      reviews: product.reviews.toString(),
      rating: product.rating.toString(),
      inStock: product.inStock,
      sizes: product.sizes?.join(', ') || '',
      isOnSale: product.isOnSale || false,
    });
    setShowForm(true);
  };

  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      dispatch({ type: 'DELETE_PRODUCT', payload: productId });
    }
  };

  const handleOrderStatusUpdate = (orderId: string, status: Order['status']) => {
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
      dispatch({ type: 'UPDATE_ORDER', payload: { ...order, status } });
    }
  };

  const tabs = [
    { id: 'products', name: 'Products', icon: Package },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'orders', name: 'Orders', icon: ShoppingBag },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
  ];

  // Analytics calculations
  const totalRevenue = state.orders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = state.products.length;
  const totalUsers = state.users.length;
  const totalOrders = state.orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Manage your FIXDERMA store</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold">{totalOrders}</p>
              </div>
              <ShoppingBag className="w-12 h-12 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold">{totalUsers}</p>
              </div>
              <Users className="w-12 h-12 text-purple-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Products</p>
                <p className="text-3xl font-bold">{totalProducts}</p>
              </div>
              <Package className="w-12 h-12 text-orange-200" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Products Management</h2>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-teal-600 hover:to-blue-600 transition-all duration-300 font-bold shadow-lg transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                <span>Add Product</span>
              </button>
            </div>

            {showForm && (
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-all duration-300"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-all duration-300"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Original Price (optional)"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-all duration-300"
                  />
                  <input
                    type="text"
                    placeholder="Main Image URL"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-all duration-300"
                  />
                  
                  {/* Additional Images Section */}
                  <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-300">
                    <h4 className="text-sm font-bold text-gray-700 mb-3">Additional Product Images (Gallery)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Additional Image 1 URL"
                        value={formData.additionalImage1}
                        onChange={(e) => setFormData(prev => ({ ...prev, additionalImage1: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm transition-all duration-300"
                      />
                      <input
                        type="text"
                        placeholder="Additional Image 2 URL"
                        value={formData.additionalImage2}
                        onChange={(e) => setFormData(prev => ({ ...prev, additionalImage2: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm transition-all duration-300"
                      />
                      <input
                        type="text"
                        placeholder="Additional Image 3 URL"
                        value={formData.additionalImage3}
                        onChange={(e) => setFormData(prev => ({ ...prev, additionalImage3: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm transition-all duration-300"
                      />
                      <input
                        type="text"
                        placeholder="Additional Image 4 URL"
                        value={formData.additionalImage4}
                        onChange={(e) => setFormData(prev => ({ ...prev, additionalImage4: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm transition-all duration-300"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">These images will be shown in the product gallery and can be cycled through on the product card.</p>
                  </div>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-all duration-300"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Serum">Serum</option>
                    <option value="Cream">Cream</option>
                    <option value="Face Wash">Face Wash</option>
                    <option value="Sunscreen">Sunscreen</option>
                    <option value="Foot Care">Foot Care</option>
                    <option value="Body Care">Body Care</option>
                  </select>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-xl">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                        className="w-4 h-4 text-teal-600"
                      />
                      <span className="font-medium">In Stock</span>
                    </label>
                    <label className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-xl">
                      <input
                        type="checkbox"
                        checked={formData.isOnSale}
                        onChange={(e) => setFormData(prev => ({ ...prev, isOnSale: e.target.checked }))}
                        className="w-4 h-4 text-teal-600"
                      />
                      <span className="font-medium">On Sale</span>
                    </label>
                  </div>
                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 md:col-span-2 transition-all duration-300"
                    rows={3}
                    required
                  />
                  <textarea
                    placeholder="Key Highlights (one per line)"
                    value={formData.keyHighlights}
                    onChange={(e) => setFormData(prev => ({ ...prev, keyHighlights: e.target.value }))}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 md:col-span-2 transition-all duration-300"
                    rows={3}
                  />
                  <input
                    type="number"
                    placeholder="Number of Reviews"
                    value={formData.reviews}
                    onChange={(e) => setFormData(prev => ({ ...prev, reviews: e.target.value }))}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-all duration-300"
                    required
                  />
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    placeholder="Rating (0-5)"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-all duration-300"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Sizes (comma separated, optional)"
                    value={formData.sizes}
                    onChange={(e) => setFormData(prev => ({ ...prev, sizes: e.target.value }))}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 md:col-span-2 transition-all duration-300"
                  />
                  <div className="md:col-span-2 flex space-x-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-3 rounded-xl hover:from-teal-600 hover:to-blue-600 transition-all duration-300 font-bold shadow-lg transform hover:scale-105"
                    >
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-500 text-white px-8 py-3 rounded-xl hover:bg-gray-600 transition-all duration-300 font-bold shadow-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-contain bg-gradient-to-br from-orange-100 to-orange-300 shadow-sm"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900 line-clamp-1">{product.name}</div>
                            <div className="text-xs text-gray-500 flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{product.reviews} reviews</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-xs font-bold bg-teal-100 text-teal-800 rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">₹{product.price}</div>
                        {product.originalPrice && (
                          <div className="text-xs text-gray-500 line-through">₹{product.originalPrice}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                          product.inStock
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-teal-600 hover:text-teal-800 hover:bg-teal-50 rounded-lg transition-all duration-200"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Users Management</h2>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-bold text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">ID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                          user.isAdmin
                            ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.isAdmin ? (
                            <div className="flex items-center space-x-1">
                              <Award className="w-3 h-3" />
                              <span>Admin</span>
                            </div>
                          ) : (
                            'User'
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Orders Management ({state.orders.length})</h2>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.orders.map((order) => {
                    const customer = state.users.find(u => u.id === order.userId);
                    return (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <span className="bg-gray-100 px-3 py-1 rounded-full font-bold">
                            #{order.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-xs">
                                {(customer?.name || 'G').charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="ml-2 font-medium">{customer?.name || 'Guest'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            <div>{order.customerInfo?.email || customer?.email}</div>
                            <div className="text-xs text-gray-500">{order.customerInfo?.phone || customer?.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                            {order.items.length} items
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          ₹{order.total.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="capitalize bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                            {order.paymentMethod || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) => handleOrderStatusUpdate(order.id, e.target.value as Order['status'])}
                            className="text-sm border-2 border-gray-200 rounded-lg px-3 py-1 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="text-sm font-medium">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Analytics Dashboard</h2>
            
            {/* Wishlist Analytics */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Wishlist Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-500">{state.wishlist.length}</p>
                  <p className="text-sm text-gray-600">Total Wishlist Items</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-500">
                    {state.products.filter(p => state.wishlist.includes(p.id)).length}
                  </p>
                  <p className="text-sm text-gray-600">Unique Products Wishlisted</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-500">
                    {Math.round((state.wishlist.length / state.products.length) * 100)}%
                  </p>
                  <p className="text-sm text-gray-600">Wishlist Conversion Rate</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Average Order Value</h3>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-3xl font-black text-gray-900">₹{Math.round(averageOrderValue)}</p>
                <p className="text-sm text-gray-600 mt-2">Per order average</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Top Category</h3>
                  <Award className="w-8 h-8 text-purple-500" />
                </div>
                <p className="text-2xl font-black text-gray-900">Serum</p>
                <p className="text-sm text-gray-600 mt-2">Most popular category</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Growth Rate</h3>
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-3xl font-black text-green-600">+24%</p>
                <p className="text-sm text-gray-600 mt-2">This month</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">New order received</p>
                    <p className="text-sm text-gray-600">Order #12345 - ₹1,299</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">New user registered</p>
                    <p className="text-sm text-gray-600">Welcome to FIXDERMA!</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Product updated</p>
                    <p className="text-sm text-gray-600">Skarfix-Plus Serum details updated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}