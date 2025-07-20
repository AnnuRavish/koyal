import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, User, CartItem, Order, Category } from '../types';

interface AppState {
  products: Product[];
  users: User[];
  orders: Order[];
  categories: Category[];
  cart: CartItem[];
  wishlist: string[];
  currentUser: User | null;
  searchQuery: string;
  selectedCategory: string;
}

type AppAction = 
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER'; payload: Order }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'SET_CURRENT_USER'; payload: User | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string };

const initialState: AppState = {
  products: [],
  users: [],
  orders: [],
  categories: [],
  cart: [],
  wishlist: [],
  currentUser: null,
  searchQuery: '',
  selectedCategory: 'all',
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => p.id === action.payload.id ? action.payload : p)
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload)
      };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(o => o.id === action.payload.id ? action.payload : o)
      };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => 
        item.productId === action.payload.productId
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_TO_WISHLIST':
      if (state.wishlist.includes(action.payload)) {
        return state;
      }
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case 'REMOVE_FROM_WISHLIST':
      return { ...state, wishlist: state.wishlist.filter(id => id !== action.payload) };
    case 'CLEAR_WISHLIST':
      return { ...state, wishlist: [] };
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load data from localStorage
    const savedProducts = localStorage.getItem('fixderma_products');
    const savedUsers = localStorage.getItem('fixderma_users');
    const savedOrders = localStorage.getItem('fixderma_orders');
    const savedCart = localStorage.getItem('fixderma_cart');
    const savedWishlist = localStorage.getItem('fixderma_wishlist');
    const savedCurrentUser = localStorage.getItem('fixderma_currentUser');

    if (savedProducts && JSON.parse(savedProducts).length > 0) {
      dispatch({ type: 'SET_PRODUCTS', payload: JSON.parse(savedProducts) });
    } else {
      // Initialize with comprehensive sample data
      const sampleProducts: Product[] = [
        {
          id: '1',
          name: 'Skarfix-Plus Brightening Face Serum',
          price: 499,
          originalPrice: 599,
          image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
          images: [
            'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          additionalImages: [
            'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          category: 'Serum',
          description: 'Advanced brightening serum for radiant skin with kojic acid and vitamin C',
          keyHighlights: ['Reduces dark spots', 'Brightens skin tone', 'Lightweight formula', 'Kojic acid formula'],
          reviews: 245,
          rating: 4.5,
          inStock: true,
          isOnSale: true,
          isNew: true,
          sizes: ['15ml', '30ml'],
        },
        {
          id: '2',
          name: 'Shadow A Gel SPF 50+ Sunscreen',
          price: 525,
          originalPrice: 550,
          image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
          images: [
            'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          additionalImages: [
            'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          category: 'Sunscreen',
          description: 'Broad spectrum sun protection gel with SPF 50+',
          keyHighlights: ['SPF 50+', 'Water resistant', 'Non-greasy formula', 'Broad spectrum protection'],
          reviews: 189,
          rating: 4.3,
          inStock: true,
          isOnSale: true,
          sizes: ['50ml', '100ml'],
        },
        {
          id: '3',
          name: 'Nigrfix Cream 50g',
          price: 429,
          originalPrice: 450,
          image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
          images: [
            'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          additionalImages: [
            'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          category: 'Cream',
          description: 'Intensive skin lightening cream for pigmentation',
          keyHighlights: ['Reduces pigmentation', 'Gentle formula', 'Clinically tested', 'Long-lasting results'],
          reviews: 1137,
          rating: 4.6,
          inStock: true,
          isOnSale: true,
          sizes: ['25g', '50g'],
        },
        {
          id: '4',
          name: 'Foobetik Foot Cream',
          price: 499,
          originalPrice: 550,
          image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
          images: [
            'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          additionalImages: [
            'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          category: 'Foot Care',
          description: 'Specialized foot care cream for dry and cracked feet',
          keyHighlights: ['Moisturizes dry feet', 'Repairs cracked heels', 'Long-lasting', 'Antifungal properties'],
          reviews: 676,
          rating: 4.4,
          inStock: true,
          isOnSale: true,
          sizes: ['50g', '100g'],
        },
        {
          id: '5',
          name: 'Gentle Face Wash',
          price: 299,
          originalPrice: 350,
          image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
          images: [
            'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          additionalImages: [
            'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          category: 'Face Wash',
          description: 'Gentle daily face wash for all skin types',
          keyHighlights: ['Gentle cleansing', 'Suitable for all skin types', 'pH balanced', 'No harsh chemicals'],
          reviews: 432,
          rating: 4.2,
          inStock: true,
          isOnSale: true,
          sizes: ['100ml', '200ml'],
        },
        {
          id: '6',
          name: 'Anti-Acne Serum',
          price: 599,
          originalPrice: 699,
          image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
          images: [
            'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          additionalImages: [
            'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          category: 'Serum',
          description: 'Powerful anti-acne serum with salicylic acid',
          keyHighlights: ['Reduces acne', 'Controls oil', 'Salicylic acid formula', 'Fast results'],
          reviews: 567,
          rating: 4.7,
          inStock: true,
          isOnSale: true,
          isNew: true,
          sizes: ['15ml', '30ml'],
        },
        {
          id: '7',
          name: 'Moisturizing Cream',
          price: 399,
          originalPrice: 450,
          image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
          images: [
            'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          additionalImages: [
            'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          category: 'Cream',
          description: 'Daily moisturizing cream for soft and smooth skin',
          keyHighlights: ['Deep moisturization', 'Non-greasy', '24-hour hydration', 'Suitable for all skin types'],
          reviews: 789,
          rating: 4.5,
          inStock: true,
          isOnSale: true,
          sizes: ['50g', '100g'],
        },
        {
          id: '8',
          name: 'Exfoliating Face Wash',
          price: 349,
          originalPrice: 399,
          image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
          images: [
            'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          additionalImages: [
            'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          category: 'Face Wash',
          description: 'Exfoliating face wash with micro-beads for deep cleansing',
          keyHighlights: ['Deep cleansing', 'Removes dead skin', 'Micro-bead formula', 'Refreshing'],
          reviews: 234,
          rating: 4.1,
          inStock: true,
          isOnSale: true,
          sizes: ['100ml', '200ml'],
        },
      ];
      dispatch({ type: 'SET_PRODUCTS', payload: sampleProducts });
    }

    if (savedUsers) {
      let users = JSON.parse(savedUsers);
      // Ensure admin user exists and has password
      let admin = users.find((u: any) => u.email === 'admin@fixderma.com');
      if (!admin) {
        users.push({
          id: '1',
          name: 'Admin User',
          email: 'admin@fixderma.com',
          password: 'admin123',
          phone: '+91-9876543210',
          address: '123 Admin Street, Mumbai, India',
          isAdmin: true,
          createdAt: new Date().toISOString(),
        });
      } else if (!admin.password) {
        admin.password = 'admin123';
      }
      dispatch({ type: 'SET_USERS', payload: users });
    } else {
      // Initialize with admin user
      const adminUser: User = {
        id: '1',
        name: 'Admin User',
        email: 'admin@fixderma.com',
        password: 'admin123',
        phone: '+91-9876543210',
        address: '123 Admin Street, Mumbai, India',
        isAdmin: true,
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: 'SET_USERS', payload: [adminUser] });
    }

    if (savedOrders) {
      dispatch({ type: 'SET_ORDERS', payload: JSON.parse(savedOrders) });
    }

    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      cartItems.forEach((item: CartItem) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
      });
    }

    if (savedWishlist) {
      const wishlistItems = JSON.parse(savedWishlist);
      wishlistItems.forEach((productId: string) => {
        dispatch({ type: 'ADD_TO_WISHLIST', payload: productId });
      });
    }

    if (savedCurrentUser) {
      dispatch({ type: 'SET_CURRENT_USER', payload: JSON.parse(savedCurrentUser) });
    } else {
      // Auto-login admin for demo
      const adminUser = {
        id: '1',
        name: 'Admin User',
        email: 'admin@fixderma.com',
        password: 'admin123',
        phone: '+91-9876543210',
        address: '123 Admin Street, Mumbai, India',
        isAdmin: true,
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: 'SET_CURRENT_USER', payload: adminUser });
    }

    // Initialize categories
    const categories: Category[] = [
      {
        id: '1',
        name: 'Sunscreen',
        image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'UV protection products',
      },
      {
        id: '2',
        name: 'Serum',
        image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Concentrated treatments',
      },
      {
        id: '3',
        name: 'Cream',
        image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Moisturizing creams',
      },
      {
        id: '4',
        name: 'Face Wash',
        image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Cleansing products',
      },
      {
        id: '5',
        name: 'Foot Care',
        image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Foot care solutions',
      },
      {
        id: '6',
        name: 'Body Care',
        image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Body care products',
      },
    ];
    dispatch({ type: 'SET_CATEGORIES', payload: categories });
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('fixderma_products', JSON.stringify(state.products));
  }, [state.products]);

  useEffect(() => {
    localStorage.setItem('fixderma_users', JSON.stringify(state.users));
  }, [state.users]);

  useEffect(() => {
    localStorage.setItem('fixderma_orders', JSON.stringify(state.orders));
  }, [state.orders]);

  useEffect(() => {
    localStorage.setItem('fixderma_cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('fixderma_wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  useEffect(() => {
    localStorage.setItem('fixderma_currentUser', JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}