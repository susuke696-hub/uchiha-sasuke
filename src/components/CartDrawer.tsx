import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, Ticket, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (idx: number, newQty: number) => void;
  onRemoveItem: (idx: number) => void;
  lang: 'ar' | 'en';
  currency: 'SAR' | 'KWD';
  onCheckout: (appliedDiscountPercent: number, appliedCouponCode: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  lang,
  currency,
  onCheckout,
}: CartDrawerProps) {
  const isRtl = lang === 'ar';

  // State management for discounts
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponCodeApplied, setCouponCodeApplied] = useState('');
  const [couponError, setCouponError] = useState('');

  // Soft currency conversion rate: 1 KWD = 12.2 SAR
  const convertPrice = (price: number, prodCurrency: 'SAR' | 'KWD') => {
    let convertedPrice = price;
    if (currency !== prodCurrency) {
      if (currency === 'SAR' && prodCurrency === 'KWD') {
        convertedPrice = price * 12.2;
      } else if (currency === 'KWD' && prodCurrency === 'SAR') {
        convertedPrice = price / 12.2;
      }
    }
    return convertedPrice;
  };

  const formatPriceValue = (value: number) => {
    const formatted = value.toLocaleString(undefined, {
      minimumFractionDigits: currency === 'KWD' ? 3 : 0,
      maximumFractionDigits: currency === 'KWD' ? 3 : 2,
    });
    if (lang === 'ar') {
      return `${formatted} ${currency === 'SAR' ? 'ر.س' : 'د.ك'}`;
    }
    return `${currency} ${formatted}`;
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = convertPrice(item.product.price, item.product.currency);
    return acc + (itemPrice * item.quantity);
  }, 0);

  const discountAmount = subtotal * (appliedDiscount / 100);
  const shippingCost = subtotal > (currency === 'SAR' ? 500 : 40) ? 0 : (currency === 'SAR' ? 35 : 3);
  const taxCost = (subtotal - discountAmount) * (currency === 'SAR' ? 0.15 : 0.05); // 15% VAT for KSA, 5% for Kuwait
  const grandTotal = subtotal - discountAmount + shippingCost + taxCost;

  const handleApplyCoupon = () => {
    setCouponError('');
    if (coupon.trim().toUpperCase() === 'ASHITY10') {
      setAppliedDiscount(10);
      setCouponCodeApplied('ASHITY10');
      setCoupon('');
    } else if (coupon.trim().toUpperCase() === 'RAMADAN') {
      setAppliedDiscount(20);
      setCouponCodeApplied('RAMADAN');
      setCoupon('');
    } else {
      setCouponError(isRtl ? 'الكوبون غير صحيح أو منتهي الصلاحية' : 'Invalid coupon code or expired');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Drawer container body sliding in */}
          <motion.div
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className={`relative w-full max-w-md bg-white dark:bg-neutral-950 h-full flex flex-col justify-between shadow-2xl z-10 ${
              isRtl ? 'left-auto right-0' : 'left-0 right-auto'
            }`}
            style={{ direction: isRtl ? 'rtl' : 'ltr', right: isRtl ? 'auto' : 0, left: isRtl ? 0 : 'auto' }}
          >
            {/* Header portion */}
            <div className="p-4 sm:p-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-900">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
                <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-lg">
                  {isRtl ? 'عربة التسوق' : 'Shopping Cart'}
                </h3>
                <span className="bg-neutral-900 dark:bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main content body containing items list */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-16 h-16 text-neutral-200 dark:text-neutral-800 stroke-[1]" />
                  <div>
                    <h4 className="font-bold text-neutral-700 dark:text-neutral-300">
                      {isRtl ? 'سلتك فارغة تماماً' : 'Your cart is completely empty'}
                    </h4>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 max-w-[200px] mx-auto">
                      {isRtl 
                        ? 'تصفح منتجاتنا المميزة وأضف لمساتك الفاخرة وسوف تظهر هنا.' 
                        : 'Discover our premium items and style up your unique collection.'
                      }
                    </p>
                  </div>
                </div>
              ) : (
                cartItems.map((item, idx) => {
                  const itemPriceUnconverted = item.product.price;
                  const itemPriceConverted = convertPrice(itemPriceUnconverted, item.product.currency);
                  return (
                    <motion.div
                      key={`${item.product.id}-${idx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800 relative group"
                    >
                      {/* Product Thumbnail image */}
                      <div className="w-20 h-20 bg-white dark:bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0 border border-neutral-100 dark:border-neutral-700">
                        <img
                          src={item.product.image}
                          alt={isRtl ? item.product.nameAr : item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Content summary */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-neutral-800 dark:text-neutral-200 text-sm line-clamp-1">
                            {isRtl ? item.product.nameAr : item.product.name}
                          </h4>
                          
                          {/* Selected Custom Options */}
                          <div className="flex flex-wrap gap-x-2 text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">
                            {item.selectedColor && (
                              <span className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full inline-block bg-neutral-400 dark:bg-neutral-600" style={{ backgroundColor: item.selectedColor.class.includes('bg-') ? undefined : item.selectedColor.class }} />
                                {isRtl ? item.selectedColor.nameAr : item.selectedColor.name}
                              </span>
                            )}
                            {item.selectedSize && (
                              <span>
                                {isRtl ? `المقاس: ${item.selectedSize}` : `Size: ${item.selectedSize}`}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity and removal buttons */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded bg-white dark:bg-neutral-950">
                            <button
                              onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-neutral-800 dark:text-neutral-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-bold text-neutral-900 dark:text-white text-sm">
                            {formatPriceValue(itemPriceConverted * item.quantity)}
                          </span>
                        </div>
                      </div>

                      {/* Absolute trash button */}
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="absolute top-2 left-2 w-6 h-6 rounded bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-100 dark:hover:border-red-900 transition-colors"
                        style={{ left: isRtl ? '8px' : 'auto', right: isRtl ? 'auto' : '8px' }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Calculations and billing portion */}
            {cartItems.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-neutral-100 dark:border-neutral-800 space-y-4 bg-neutral-50 dark:bg-neutral-900">
                {/* Coupon Code Panel */}
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-grow">
                      <Ticket className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2" style={{ right: isRtl ? '12px' : 'auto', left: isRtl ? 'auto' : '12px' }} />
                      <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder={isRtl ? 'أدخل كوبون الخصم (ASHITY10)...' : 'Enter promo code...'}
                        className={`w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg py-2 text-xs text-neutral-900 dark:text-white focus:ring-1 focus:ring-neutral-800 dark:focus:ring-neutral-400 focus:border-neutral-800 dark:focus:border-neutral-400 outline-none ${
                          isRtl ? 'pr-9 pl-3' : 'pl-9 pr-3'
                        }`}
                      />
                    </div>
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-neutral-900 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      {isRtl ? 'تطبيق' : 'Apply'}
                    </button>
                  </div>
                  {couponError && <p className="text-[10px] text-red-500 font-bold">{couponError}</p>}
                  {couponCodeApplied && (
                    <div className="flex items-center gap-1.5 text-[10px] text-green-600 dark:text-green-400 font-bold">
                      <Check className="w-3.5 h-3.5" />
                      <span>
                        {isRtl 
                          ? `تم تطبيق الكوبون (${couponCodeApplied}) بنجاح خصم_ ${appliedDiscount}%` 
                          : `Coupon (${couponCodeApplied}) successfully applied giving ${appliedDiscount}% off!`
                        }
                      </span>
                    </div>
                  )}
                </div>

                {/* Subtotals list */}
                <div className="space-y-2 text-sm pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                    <span>{isRtl ? 'المجموع الفرعي' : 'Subtotal'}</span>
                    <span>{formatPriceValue(subtotal)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-500 font-bold">
                      <span>{isRtl ? `الخصم المطبق (${appliedDiscount}%)` : `Promo Discount (${appliedDiscount}%)`}</span>
                      <span>-{formatPriceValue(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                    <span>{isRtl ? 'تكلفة التوصيل' : 'Delivery Charges'}</span>
                    <span>
                      {shippingCost === 0 
                        ? (isRtl ? 'مجاني' : 'FREE') 
                        : formatPriceValue(shippingCost)
                      }
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-400 dark:text-neutral-500 text-xs">
                    <span>
                      {isRtl 
                        ? `ضريبة القيمة المضافة (${currency === 'SAR' ? '15%' : '5%'})` 
                        : `VAT Standard (${currency === 'SAR' ? '15%' : '5%'})`
                      }
                    </span>
                    <span>{formatPriceValue(taxCost)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-900 dark:text-white font-extrabold text-base pt-2 border-t border-neutral-200 dark:border-neutral-800">
                    <span>{isRtl ? 'المجموع الكلي المتبقي' : 'Grand Total'}</span>
                    <span className="text-neutral-950 dark:text-white font-black">{formatPriceValue(grandTotal)}</span>
                  </div>
                </div>

                {/* Primary Button to trigger checkout metadata */}
                <button
                  onClick={() => onCheckout(appliedDiscount, couponCodeApplied)}
                  className="w-full py-4 bg-neutral-950 dark:bg-amber-600 hover:bg-neutral-800 dark:hover:bg-amber-500 text-white font-bold text-sm rounded-full transition-all active:scale-[0.98] duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-neutral-200 dark:shadow-none mt-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isRtl ? 'إكمال عملية الشراء والدفع' : 'Proceed to Checkout'}</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
