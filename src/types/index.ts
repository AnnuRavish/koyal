export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[]; // Main images array (includes primary + 4 additional)
  additionalImages?: string[]; // 4 additional images for gallery
  category: string;
  description: string;
  keyHighlights: string[];
  reviews: number;
  rating: number;
  inStock: boolean;
  sizes?: string[];
  isOnSale?: boolean;
  isNew?: boolean;
  brand?: string;
  ingredients?: string[];
  howToUse?: string;
  benefits?: string[];
  skinType?: string[];
  concerns?: string[];
  weight?: string;
  manufactureDate?: string;
  expiryDate?: string;
  countryOfOrigin?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  size?: string;
  description?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: string;
  paymentMethod?: string;
  customerInfo?: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}