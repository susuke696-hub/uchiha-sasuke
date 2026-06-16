import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from './firebase';
import {
  ShoppingBag,
  Search,
  User,
  Heart,
  Star,
  Menu,
  ChevronLeft,
  ChevronRight,
  Languages,
  BookOpen,
  Sparkles,
  Watch,
  Flame,
  Scissors,
  X,
  Plus,
  Minus,
  CheckCircle,
  TrendingUp,
  MapPin,
  CreditCard,
  Sun,
  Moon,
} from 'lucide-react';

import { Category, Product, CartItem, UserProfile } from './types';
import { products, staticUserProfile } from './data';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import ProfileView from './components/ProfileView';
import LoginView from './components/LoginView';
import CheckoutModal from './components/CheckoutModal';

// chameleon design accents
const categoryColors: Record<Category, string> = {
  all: '#1a1a1a',
  library: '#2d4a43', // Sage
  perfumes: '#6d597a', // Lavender
  watches: '#2c3e50', // Steel Blue
  anime: '#ff4b4b', // Electric Red
  crochet: '#e07a5f', // Terracotta
};

export default function App() {
  // Master states
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [currency, setCurrency] = useState<'SAR' | 'KWD'>('SAR');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ashity_theme');
      if (saved) return saved === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ashity_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ashity_theme', 'light');
    }
  }, [darkMode]);
  
  // App views: 'home' | 'categories' | 'profile' | 'login'
  const [activePage, setActivePage] = useState<'home' | 'categories' | 'profile' | 'login'>('home');
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // User profile loaded in state (can be edited dynamically!)
  const [user, setUser] = useState<UserProfile>(staticUserProfile);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Favorites/Wishlist arrays of Product IDs
  const [wishlist, setWishlist] = useState<string[]>(['lib-1', 'perf-1', 'watch-1', 'anime-1']);

  // Modals visibility toggles
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Applied coupons summary info passed from Cart Drawer to checkout Modal
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState('');

  // Firebase Auth sync
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userRecord) => {
      if (userRecord) {
        setIsLoggedIn(true);
        setUser((prev) => ({
          ...prev,
          name: userRecord.displayName || prev.name,
          email: userRecord.email || prev.email,
          avatar: userRecord.photoURL || prev.avatar,
        }));
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Initial cart loader from localStorage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('ashity_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error('Error reading localStorage cart', e);
    }
  }, []);

  // Save cart to localStorage
  const saveCartToLocalStorage = (items: CartItem[]) => {
    try {
      localStorage.setItem('ashity_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  };

  // Lang and currency sync default variables on load
  const isRtl = lang === 'ar';

  // Toggle Favorite
  const handleToggleFavorite = (id: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Add Item to Cart (Quick add)
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && !item.selectedColor && !item.selectedSize
      );

      let updated = [];
      if (existingIdx > -1) {
        updated = prev.map((item, idx) =>
          idx === existingIdx ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [...prev, { product, quantity: 1 }];
      }
      saveCartToLocalStorage(updated);
      return updated;
    });

    // Notify user with elegant toast or directly slide cart drawer open
    setIsCartOpen(true);
  };

  // Add Item to Cart with Detailed Options
  const handleAddToCartWithDetails = (
    product: Product,
    quantity: number,
    color?: { name: string; nameAr: string; class: string },
    size?: string
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor?.name === color?.name &&
          item.selectedSize === size
      );

      let updated = [];
      if (existingIdx > -1) {
        updated = prev.map((item, idx) =>
          idx === existingIdx ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updated = [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
      }
      saveCartToLocalStorage(updated);
      return updated;
    });

    setIsCartOpen(true);
  };

  // Update item quantity in cart drawer
  const handleUpdateCartQuantity = (idx: number, newQty: number) => {
    setCartItems((prev) => {
      const updated = prev.map((item, i) => (i === idx ? { ...item, quantity: newQty } : item));
      saveCartToLocalStorage(updated);
      return updated;
    });
  };

  // Remove item from cart drawer
  const handleRemoveCartItem = (idx: number) => {
    setCartItems((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      saveCartToLocalStorage(updated);
      return updated;
    });
  };

  // Checkout trigger
  const handleTriggerCheckout = (appliedDiscount: number, appliedCode: string) => {
    setAppliedDiscountPercent(appliedDiscount);
    setAppliedCouponCode(appliedCode);
    setIsCartOpen(false);
    
    if (!isLoggedIn) {
      setActivePage('login');
    } else {
      setIsCheckoutModalOpen(true);
    }
  };

  // Complete checkout place order
  const handleOrderPlaced = (newOrder: any) => {
    // Dynamic updates user historic orders list
    const updatedUser = {
      ...user,
      orders: [newOrder, ...user.orders],
    };
    setUser(updatedUser);
    
    // Clear shopping cart
    setCartItems([]);
    saveCartToLocalStorage([]);
  };

  // Auth logins handler
  const handleLoginSuccess = (email: string) => {
    setIsLoggedIn(true);
    setUser((prev) => ({
      ...prev,
      email: email,
    }));
    setActivePage('home');
  };

  const handleLogout = async () => {
    try {
      const { setAccessToken } = await import('./firebase');
      setAccessToken(null);
      await firebaseSignOut(auth);
    } catch (e) {
      console.error(e);
    }
    setIsLoggedIn(false);
    setActivePage('home');
  };

  // Dynamic filter products by name or categories selection
  const filteredProducts = products.filter((prod) => {
    const categoryMatches = selectedCategory === 'all' || prod.category === selectedCategory;
    const searchMatches =
      searchQuery.trim() === '' ||
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.nameAr.includes(searchQuery) ||
      prod.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.descAr.includes(searchQuery);
    return categoryMatches && searchMatches;
  });

  const featuredProduct = products.find((p) => p.isBestSeller && p.category === selectedCategory) || products[0];

  // Soft currency conversion rate: 1 KWD = 12.2 SAR
  const convertAndFormatPrice = (price: number, prodCurrency: 'SAR' | 'KWD') => {
    let convertedPrice = price;
    if (currency !== prodCurrency) {
      if (currency === 'SAR' && prodCurrency === 'KWD') {
        convertedPrice = price * 12.2;
      } else if (currency === 'KWD' && prodCurrency === 'SAR') {
        convertedPrice = price / 12.2;
      }
    }
    const value = convertedPrice.toLocaleString(undefined, {
      minimumFractionDigits: currency === 'KWD' ? 3 : 0,
      maximumFractionDigits: currency === 'KWD' ? 3 : 2,
    });
    if (isRtl) {
      return `${value} ${currency === 'SAR' ? 'ر.س' : 'د.ك'}`;
    }
    return `${currency} ${value}`;
  };

  return (
    <div className="bg-[#fbfcfa] dark:bg-[#0b0b0c] min-h-screen pb-20 md:pb-10 font-sans tracking-tight text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      
      {/* ──────────────── HEADER CAP / NAVBAR ──────────────── */}
      <header className="fixed top-0 inset-x-0 h-16 bg-white/90 dark:bg-[#0b0b0c]/90 backdrop-blur-md border-b border-neutral-100/50 dark:border-neutral-900 z-40 flex items-center transition-colors">
        <div className="w-full max-w-7xl mx-auto px-4 flex justify-between items-center" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
          
          {/* Brand/logo block */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setSelectedCategory('all'); setActivePage('home'); }}
              className="text-base sm:text-lg font-bold tracking-[0.25em] uppercase text-neutral-950 dark:text-white outline-none cursor-pointer hover:opacity-85 transition-opacity"
            >
              ASHITY
            </button>
          </div>

          {/* Desktop Search bar center */}
          <div className="hidden md:flex items-center relative w-1/3 max-w-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRtl ? 'ابحث عن عطور، ساعات، كتب أو كروشيه...' : 'Search fine collections...'}
              className={`w-full bg-neutral-50/60 dark:bg-neutral-100/90 hover:bg-neutral-100/40 dark:hover:bg-white py-2 rounded-md text-xs font-medium focus:ring-1 focus:ring-neutral-950/25 dark:focus:ring-neutral-900/50 focus:bg-white dark:focus:bg-white outline-none border border-neutral-100 dark:border-neutral-200 text-neutral-900 dark:text-neutral-950 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500 ${
                isRtl ? 'pr-9 pl-4 text-right' : 'pl-9 pr-4 text-left'
              }`}
            />
            <Search className={`w-3.5 h-3.5 text-neutral-400 dark:text-neutral-800 absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'}`} />
          </div>

          {/* Symmetrical Settings: Language, Theme, Currency, Cart, Account */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Labeled Language Switcher Button (عربي , English) */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-neutral-100 dark:border-neutral-200 bg-neutral-50 dark:bg-neutral-100 hover:bg-neutral-100 dark:hover:bg-white text-neutral-800 dark:text-neutral-950 text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
              title={isRtl ? 'Select English' : 'اختر العربية'}
            >
              <Languages className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-950" />
              <span>
                {lang === 'ar' ? 'English' : 'عربي'}
              </span>
            </button>

            {/* Dark & Light Theme Toggler Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-8.5 h-8.5 rounded-full border border-neutral-100 dark:border-neutral-200 bg-neutral-50 dark:bg-neutral-100 text-neutral-700 dark:text-neutral-950 hover:bg-neutral-100 dark:hover:bg-white flex items-center justify-center transition-all cursor-pointer"
              title={darkMode ? (isRtl ? 'الوضع المضيء' : 'Light Mode') : (isRtl ? 'الوضع الداكن' : 'Dark Mode')}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-neutral-950" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-600" />
              )}
            </button>

            {/* Core Currency Switcher value (SAR vs KWD) */}
            <button
              onClick={() => setCurrency(currency === 'SAR' ? 'KWD' : 'SAR')}
              className="px-2.5 py-1 text-[10px] font-bold tracking-wider bg-neutral-50 dark:bg-neutral-100 hover:bg-neutral-100 dark:hover:bg-white text-neutral-700 dark:text-neutral-950 border border-neutral-100 dark:border-neutral-200 rounded-full transition-colors cursor-pointer font-mono"
              title={isRtl ? 'تغيير العملة' : 'Switch Currency'}
            >
              {currency}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-8.5 h-8.5 rounded-full bg-neutral-50 dark:bg-neutral-100 hover:bg-neutral-100 dark:hover:bg-white flex items-center justify-center text-neutral-700 dark:text-neutral-950 relative transition-transform active:scale-95 cursor-pointer border border-neutral-100 dark:border-neutral-200"
              title={isRtl ? 'عرض سلة التسوق' : 'Open Cart'}
            >
              <ShoppingBag className="w-3.5 h-3.5 dark:text-neutral-950" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-neutral-950 dark:bg-amber-600 text-white text-[8px] font-bold font-mono w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Account Profile Link */}
            {isLoggedIn ? (
              <button
                onClick={() => setActivePage('profile')}
                className="w-8.5 h-8.5 rounded-full border border-neutral-150 dark:border-neutral-200 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                title={isRtl ? 'حسابك الشخصي' : 'Your Profile'}
              >
                <img src={user.avatar} alt="User Avatar" className="w-full h-full object-cover" />
              </button>
            ) : (
              <button
                onClick={() => setActivePage('login')}
                className="px-4 py-1.5 bg-neutral-950 dark:bg-neutral-100 hover:bg-neutral-900 dark:hover:bg-white text-white dark:text-neutral-950 font-medium text-xs rounded-md flex items-center gap-1 cursor-pointer transition-colors"
              >
                <User className="w-3 h-3 dark:text-neutral-950" />
                <span className="hidden sm:inline">{isRtl ? 'دخول' : 'Sign In'}</span>
              </button>
            )}

          </div>

        </div>
      </header>

      {/* ──────────────── MAIN CONTAINER CANVAS ──────────────── */}
      <main className="pt-16 max-w-7xl mx-auto">
        
        {/* Active Auth Login screen */}
        {activePage === 'login' ? (
          <LoginView
            lang={lang}
            onLoginSuccess={handleLoginSuccess}
            onSkipLogin={() => setActivePage('home')}
          />
        ) : activePage === 'profile' ? (
          /* Active Profile account section screen 7 */
          <ProfileView
            user={user}
            lang={lang}
            currency={currency}
            onUpdateUser={setUser}
            onLogout={handleLogout}
            categoryColors={categoryColors}
          />
        ) : (
          /* Core Homepage and Category Dedicated Sections (Screens 1 to 6) */
          <div className="space-y-8" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
            
            {/* Category horizontal tabs browser */}
            <section className="px-4 pt-6">
              <div className="flex gap-2 pb-1.5 items-center overflow-x-auto no-scrollbar">
                
                {/* Tab 'all' */}
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className={`px-5 py-2 rounded-md text-[11px] font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-neutral-950 dark:bg-[#e07a5f] text-white dark:text-neutral-950 shadow-xs'
                      : 'bg-white dark:bg-neutral-100/90 border border-neutral-100 dark:border-neutral-200 hover:border-neutral-200 dark:hover:bg-white text-neutral-500 dark:text-neutral-900 hover:text-neutral-900'
                  }`}
                >
                  {isRtl ? 'الكل' : 'All'}
                </button>

                {/* Tab 'library' */}
                <button
                  onClick={() => { setSelectedCategory('library'); setSearchQuery(''); }}
                  className={`px-4 py-2 rounded-md text-[11px] font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === 'library'
                      ? 'bg-neutral-950 dark:bg-[#2d4a43] text-white shadow-xs'
                      : 'bg-white dark:bg-neutral-100/90 border border-neutral-100 dark:border-neutral-200 hover:border-neutral-200 dark:hover:bg-white text-neutral-500 dark:text-neutral-900 hover:text-neutral-900'
                  }`}
                >
                  <BookOpen className="w-3 h-3 dark:text-neutral-950" />
                  <span>{isRtl ? 'مكتبة وقرطاسية' : 'Stationery'}</span>
                </button>

                {/* Tab 'perfumes' */}
                <button
                  onClick={() => { setSelectedCategory('perfumes'); setSearchQuery(''); }}
                  className={`px-4 py-2 rounded-md text-[11px] font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === 'perfumes'
                      ? 'bg-neutral-950 dark:bg-[#6d597a] text-white shadow-xs'
                      : 'bg-white dark:bg-neutral-100/90 border border-neutral-100 dark:border-neutral-200 hover:border-neutral-200 dark:hover:bg-white text-neutral-500 dark:text-neutral-900 hover:text-neutral-900'
                  }`}
                >
                  <Sparkles className="w-3 h-3 dark:text-neutral-950" />
                  <span>{isRtl ? 'عطور سحرية' : 'Perfumes'}</span>
                </button>

                {/* Tab 'watches' */}
                <button
                  onClick={() => { setSelectedCategory('watches'); setSearchQuery(''); }}
                  className={`px-4 py-2 rounded-md text-[11px] font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === 'watches'
                      ? 'bg-neutral-950 dark:bg-[#2c3e50] text-white shadow-xs'
                      : 'bg-white dark:bg-neutral-100/90 border border-neutral-100 dark:border-neutral-200 hover:border-neutral-200 dark:hover:bg-white text-neutral-500 dark:text-neutral-900 hover:text-neutral-900'
                  }`}
                >
                  <Watch className="w-3 h-3 dark:text-neutral-950" />
                  <span>{isRtl ? 'عالم الساعات' : 'Fine Watches'}</span>
                </button>

                {/* Tab 'anime' */}
                <button
                  onClick={() => { setSelectedCategory('anime'); setSearchQuery(''); }}
                  className={`px-4 py-2 rounded-md text-[11px] font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === 'anime'
                      ? 'bg-neutral-950 dark:bg-[#ff4b4b] text-white shadow-xs'
                      : 'bg-white dark:bg-neutral-100/90 border border-neutral-100 dark:border-neutral-200 hover:border-neutral-200 dark:hover:bg-white text-neutral-500 dark:text-neutral-900 hover:text-neutral-900'
                  }`}
                >
                  <Flame className="w-3 h-3 dark:text-neutral-950" />
                  <span>{isRtl ? 'ملابس أنمي' : 'Anime Streetwear'}</span>
                </button>

                {/* Tab 'crochet' */}
                <button
                  onClick={() => { setSelectedCategory('crochet'); setSearchQuery(''); }}
                  className={`px-4 py-2 rounded-md text-[11px] font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === 'crochet'
                      ? 'bg-neutral-950 dark:bg-[#e07a5f] text-white shadow-xs'
                      : 'bg-white dark:bg-neutral-100/90 border border-neutral-100 dark:border-neutral-200 hover:border-neutral-200 dark:hover:bg-white text-neutral-500 dark:text-neutral-900 hover:text-neutral-900'
                  }`}
                >
                  <Scissors className="w-3 h-3 dark:text-neutral-950" />
                  <span>{isRtl ? 'كروشيه يدوي' : 'Crochet Crafted'}</span>
                </button>

              </div>
            </section>

            {/* Mobile Category Search bar */}
            <div className="px-4 md:hidden">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isRtl ? 'مستعد للبحث عن فخامتك؟...' : 'What are you searching for?...'}
                  className={`w-full bg-white border border-neutral-100 py-3 rounded-full text-xs font-semibold focus:ring-1 focus:ring-neutral-900 outline-none shadow-sm ${
                    isRtl ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                  }`}
                />
                <Search className={`w-4 h-4 text-neutral-400 absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
              </div>
            </div>

            {/* ──────── DYNAMIC BANNER ACCORDING TO CATEGORIES SELECTION ──────── */}
            <section className="px-4">
              
              {/* Context 1: Normal Homepage slider Screen 6 */}
              {selectedCategory === 'all' && (
                <div className="relative rounded-2xl overflow-hidden h-[30vh] sm:h-[45vh] min-h-[220px] bg-neutral-900 flex items-center">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCve68heYKV8e9cgmJpKrgSTeNQ_9RFgVrl68zF_YWnLtcukkKdBGmYGQJn0FfcORNTGBd-tHLD_0jjlf3Jz1GdXHKBEUr62ONkQ1Eeb1txCM4UWrSX9I2y_o6QhfRXzYYw3nN6C3hZ1luVAwbIjvsGn0tXFt0OAe2mkkWjaLBxgig124wuuC6AoVw0j_HRI88B7gfPS0zQcZWgdEdd8HXYmHKJHxKKwtWA1cScdwLURmsKnWKCj-L0ud8Z_9gQx2v4vkyhK_7RVYM" 
                    alt="Homepage Slider Banner"
                    className="absolute inset-0 w-full h-full object-cover opacity-65 mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Banner Texts overlay */}
                  <div className="relative z-10 p-6 sm:p-12 max-w-xl text-white space-y-2 sm:space-y-4 text-right md:text-right w-full">
                    <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-white/20 border border-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                      {isRtl ? 'كولكشن الخريف والذوق المترف' : 'Autumn Premium Edition'}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                      {isRtl ? 'تشكيلة الخريف الجديدة' : 'Brand New Autumn Line'}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-neutral-200 leading-normal max-w-sm ml-auto md:ml-0 md:mr-auto">
                      {isRtl 
                        ? 'اكتشف أحدث صيحات الموضة، الفخامة والعطور بلمسة أشيتي الراقية والمميزة.' 
                        : 'Discover high-end watches, ethereal perfume extracts and handmade crochet items.'
                      }
                    </p>
                    <button 
                      onClick={() => setSelectedCategory('perfumes')}
                      className="bg-white text-neutral-900 font-extrabold text-xs px-5 py-2.5 rounded-full hover:bg-neutral-100 transition-colors shadow-sm cursor-pointer mt-2"
                    >
                      {isRtl ? 'تسوق المجموعة الفاخرة' : 'Discover Perfumes'}
                    </button>
                  </div>
                </div>
              )}

              {/* Context 2: Library Screen 1 */}
              {selectedCategory === 'library' && (
                <div className="relative rounded-2xl overflow-hidden h-[30vh] sm:h-[45vh] min-h-[220px] bg-[#2d4a43] flex items-center justify-center p-4">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-overlay"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBtGIY61zPJV5XEB0hqTNFU2TIz3fWoSssSHKEuvVvQ5jm4QjtwQVJHQSVadZk72Fe3reudL0u19OfUTLUyismMrwpApqtzq2NizmKGdl1WY2Om1Ck-HG6Rv_kOWfVkFcsryxZb2dy4qfEb9-vUCECDriOtC3j0R87vbQ5g99iUIBX18v7Y08Ln1uTXS2zaezd9bAvgkIL9XIms8pDO82-ETIB3ZeMcwZjdzv-eSlkMibwoo1iMx7gtjGTe9m_poQvSTQntclRN4vM")' }}
                  />
                  <div className="relative z-10 text-center glass-panel p-6 sm:p-8 rounded-2xl max-w-lg shadow-xl">
                    <h2 className="text-xl sm:text-3xl font-black text-neutral-900">
                      {isRtl ? 'ركن المكتبة والقرطاسية' : 'Curated Study Nook'}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-2 leading-relaxed">
                      {isRtl 
                        ? 'عالم مخملي من الكتب التاريخية النادرة وأدوات تدوين مذهبة تليق بأفكارك.' 
                        : 'Handcrafted leather classic books, precision calligraphy instruments and journals.'
                      }
                    </p>
                  </div>
                </div>
              )}

              {/* Context 3: Perfumes Screen 2 */}
              {selectedCategory === 'perfumes' && (
                <div className="relative rounded-2xl overflow-hidden h-[30vh] sm:h-[45vh] min-h-[220px] bg-[#6d597a] flex items-center justify-center p-4">
                  <img
                    src="https://lh3.googleusercontent.com/aida/AP1WRLu9UY3CfkJE1G01vld3FXUU7FWDNMCqYGVFIMrhH0k3f6exgpSeSSMbzhOMtecwhqksHNtcsIvKXsA8Di6FH65CgkAbcTdd5Clz04gGDGBajP6ruPIaKhfWQqax0pEUCQ58oOaYDOYsBYoIXPSGS04padGO-icaGe5DLUb3MWMGq-wFVTrYco8o1JjIT4MUnwJzaRXIVUWkF0JzUgNvI7ayx6O13_7jDlveURaezC0_amvF-b_USdO8HAI"
                    alt="Ethereal perfume petals"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <div className="relative z-10 text-center max-w-xl text-white px-4 space-y-2">
                    <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-sm">
                      {isRtl ? 'سحر الأريج وعمق الشرق' : 'Sacred Ethereal Extract'}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-100 font-bold max-w-md mx-auto leading-relaxed">
                      {isRtl 
                        ? 'اكتشف مستخلصات العود الملكية والخلطات الفرنسية الآسرة للوجدان.' 
                        : 'Indulge in concentrated Cambodian oud, rose de Paris and majestic wood musk blends.'
                      }
                    </p>
                  </div>
                </div>
              )}

              {/* Context 4: Watches Screen 3 */}
              {selectedCategory === 'watches' && (
                <div className="relative rounded-2xl overflow-hidden h-[30vh] sm:h-[45vh] min-h-[220px] bg-[#1a1a1a] flex items-center">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeoz1tSNNTinZcW00DmncsfPI596Qb-nXXHlcBSETbDLlE3nQ0VF0sm4da4rflvbrGneG3CewZ1m5GMcE_MB9LlDcoBH5SLToVp-x4v6T6xvb_Pvrq0khDAk1jExGcT6FWGLBbLNF6BYA9ybHpxEincYseapsbCWmbW41LGMFx0wh9UHFSk39XF39nhPObZMsUOaWE6eotY4M_PUZTck5rAfl5cFN_oOZatLvPgfMhrW4EHZGzEJeTgJerI9arKVVNXDAkdgIlFPo"
                    alt="Mechanical precision gears"
                    className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-overlay"
                    referrerPolicy="no-referrer"
                  />
                  <div className="relative z-10 p-6 sm:p-12 max-w-2xl text-white space-y-3">
                    <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                      {isRtl ? 'عالم الساعات الفاخرة' : 'Precision mechanical art'}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-300 font-medium max-w-lg leading-relaxed">
                      {isRtl 
                        ? 'دقة متناهية وفخامة سويسرية ممتدة. اكتشف التشكيلات الحصرية للمهتمين بقيم الوقت الجوهري.' 
                        : 'Master craft Swiss horology, skeleton masterpieces, rose gold details and limited editions.'
                      }
                    </p>
                    <button 
                      onClick={() => {
                        const item = products.find(p => p.id === 'watch-1');
                        if (item) { setSelectedProduct(item); setIsDetailsModalOpen(true); }
                      }}
                      className="bg-white text-neutral-900 font-black text-xs px-5 py-2.5 rounded-full hover:bg-neutral-100 transition-transform active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer mt-2"
                    >
                      <span>{isRtl ? 'استكشف الميكانيكا' : 'Discover Omega Seamaster'}</span>
                      {isRtl ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Context 5: Anime streetwear Screen 4 */}
              {selectedCategory === 'anime' && (
                <div className="relative rounded-2xl overflow-hidden h-[30vh] sm:h-[45vh] min-h-[220px] bg-[#1a1a1a] flex items-center justify-center p-4">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuATioUl9wZVh6-pXeuIcH-4tDLAiWGVGM8IcPOZZ_LRAQgUN72kNijD6QyR-CqbUKPrnhNNSK70p97IxMiIHmkeRV_pzSr7aVSJCisV5OtermdNqbzQd7FmwbKYtWTIHP12mPy_I4g2lChq2gAsSqqGezZqakVm9UXP_8JOyCByJkPoHZ-Gqy8lI_PwSjJRIBGvsx25b1SKfcL-u33nXWMrvJ0fXBPPUyrvtPg-E-OtnhTgNoZVWJ1e4_CDIcubCQsdsm82bT9Ay1k"
                    alt="Cyberpunk oversized streetwear display"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                    referrerPolicy="no-referrer"
                  />
                  <div className="relative z-10 text-center glass-panel p-5 sm:p-8 rounded-2xl max-w-lg border border-white/20 shadow-xl">
                    <span className="inline-block text-[9px] font-bold text-red-500 bg-red-50 px-2.5 py-0.5 rounded-full mb-2.5">
                      {isRtl ? 'تشكيلات ثقيلة مخصصة' : 'OTAKU CUSTOM MERCH'}
                    </span>
                    <h2 className="text-xl sm:text-3xl font-black text-neutral-900 leading-tight">
                      {isRtl ? 'ملابس أنمي بألوان الجسد' : 'Otaku Streetwear'}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-1">
                      {isRtl 
                        ? 'عبر عن شغفك اللامحدود بأفضل التصاميم، الألوان والرموز اليابانية المفضلة.' 
                        : 'Heavy ring-spun t-shirts and hoodies showcasing Attack on Titan, Evangelion and Naruto.'
                      }
                    </p>
                  </div>
                </div>
              )}

              {/* Context 6: Crochet Handmade Screen 5 */}
              {selectedCategory === 'crochet' && (
                <div className="relative rounded-2xl overflow-hidden h-[30vh] sm:h-[45vh] min-h-[220px] bg-neutral-50 flex items-center justify-center p-4 border border-rose-100">
                  <div className="absolute inset-0 bg-[#fef5f5] opacity-80" />
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyqAsgYeLoUr1rVSJAWPo7yMohG8hji-TlyMIHHxOr7I3j25JBIgs47itn1KO3-L26anLRHee_a7o5oK2y1aA3ffcrqc7AgqemeuYs6AzDkdG83gZLXZu-6U55x4cHN-kN9Z8eWJMtutXmfvYU-k7w8CbThVYcRKBWnpsA_hUJEhqb42AyrrYEHQU4EHXxrYmdIU23fEhTiZiGzdMnKC0pm7ru_r5yRHl-dytIJcCWEOO8pHQtLeM9Wn1z8TWSwugerX48Zb-hc54"
                    alt="Soft handmade blankets"
                    className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                  <div className="relative z-10 text-center space-y-2.5">
                    <span className="inline-block text-[10px] font-bold text-[#e07a5f] bg-[#e07a5f]/10 border border-[#e07a5f]/25 px-3 py-1 rounded-full">
                      {isRtl ? 'محاك بحنان وشغف يدوي' : 'MADE WITH LOVING CARES'}
                    </span>
                    <h2 className="text-xl sm:text-3xl font-black text-neutral-800">
                      {isRtl ? 'كروشيه - لمسات فنية يدوية' : 'Curated Crochet Craft'}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500 font-medium max-w-md mx-auto leading-relaxed">
                      {isRtl 
                        ? 'مجموعة فريدة من الحقائب الجمالية، ديكورات الكتان الدافئة والوسائد الدافئة للمنزل.' 
                        : 'Textured throw cushions, bohemian pastel sling shopper bags and warm wool braids.'
                      }
                    </p>
                  </div>
                </div>
              )}

            </section>

            {/* ──────── PRODUCT SECTIONS AND DENSE GRID ──────── */}
            <section className="px-4 pb-12 space-y-6">
              
              {/* Grid Header labels */}
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-2xl font-black tracking-tight text-neutral-900">
                    {selectedCategory === 'all' 
                      ? (isRtl ? 'المنتجات الرائجة والمفضلة الآن' : 'Trending Now')
                      : (isRtl ? 'تشكيلة المنتجات الحصرية' : 'Curated Catalog')
                    }
                  </h3>
                  <p className="text-xs text-neutral-400 font-medium">
                    {isRtl 
                      ? `تم العثور على ${filteredProducts.length} قطعة متميزة تلائم ذوقك` 
                      : `We found ${filteredProducts.length} premium articles that fit your taste`
                    }
                  </p>
                </div>
              </div>

              {/* Dynamic products list grid */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 border border-neutral-100 text-center space-y-4">
                  <Search className="w-12 h-12 text-neutral-200 mx-auto" strokeWidth={1} />
                  <div>
                    <h4 className="font-extrabold text-neutral-700">
                      {isRtl ? 'لم نجد أي نتائج تطابق بحثك' : 'No matches found'}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                      {isRtl 
                        ? 'حاول تعديل كلمات البحث أو تصفح الأقسام الأخرى من شريط التصفح التفاعلي.' 
                        : 'Try searching with different terms or check out our active departments above.'
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter-mobile md:gap-gutter-desktop">
                  {filteredProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      lang={lang}
                      currency={currency}
                      isFavorite={wishlist.includes(prod.id)}
                      onAddToCart={handleAddToCart}
                      onViewDetails={(p) => { setSelectedProduct(p); setIsDetailsModalOpen(true); }}
                      onToggleFavorite={handleToggleFavorite}
                      categoryColors={categoryColors}
                    />
                  ))}
                </div>
              )}

              {/* Watches Highlight Banner Screen 3 (Displays exclusively when Category = 'watches' or 'all') */}
              {(selectedCategory === 'all' || selectedCategory === 'watches') && (
                <div className="relative rounded-2xl overflow-hidden mt-12 bg-neutral-900 p-6 sm:p-12 flex flex-col md:flex-row items-center border border-neutral-800 shadow-xl">
                  {/* Banner backdrop image */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-neutral-900 to-transparent z-0 opacity-80" />
                  
                  {/* Left block Info content */}
                  <div className="w-full md:w-1/2 flex-1 text-white relative z-10 space-y-4 pb-6 md:pb-0 rtl:pl-4 sm:rtl:pl-12 ltr:pr-4 sm:ltr:pr-12">
                    <span className="inline-block text-[9px] font-black tracking-widest bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full uppercase">
                      {isRtl ? 'الأكثر طلباً وهيبة' : 'DRAMATIC HOROLOGY Rarity'}
                    </span>
                    <h3 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">
                      {isRtl ? 'مجموعة رولكس دايتونا الأسطورية' : 'Rolex Daytona Collection'}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-300 leading-normal max-w-sm">
                      {isRtl 
                        ? 'تجسد روح السباقات والتحديات والأداء الرياضي العالي. ميكانيكا سويسرية مفرغة لعشاق التميز والهيبة.' 
                        : 'Designed specifically for professional racing watch enthusiasts. Mechanical core dials with dramatic black sub hands.'
                      }
                    </p>
                    <button
                      onClick={() => {
                        const item = products.find(p => p.id === 'watch-1');
                        if (item) { setSelectedProduct(item); setIsDetailsModalOpen(true); }
                      }}
                      className="bg-white text-neutral-950 font-black text-xs px-6 py-3 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                      {isRtl ? 'تفحص الموديلات ومواصفاتها' : 'Explore Collections'}
                    </button>
                  </div>

                  {/* Right block picture */}
                  <div className="w-full md:w-1/2 relative h-[180px] sm:h-[300px] z-10 flex items-center justify-center">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZiqkhNo7HdZTmrKuAUyYAbI7qOAzrGiFqjopizDitizaXAPT1-U3-3peyLTsRUxMBX7JSBGYMGAMhCNK1DbD_QJe0LKt3-8_oX_6aV9iIa8rjqGv5kAdHMJDK1-BNIjnYzC1kh666Pd7kgKahHMEcy44lgcSfDY3Se0dgFrNAO1EYq-8cumk3NCSNfet8HBvT_MqkQgODZDL40HmOo5vxLRygsLpV5FaJ2jpT7PNlg2mNrFBwo4oNOrYMNC_EVMkrLj8y6WnM4cY"
                      alt="Clock Dial Daytona Highlight"
                      className="h-full rounded-lg object-contain mix-blend-lighten"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}

            </section>

          </div>
        )}

      </main>

      {/* ──────────────── BOTTOM MOBILE FLOATING TAB BAR ──────────────── */}
      <nav className="fixed bottom-0 inset-x-0 h-16 bg-white border-t border-neutral-100 z-40 md:hidden flex justify-around items-center px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        
        {/* Navigation Home */}
        <button
          onClick={() => { setActivePage('home'); setSelectedCategory('all'); }}
          className={`flex flex-col items-center justify-center w-16 h-full transition-colors outline-none cursor-pointer ${
            activePage === 'home' && selectedCategory === 'all'
              ? 'text-neutral-900 font-bold'
              : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <span className="text-xs font-bold mt-1">{isRtl ? 'الرئيسية' : 'Home'}</span>
        </button>

        {/* Navigation Categories */}
        <button
          onClick={() => { setActivePage('home'); setSelectedCategory('watches'); }}
          className={`flex flex-col items-center justify-center w-16 h-full transition-colors outline-none cursor-pointer ${
            activePage === 'home' && selectedCategory !== 'all'
              ? 'text-neutral-900 font-bold'
              : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <span className="text-xs font-bold mt-1">{isRtl ? 'الأقسام' : 'Boutique'}</span>
        </button>

        {/* Shopping Cart Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center w-16 h-full text-neutral-400 relative outline-none cursor-pointer"
        >
          <div className="relative">
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-neutral-950 border border-white text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </div>
          <span className="text-xs font-bold mt-1">{isRtl ? 'السلة' : 'My Cart'}</span>
        </button>

        {/* Navigation Profile Account */}
        <button
          onClick={() => {
            if (!isLoggedIn) {
              setActivePage('login');
            } else {
              setActivePage('profile');
            }
          }}
          className={`flex flex-col items-center justify-center w-16 h-full transition-colors outline-none cursor-pointer ${
            activePage === 'profile' || activePage === 'login'
              ? 'text-neutral-900 font-bold'
              : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <span className="text-xs font-bold mt-1">{isRtl ? 'حسابي' : 'Account'}</span>
        </button>

      </nav>

      {/* ──────────────── MODAL PORTALS OVERLAYS ──────────────── */}

      {/* 1. PRODUCT DETAIL MODAL DIALOG SHEET */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        lang={lang}
        currency={currency}
        onAddToCartWithDetails={handleAddToCartWithDetails}
        isFavorite={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
        categoryColors={categoryColors}
      />

      {/* 2. CHAMELEON SHOPPING CART SIDE DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        lang={lang}
        currency={currency}
        onCheckout={handleTriggerCheckout}
      />

      {/* 3. FINAL SECURE CHECKOUT AND SHIPPING INTERFACE */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        lang={lang}
        currency={currency}
        user={user}
        cartItems={cartItems}
        discountPercent={appliedDiscountPercent}
        couponCode={appliedCouponCode}
        onOrderPlaced={handleOrderPlaced}
      />

    </div>
  );
}
