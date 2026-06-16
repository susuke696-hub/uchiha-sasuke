import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, MapPin, CreditCard, Shield, Landmark } from 'lucide-react';
import { UserProfile, CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
  currency: 'SAR' | 'KWD';
  user: UserProfile;
  cartItems: CartItem[];
  discountPercent: number;
  couponCode: string;
  onOrderPlaced: (newOrder: any) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  lang,
  currency,
  user,
  cartItems,
  discountPercent,
  couponCode,
  onOrderPlaced,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  const isRtl = lang === 'ar';

  // Locals state
  const [selectedAddressId, setSelectedAddressId] = useState(user.addresses[0]?.id || '');
  const [selectedPaymentId, setSelectedPaymentId] = useState(user.paymentMethods[0]?.id || '');
  const [shippingInstructions, setShippingInstructions] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

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
    if (isRtl) {
      return `${formatted} ${currency === 'SAR' ? 'ر.س' : 'د.ك'}`;
    }
    return `${currency} ${formatted}`;
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = convertPrice(item.product.price, item.product.currency);
    return acc + (itemPrice * item.quantity);
  }, 0);

  const discountAmount = subtotal * (discountPercent / 100);
  const shippingCost = subtotal > (currency === 'SAR' ? 500 : 40) ? 0 : (currency === 'SAR' ? 35 : 3);
  const taxCost = (subtotal - discountAmount) * (currency === 'SAR' ? 0.15 : 0.05); // 15% VAT for KSA, 5% for Kuwait
  const grandTotal = subtotal - discountAmount + shippingCost + taxCost;

  const handlePlaceOrder = () => {
    const idRandom = `ASH-${Math.floor(10000 + Math.random() * 90000)}`;
    setGeneratedOrderId(idRandom);

    const activeAddress = user.addresses.find(a => a.id === selectedAddressId);
    const activePayment = user.paymentMethods.find(p => p.id === selectedPaymentId);

    const newOrder = {
      id: idRandom,
      date: new Date().toISOString().split('T')[0],
      status: 'shipping',
      statusAr: 'جاري التجهيز والشحن',
      items: [...cartItems],
      total: grandTotal,
      currency: currency,
      address: activeAddress,
      payment: activePayment,
      instructions: shippingInstructions,
    };

    setOrderComplete(true);
    setTimeout(() => {
      onOrderPlaced(newOrder);
      onClose();
      // Reset state
      setOrderComplete(false);
      setShippingInstructions('');
    }, 2800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Checkout Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-neutral-950 rounded-2xl overflow-hidden shadow-2xl z-10 p-6 sm:p-8"
          style={{ direction: isRtl ? 'rtl' : 'ltr' }}
        >
          {/* Close button button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none cursor-pointer"
            style={{ left: isRtl ? '16px' : 'auto', right: isRtl ? 'auto' : '16px' }}
          >
            <X className="w-5 h-5" />
          </button>

          {!orderComplete ? (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">
                {isRtl ? 'تأكيد الشحن والطلب' : 'Shipping & Checkout'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[60vh] pr-1 pl-1">
                
                {/* Left panel options: shipping and specs selection */}
                <div className="space-y-5">
                  
                  {/* Select address section */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                      {isRtl ? 'عنوان التوصيل' : 'Select Delivery Address'}
                    </h3>
                    <div className="space-y-2">
                      {user.addresses.map((addr) => (
                        <label
                          key={addr.id}
                          className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedAddressId === addr.id
                              ? 'border-neutral-900 dark:border-amber-600 bg-neutral-50/50 dark:bg-amber-900/10'
                              : 'border-neutral-150 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50/20 dark:hover:bg-neutral-900/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="checkout_address"
                            checked={selectedAddressId === addr.id}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="mt-1 text-neutral-900 focus:ring-neutral-900 border-neutral-300 dark:border-neutral-700"
                          />
                          <div>
                            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block">
                              {isRtl ? addr.titleAr : addr.title}
                            </span>
                            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal block mt-1">
                              {isRtl ? addr.detailsAr : addr.details}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Select billing payment options */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                      {isRtl ? 'طريقة الدفع الآمنة' : 'Choose Secure Payment'}
                    </h3>
                    <div className="space-y-2">
                      {user.paymentMethods.map((pay) => (
                        <label
                          key={pay.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedPaymentId === pay.id
                              ? 'border-neutral-900 dark:border-amber-600 bg-neutral-50/50 dark:bg-amber-900/10'
                              : 'border-neutral-150 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50/20 dark:hover:bg-neutral-900/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="checkout_payment"
                            checked={selectedPaymentId === pay.id}
                            onChange={() => setSelectedPaymentId(pay.id)}
                            className="text-neutral-900 focus:ring-neutral-900 border-neutral-300 dark:border-neutral-700"
                          />
                          <div className="flex items-center gap-2">
                            <Landmark className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                              {isRtl ? pay.labelAr : pay.label}
                            </span>
                            {pay.lastFour && (
                              <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                                (*{pay.lastFour})
                              </span>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Instructions Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                      {isRtl ? 'ملاحظات خاصة بالتوصيل (اختياري)' : 'Special Delivery Notes (Optional)'}
                    </label>
                    <textarea
                      value={shippingInstructions}
                      onChange={(e) => setShippingInstructions(e.target.value)}
                      rows={2}
                      placeholder={isRtl ? 'مثال: يرجى الاتصال قبل الوصول للتوصيل...' : 'Eg. Call before delivery...'}
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-900 dark:text-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-500 outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                    />
                  </div>
                </div>

                {/* Right billing summary sheet */}
                <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-xl p-4 sm:p-5 flex flex-col justify-between border border-transparent dark:border-neutral-800">
                  <div>
                    <h3 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3">
                      {isRtl ? 'ملخص الفاتورة والرسوم' : 'Billing Summary'}
                    </h3>

                    {/* Order items lists in checkout */}
                    <div className="space-y-3 max-h-[22vh] overflow-y-auto pr-1 pl-1 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                      {cartItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <span className="text-neutral-600 dark:text-neutral-400 max-w-[150px] truncate">
                            {isRtl ? item.product.nameAr : item.product.name}
                            <span className="text-neutral-400 dark:text-neutral-500 font-bold ml-1 text-[10px]">x{item.quantity}</span>
                          </span>
                          <span className="font-extrabold text-neutral-800 dark:text-neutral-200">
                            {formatPriceValue(convertPrice(item.product.price, item.product.currency) * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Sub totals */}
                    <div className="space-y-2 text-xs border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-3">
                      <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                        <span>{isRtl ? 'المجموع الفرعي' : 'Subtotal'}</span>
                        <span>{formatPriceValue(subtotal)}</span>
                      </div>
                      {couponCode && (
                        <div className="flex justify-between text-green-600 dark:text-green-500 font-bold">
                          <span>{isRtl ? `الخصم المطبق (${couponCode})` : `Coupon Discount (${couponCode})`}</span>
                          <span>-{formatPriceValue(discountAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                        <span>{isRtl ? 'تكلفة التوصيل السريع' : 'Delivery Charges'}</span>
                        <span>{shippingCost === 0 ? (isRtl ? 'مجاني' : 'FREE') : formatPriceValue(shippingCost)}</span>
                      </div>
                      <div className="flex justify-between text-neutral-400 dark:text-neutral-500">
                        <span>{isRtl ? 'ضريبة القيمة المضافة مضافة' : 'VAT Taxes Included'}</span>
                        <span>{formatPriceValue(taxCost)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-neutral-900 dark:text-white font-black text-base border-t border-neutral-200 dark:border-neutral-800 pt-3">
                      <span>{isRtl ? 'المجموع الإجمالي' : 'Total Amount'}</span>
                      <span className="text-lg">{formatPriceValue(grandTotal)}</span>
                    </div>

                    {/* Terms trust line */}
                    <div className="flex items-center gap-1.5 justify-center py-4 text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">
                      <Shield className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                      <span>{isRtl ? 'تشفير دفع آمن وحماية خصوصية تامة' : '100% Encrypted & Insured purchase'}</span>
                    </div>

                    {/* Final place order trigger */}
                    <button
                      onClick={handlePlaceOrder}
                      className="w-full py-3.5 bg-neutral-900 dark:bg-amber-600 hover:bg-neutral-800 dark:hover:bg-amber-500 text-white font-bold text-xs rounded-full transition-all active:scale-[0.98] cursor-pointer shadow-lg shadow-neutral-200 dark:shadow-none"
                    >
                      {isRtl ? 'تأكيد الطلب والدفع النهائي' : 'Complete Order Now'}
                    </button>
                  </div>

                </div>

              </div>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 text-center space-y-4 flex flex-col items-center"
            >
              <CheckCircle className="w-20 h-20 text-green-500 stroke-[1.5] animate-bounce" />
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-neutral-950 dark:text-white">
                  {isRtl ? 'تم إرسال طلبك بنجاح!' : 'Order Placed Successfully!'}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium max-w-sm mx-auto">
                  {isRtl 
                    ? `رقم طلبك الداخلي هو (${generatedOrderId}). نقوم الآن بتجهيزه بعناية فائقة لتطابق فخامتك.`
                    : `Your secure order references id (${generatedOrderId}). We are preparing your curated parcel right now.`
                  }
                </p>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
