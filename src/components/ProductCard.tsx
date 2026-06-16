import { motion } from 'motion/react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  lang: 'ar' | 'en';
  currency: 'SAR' | 'KWD';
  isFavorite: boolean;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  onToggleFavorite: (id: string) => void;
  categoryColors: Record<string, string>;
}

export default function ProductCard({
  product,
  lang,
  currency,
  isFavorite,
  onAddToCart,
  onViewDetails,
  onToggleFavorite,
  categoryColors,
}: ProductCardProps) {
  const isRtl = lang === 'ar';

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

  const getOriginalPriceFormatted = () => {
    if (!product.originalPrice) return null;
    return formatPrice(product.originalPrice, product.currency);
  };

  const accentColor = categoryColors[product.category] || '#000';

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      id={`product-card-${product.id}`}
      className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden border border-neutral-100 dark:border-neutral-800 hover:border-neutral-250 dark:hover:border-neutral-700 minimalist-card-shadow-hover transition-all duration-300 group flex flex-col justify-between"
    >
      <div 
        onClick={() => onViewDetails(product)}
        className="relative aspect-[3/4] bg-[#f9f9f8] dark:bg-neutral-850 overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={isRtl ? product.nameAr : product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          referrerPolicy="no-referrer"
        />
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full glass-panel dark:bg-white/80 dark:border-neutral-200 dark:text-neutral-950 flex items-center justify-center text-neutral-700 hover:scale-105 transition-all duration-200 active:scale-95 shadow-xs"
          style={{ zIndex: 10 }}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors duration-250 ${isFavorite ? 'fill-neutral-900 text-neutral-900 dark:fill-black dark:text-black' : 'text-neutral-500 dark:text-black'}`}
          />
        </button>

        {/* Bestseller Badge */}
        {product.isBestSeller && (
          <div
            className="absolute top-3 left-3 text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full text-white shadow-xs"
            style={{ backgroundColor: accentColor, zIndex: 5 }}
          >
            {isRtl ? 'الأكثر مبيعاً' : 'Best Seller'}
          </div>
        )}

        {/* Discount Badge */}
        {product.originalPrice && (
          <div
            className="absolute bottom-3 left-3 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-amber-600 text-white shadow-xs"
            style={{ zIndex: 5 }}
          >
            {isRtl ? 'خصم خاص' : 'Sale'}
          </div>
        )}
      </div>

      {/* Info Details */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div onClick={() => onViewDetails(product)} className="cursor-pointer space-y-1.5">
          <div className="flex justify-between items-center text-[9px] text-neutral-450 dark:text-neutral-400 font-bold tracking-widest uppercase">
            <span>{isRtl ? product.tagsAr?.[0] || product.category : product.tags?.[0] || product.category}</span>
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-neutral-900 dark:fill-black lg:group-hover:fill-amber-400 text-transparent transition-colors" />
              <span className="text-neutral-600 dark:text-neutral-400 text-[10px] font-bold font-mono">{product.rating}</span>
            </div>
          </div>
          <h3 className="font-medium text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm tracking-tight group-hover:text-neutral-750 dark:group-hover:text-neutral-300 transition-colors line-clamp-1">
            {isRtl ? product.nameAr : product.name}
          </h3>
          <p className="text-neutral-400 dark:text-neutral-400 font-light text-[11px] line-clamp-1">
            {isRtl ? product.descAr : product.desc}
          </p>
        </div>

        <div className="mt-4 pt-1.5 border-t border-neutral-50 dark:border-neutral-800/80 flex items-center justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-[10px] font-medium font-mono text-neutral-400 dark:text-neutral-500 line-through">
                {getOriginalPriceFormatted()}
              </span>
            )}
            <span className="font-bold text-neutral-950 dark:text-neutral-50 text-sm sm:text-base font-mono">
              {formatPrice(product.price, product.currency)}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white dark:text-neutral-950 transition-all hover:scale-105 active:scale-95 duration-200 shadow-xs cursor-pointer"
            style={{ backgroundColor: accentColor }}
            title={isRtl ? 'أضف إلى السلة' : 'Add to Cart'}
          >
            <ShoppingCart className="w-3.5 h-3.5 dark:text-neutral-950" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
