export type Category = 'all' | 'library' | 'perfumes' | 'watches' | 'anime' | 'crochet';

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  desc: string;
  descAr: string;
  price: number;
  originalPrice?: number;
  currency: 'SAR' | 'KWD';
  image: string;
  category: Category;
  tags?: string[];
  tagsAr?: string[];
  colors?: { name: string; nameAr: string; class: string }[];
  sizes?: string[];
  rating: number;
  reviewsCount: number;
  features?: string[];
  featuresAr?: string[];
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: { name: string; nameAr: string; class: string };
  selectedSize?: string;
}

export interface Address {
  id: string;
  title: string;
  titleAr: string;
  details: string;
  detailsAr: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'visa' | 'mada' | 'apple_pay' | 'cash';
  label: string;
  labelAr: string;
  lastFour?: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'shipping' | 'delivered' | 'cancelled';
  statusAr: string;
  items: CartItem[];
  total: number;
  currency: string;
}

export interface UserProfile {
  name: string;
  nameAr: string;
  email: string;
  avatar: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  favorites: string[]; // Product IDs
  orders: Order[];
}
