import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Heart, Check, Plus, Minus, Shield, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
  currency: 'SAR' | 'KWD';
  onAddToCartWithDetails: (
    p: Product,
    quantity: number,
    color?: { name: string; nameAr: string; class: string },
    size?: string
  ) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  categoryColors: Record<string, string>;
}

export default function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  lang,
  currency,
  onAddToCartWithDetails,
  isFavorite,
  onToggleFavorite,
  categoryColors,
}: ProductDetailsModalProps) {
  if (!product) return null;

  const isRtl = lang === 'ar';
  const accentColor = categoryColors[product.category] || '#000';

  // State management for customization
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || undefined);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || undefined);

  // Soft currency conversion rate: 1 KWD = 12.2 SAR
  const formatPrice = (price: number, prodCurrency: 'SAR' | 'KWD') => {
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

    if (lang === 'ar') {
      return `${value} ${currency === 'SAR' ? 'ر.س' : 'د.ك'}`;
    }
    return `${currency} ${value}`;
  };

  const handleAddToCart = () => {
    onAddToCartWithDetails(product, quantity, selectedColor, selectedSize);
    onClose();
    // Reset inputs
    setQuantity(1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-4xl bg-white dark:bg-neutral-950 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-auto max-h-[90vh] z-10"
            style={{ direction: isRtl ? 'rtl' : 'ltr' }}
          >
            {/* Close Button Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:left-auto z-20 w-10 h-10 rounded-full bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md flex items-center justify-center text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              style={{ left: isRtl ? '4px' : 'auto', right: isRtl ? 'auto' : '4px' }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Image with gallery style */}
            <div className="w-full md:w-1/2 bg-neutral-50 dark:bg-neutral-900 relative flex items-center justify-center border-b md:border-b-0 md:border-r border-neutral-100 dark:border-neutral-800" style={{ borderRightWidth: !isRtl ? '1px' : '0', borderLeftWidth: isRtl ? '1px' : '0' }}>
              <img
                src={product.image}
                alt={isRtl ? product.nameAr : product.name}
                className="w-full h-full object-cover max-h-[40vh] md:max-h-none md:h-full py-2 px-2"
                referrerPolicy="no-referrer"
              />
              {/* Highlight favorite button in detail view */}
              <button
                onClick={() => onToggleFavorite(product.id)}
                className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white dark:bg-white shadow-md flex items-center justify-center text-neutral-700 dark:text-neutral-950 hover:scale-110 active:scale-95 transition-all"
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? 'fill-black text-black dark:fill-black font-bold' : 'text-neutral-500 dark:text-black'}`}
                />
              </button>
            </div>

            {/* Right Column: Descriptions & options modifiers */}
            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[45vh] md:max-h-[80vh]">
              <div>
                {/* Category tags */}
                <div 
                  className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-wide"
                  style={{ backgroundColor: `${accentColor}1A`, color: accentColor }}
                >
                  {isRtl ? product.tagsAr?.[0] || product.category : product.tags?.[0] || product.category}
                </div>

                {/* Main Product Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50 leading-snug">
                  {isRtl ? product.nameAr : product.name}
                </h2>

                {/* Rating & reviews summary info */}
                <div className="flex items-center gap-1.5 mt-2.5 mb-4">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-neutral-800 dark:text-neutral-200 text-sm font-bold">{product.rating}</span>
                  </div>
                  <span className="text-neutral-300 dark:text-neutral-700">|</span>
                  <span className="text-xs text-neutral-400 dark:text-neutral-400 font-medium">
                    {isRtl 
                      ? `(${product.reviewsCount} تقييم من عملائنا)` 
                      : `(${product.reviewsCount} verified reviews)`
                    }
                  </span>
                </div>

                {/* Dynamic Price formatting */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">
                    {formatPrice(product.price, product.currency)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-400 dark:text-neutral-500 line-through">
                      {formatPrice(product.originalPrice, product.currency)}
                    </span>
                  )}
                </div>

                {/* Narrative Description text */}
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                  {isRtl ? product.descAr : product.desc}
                </p>

                {/* Color Swatch Selector Option (if any) */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-5">
                    <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
                      {isRtl ? 'اختر اللون' : 'Select Color'}
                    </span>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 outline-none ${color.class}`}
                          title={isRtl ? color.nameAr : color.name}
                        >
                          {selectedColor?.name === color.name && (
                            <Check className="w-4 h-4 text-white drop-shadow-md stroke-[3]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Swatch Selector Option (if any) */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
                      {isRtl ? 'المقاس المتاح' : 'Choose Size'}
                    </span>
                    <div className="flex gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                            selectedSize === size
                              ? 'border-neutral-900 dark:border-white bg-neutral-950 dark:bg-white text-white dark:text-neutral-900'
                              : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-600'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features list */}
                {((isRtl ? product.featuresAr : product.features) || []).length > 0 && (
                  <div className="mb-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2.5">
                      {isRtl ? 'المواصفات الفنية' : 'Specifications'}
                    </h4>
                    <ul className="space-y-1.5">
                      {((isRtl ? product.featuresAr : product.features) || []).map((feature, idx) => (
                        <li key={idx} className="text-xs text-neutral-600 dark:text-neutral-400 flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 mt-1.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons: Add to Cart and Quantity controls */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
                    {isRtl ? 'الكمية المطلوبة' : 'Quantity Selection'}
                  </span>
                  
                  {/* Plus Minus control buttons */}
                  <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden bg-neutral-50 dark:bg-neutral-900">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-neutral-800 dark:text-neutral-200">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-grow py-4 px-6 rounded-full font-bold text-white text-sm transition-opacity hover:opacity-90 active:scale-[0.98] duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-neutral-100 dark:shadow-none"
                    style={{ backgroundColor: accentColor }}
                  >
                    <span>{isRtl ? 'إضافة لعربة التسوق' : 'Add to Shopping Bag'}</span>
                  </button>
                </div>

                {/* Trust symbols badges */}
                <div className="grid grid-cols-3 gap-2 pt-3 text-[10px] text-neutral-400 dark:text-neutral-500 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                    <span>{isRtl ? 'توصيل سريع وآمن' : 'Express Delivery'}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Shield className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                    <span>{isRtl ? 'دفع آمن 100%' : 'Secure Checkout'}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                    <span>{isRtl ? 'ضمان إرجاع سهل' : 'Easy Returns'}</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
