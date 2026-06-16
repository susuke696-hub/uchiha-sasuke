import { Product } from './types';

export const products: Product[] = [
  // --- LIBRARY CATEGORY ---
  {
    id: 'lib-1',
    name: 'Classics Collection',
    nameAr: 'مجموعة الكلاسيكيات',
    desc: 'Luxurious leather-bound collector’s classics with gold-foliated motifs and linen markers.',
    descAr: 'إصدارات جلدية فاخرة تحمل عبق التاريخ والأدب الكلاسيكي العالمي مع أطراف مذهبة وشريط فاصل حريري.',
    price: 45, // In KWD
    currency: 'KWD',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop',
    category: 'library',
    tags: ['Premium', 'Leather-bound', 'Lumina Gold'],
    tagsAr: ['إصدار فاخر', 'غلاف جلدي', 'تذهيب حريري'],
    rating: 4.9,
    reviewsCount: 124,
    features: ['Handcrafted binding', 'Acid-free cream paper', 'Elegant presentation box'],
    featuresAr: ['تجليد يدوي متكامل', 'ورق كريمي خالٍ من الأحماض يدوم لأجيال', 'علبة تقديم فاخرة لحفظ الكتب'],
    isBestSeller: true
  },
  {
    id: 'lib-2',
    name: "Aurora Fountain Pen",
    nameAr: "قلم حبر 'أورورا'",
    desc: 'Sleek matte black fountain pen with precise hand-polished fine gold nib for rich lines.',
    descAr: 'قلم حبر فاخر باللون الأسود المطفي مع ريشة ذهبية عيار 14 قيراطًا مصقولة يدويًا للمسة فنية وتوقيع كحبر السحر.',
    price: 120, // In KWD
    currency: 'KWD',
    image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=600&auto=format&fit=crop',
    category: 'library',
    tags: ['Elegance', '14K Gold Nib', 'Matte Black'],
    tagsAr: ['أناقة مطلقة', 'ريشة ذهبية 14k', 'أسود مطفي'],
    rating: 5.0,
    reviewsCount: 89,
    colors: [
      { name: 'Matte Black', nameAr: 'أسود مطفي', class: 'bg-stone-900 border border-stone-800' },
      { name: 'Classic Blue', nameAr: 'أزرق كلاسيكي', class: 'bg-cyan-900 border border-cyan-800' }
    ],
    features: ['14k Gold nib', 'Refillable ink cartridge converter', 'Comfortable balance design'],
    featuresAr: ['ريشة من الذهب الخالص', 'مكبس تعبئة داخلي قابل لإعادة الاستخدام', 'توازن فائق ومريح للكتابة الطويلة'],
    isBestSeller: true
  },
  {
    id: 'lib-3',
    name: "Sakina Notebooks",
    nameAr: "دفاتر 'سكينة'",
    desc: 'Artisan soft pastel notebook stack using earth-friendly recycled thick paper.',
    descAr: 'مجموعة من دفاتر الملاحظات الحرفية بألوان الباستيل الهادئة مع ورق ناعم معاد تدويره وتجليد مخيط متين.',
    price: 15.5, // In KWD
    currency: 'KWD',
    image: 'https://images.unsplash.com/photo-1531346878377-a541e4ab0213?q=80&w=600&auto=format&fit=crop',
    category: 'library',
    tags: ['Recycled', 'Eco-friendly', 'Crafted'],
    tagsAr: ['صديق للبيئة', 'ورق معاد تدويره', 'صناعة يدوية'],
    rating: 4.8,
    reviewsCount: 215,
    features: ['Heavyweight 120gsm pages', 'Soft touch water-resistant covers', 'Lie-flat 180° binding'],
    featuresAr: ['ورق سميك بوزن 120 غرام لمنع تسرب الحبر', 'أغطية ناعمة الملمس ومقاومة للرطوبة', 'فتح مسطح بزاوية 180 درجة لسهولة التدوين']
  },
  {
    id: 'lib-4',
    name: "Contemporary Novels",
    nameAr: "روايات معاصرة",
    desc: 'Award-winning novels from today’s most visionary authors with sleek cover art designs.',
    descAr: 'إصدارات متميزة وأحدث الروايات الأكثر مبيعاً لنخبة من الأدباء المعاصرين بأغلفة متميزة ومثيرة للفضول العلمي.',
    price: 8.0, // In KWD
    currency: 'KWD',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop',
    category: 'library',
    tags: ['Trending', 'Literature', 'Modern'],
    tagsAr: ['حديث', 'روائع الأدب', 'الأكثر مبيعاً'],
    rating: 4.7,
    reviewsCount: 312
  },
  {
    id: 'lib-5',
    name: "Professional Art Set",
    nameAr: "طقم الرسم الاحترافي",
    desc: 'An open premium leather pencil case revealing meticulously arrayed professional sketching utensils.',
    descAr: 'حقيبة أقلام فاخرة من الجلد الطبيعي تضم مجموعة متكاملة متسقة من أقلام الجرافيت الاحترافية وأدوات التظليل المتطورة.',
    price: 35.0, // In KWD
    currency: 'KWD',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop',
    category: 'library',
    tags: ['Artisanal', 'Graphite Sketching', 'Leather Roll'],
    tagsAr: ['أدوات فنية', 'رسم احترافي', 'حقيبة جلد طبيعي'],
    rating: 4.9,
    reviewsCount: 47,
    features: ['Genuine cowhide organizer case', '12 Grade hardness pencils', 'Precision charcoal blending stumps'],
    featuresAr: ['منظم مصنوع كليًا من الجلد الطبيعي يدويًا', '12 تدرجًا مختلفًا لدرجات رصاص الجرافيت', 'أقلام دمج الفحم المخصصة للمحترفين']
  },

  // --- PERFUMES CATEGORY ---
  {
    id: 'perf-1',
    name: 'Royal Oud Deluxe',
    nameAr: 'عود ملكي فاخر',
    desc: 'A divine masterwork bottle encapsulating rich Cambodian oud essence blended with luxurious saffron.',
    descAr: 'تحفة عطرية مذهلة تمزج خلاصة العウド الكمبودي الأصيل والزعفران مع لمسات مخملية ملكية تمنحك حضورًا وهيبة لا تُنسى.',
    price: 850, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1594035910387-fea477274976?q=80&w=600&auto=format&fit=crop',
    category: 'perfumes',
    tags: ['Royal Essence', 'Cambodian Oud', 'Amber Saffron'],
    tagsAr: ['ملكي فاخر', 'عود كمبودي', 'زعفران وعنبر'],
    rating: 4.95,
    reviewsCount: 340,
    features: ['100ml Extrait de Parfum concentration', '24-Hour lingering protection', 'Premium glass container'],
    featuresAr: ['تركيز عالي جداً (Extrait de Parfum)', 'ثبات يتجاوز 24 ساعة بتركيبة فريدة', 'زجاج مصنع بتقنيات البلور الفاخر ومصقول يدويًا'],
    isBestSeller: true
  },
  {
    id: 'perf-2',
    name: 'Oud Musk Blend',
    nameAr: 'مسك العود',
    desc: 'Smooth alignment of warm velvet white musk combined with dynamic premium light oud.',
    descAr: 'مزيج ساحر يجمع بين دفء ونعومة المسك الأبيض النقي وفخامة العود الفاخر الخفيف لجاذبية رقيقة تدوم.',
    price: 250, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=600&auto=format&fit=crop',
    category: 'perfumes',
    tags: ['Velvet White Musk', 'Soft Scent', 'Unisex'],
    tagsAr: ['مسك ناعم', 'رونق هادئ', 'للجنسين'],
    rating: 4.8,
    reviewsCount: 198
  },
  {
    id: 'perf-3',
    name: 'Woody Amber',
    nameAr: 'عنبر الخشب',
    desc: 'Grounded dark wood oil combined with warm sweet golden liquid amber.',
    descAr: 'لمسة غنية تجمع عمق أوراق الصندل مع دفء وحلاوة العنبر الذهبي لخلق عبير فخم ودافئ كطبيعة الغابة العريقة.',
    price: 320, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1594035910387-fea477274976?q=80&w=600&auto=format&fit=crop',
    category: 'perfumes',
    tags: ['Sandalwood', 'Golden Amber', 'Mysterious'],
    tagsAr: ['خشب الصندل', 'عنبر ذهبي', 'عطر غامض ومثير'],
    rating: 4.82,
    reviewsCount: 112
  },
  {
    id: 'perf-4',
    name: 'Rose de Paris',
    nameAr: 'زهرة الباريس',
    desc: 'Elegant French rose petals with hints of sweet vanilla and fresh morning air.',
    descAr: 'عبير الأنوثة الطاغية المنسوج من جزيئات بتلات الورد الفرنسي الخلاب مع باقة من الياسمين والفانيليا المغرية.',
    price: 450, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=600&auto=format&fit=crop',
    category: 'perfumes',
    tags: ['French Rose', 'Vanilla Gourmand', 'Romantic'],
    tagsAr: ['ورد فرنسي', 'فانيليا فرنسية', 'إحساس رومانسي'],
    rating: 4.9,
    reviewsCount: 156
  },
  {
    id: 'perf-5',
    name: 'Sabah Breeze',
    nameAr: 'نسيم الصباح',
    desc: 'Uplifting premium cologne containing notes of fresh blood orange and morning dew drop.',
    descAr: 'انطلاقة منعشة ليومك بفضل نفحات زهرة البرتقال المندى، والبرغموت ليكون رفيقك المثالي في صباحاتك الثمينة.',
    price: 380, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1594035910387-fea477274976?q=80&w=600&auto=format&fit=crop',
    category: 'perfumes',
    tags: ['Citrus Blast', 'Neroli Essence', 'Daily Fresh'],
    tagsAr: ['حمضيات منعشة', 'مستخلص الزيت العطري', 'عطر يومي منعش'],
    rating: 4.75,
    reviewsCount: 224
  },

  // --- WATCHES CATEGORY ---
  {
    id: 'watch-1',
    name: 'Omega Seamaster Chronograph',
    nameAr: 'كرونوغراف أوميغا سيماستر',
    desc: 'The absolute pinnacle of aquatic luxury engineering. Striking detailed steel bezel with gold finish dials.',
    descAr: 'قمة الهندسة والاتقان السويسري الرياضي الفخم. تتميز بهيكلها الصلب المصقول مع أرقام دقيقة وتدرجات مذهبة مقاومة للخدش.',
    price: 45000, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop',
    category: 'watches',
    tags: ['Swiss Masterwork', 'Chronograph', 'Limited Edition'],
    tagsAr: ['سويسري فاخر', 'كرونوغراف رياضي', 'إصدار محدود'],
    rating: 5.0,
    reviewsCount: 38,
    features: ['Co-Axial Master Chronometer caliber 9900', '60-Hour power reserve', '600m Water resistance depth rating'],
    featuresAr: ['حركة كرونوغراف محورية عيار 9900', 'باور ريزيرف طويل يدوم 60 ساعة كاملة', 'مقاوم للماء لأعماق تصل لـ 600 متر'],
    isBestSeller: true
  },
  {
    id: 'watch-2',
    name: 'Daniel Wellington Petite',
    nameAr: 'دانيال ويلينغتون بيتي',
    desc: 'Sleek premium and minimalistic women’s watch with beautiful rose gold mesh strap configuration.',
    descAr: 'تصميم ناعم خفيف يبرز أناقة المظهر بفضل قرصها الأبيض الناصع وحزامها الشبيكي المطلي بالذهب الوردي الأنيق.',
    price: 1200, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1587836374828-cb4387860987?q=80&w=600&auto=format&fit=crop',
    category: 'watches',
    tags: ['Rose Gold Mesh', 'Minimalist Dial', 'Feminine Style'],
    tagsAr: ['ذهب وردي شبيكي', 'قرص كلاسيكي ناعم', 'أناقة نسائية'],
    rating: 4.88,
    reviewsCount: 162
  },
  {
    id: 'watch-3',
    name: 'Tag Heuer Aquaracer',
    nameAr: 'تاغ هوير أكواريسر',
    desc: 'A rugged yet highly premium men’s quartz dive watch with bold steel bracelets.',
    descAr: 'ساعة رجالية خارقة الصلابة ورفيعة المستوى. مصنوعة كليًا من الفولاذ المقاوم للصدأ ومجهزة بقرص غوص مع حلقة تدوير أحادية الاتجاه.',
    price: 12500, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=600&auto=format&fit=crop',
    category: 'watches',
    tags: ['Professional Diver', 'Steel Bracelet', 'Precision Quartz'],
    tagsAr: ['ساعة غوص محترفة', 'سوار معدني متين', 'ميكانيكا كوارتز فائقة'],
    rating: 4.9,
    reviewsCount: 74
  },
  {
    id: 'watch-4',
    name: 'Patek Philippe Skeleton Tourbillon',
    nameAr: 'باتيك فيليب سكيليتون',
    desc: 'The absolute summit of haute horology. Entirely handcrafted gears showing mechanical heart.',
    descAr: 'تحفة ميكانيكية استثنائية تكشف التروس الذهبية الدقيقة لقلب الساعة النابض بالتوربيون لعشاق التفرد والفخامة الفائقة.',
    price: 250000, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1548171915-e7af50a3111b?q=80&w=600&auto=format&fit=crop',
    category: 'watches',
    tags: ['Tourbillon Case', 'Pinnacle Horology', 'Gold Skeleton'],
    tagsAr: ['مستخلص توربيون', 'قمة فخامة الساعات', 'هيكل سكيليتون ذهبي'],
    rating: 5.0,
    reviewsCount: 14,
    features: ['Manual winding Skeletonized movements', '18K Carat gold micro components', 'Certified Geneva Seal certificate of origin'],
    featuresAr: ['تعبئة يدوية وهيكل مفرغ بالكامل ببراعة', 'تروس وعجلات مصنعة من ذهب عيار 18 قيراط', 'مختومة بختم جنيف العالمي لأرقى الساعات']
  },
  {
    id: 'watch-5',
    name: 'Lumina Smart Watch',
    nameAr: 'ساعة ذكية فاخرة',
    desc: 'High-definition AMOLED display styled beautifully inside classical leather bands.',
    descAr: 'التقاء التكنولوجيا المعاصرة بالذوق الكلاسيكي المميز بفضل شاشة AMOLED اللامعة والسوار الجلدي الطبيعي مع مستشعرات الصحة والرياضة.',
    price: 4500, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop',
    category: 'watches',
    tags: ['Smart AMOLED', 'Leather Strap', 'Health Tracking'],
    tagsAr: ['AMOLED ذكي', 'حزام جلدي راقي', 'متابعة اللياقة والصحة'],
    rating: 4.85,
    reviewsCount: 201
  },

  // --- ANIME STREERWEAR CATEGORY ---
  {
    id: 'anime-1',
    name: 'Attack on Titan Premium Graphic T-Shirt',
    nameAr: 'هجوم العمالقة - تي تيشيرت',
    desc: 'Striking black manga-style premium cotton tee featuring beautiful intense electric red brush strokes.',
    descAr: 'تيشيرت من القطن الممتاز الفاخر برسمة كلاسيكية حادة لشخصيات هجوم العمالقة مع لمسات باللون الأحمر الناري يعبر عن الإثارة الأسطورية للمانغا.',
    price: 250, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop',
    category: 'anime',
    tags: ['AOT Official', 'Heavy Cotton', 'High Energy'],
    tagsAr: ['مرخص رسميًا', 'قطن ثقيل', 'أحمر مشتعل'],
    rating: 4.92,
    reviewsCount: 421,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: ['100% Ring-spun heavyweight cotton', 'Vibrant screen-print ink technology', 'High resistance wash durability'],
    featuresAr: ['قطن مغزول حلقيًا بنسبة 100% ذو ملمس ثقيل', 'طباعة عالية الدقة تمنع بهتان الرسومات في الغسيل', 'أكتاف مدعومة بخياطة مزدوجة لمتانة استثنائية'],
    isBestSeller: true
  },
  {
    id: 'anime-2',
    name: 'One Piece Neon Outline Oversized Hoodie',
    nameAr: 'ون بيس - هودي نيون',
    desc: 'Cyberpunk styled black heavy oversized hoodie featuring beautiful glowing cyan neon character outlines.',
    descAr: 'هودي أوفرسايز باللون الأسود العميق مزين بخطوط لوفي المتوهجة بلون النيون السماوي بتدرج مستوحى من طراز السايبربانك العجيب.',
    price: 220, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop',
    category: 'anime',
    tags: ['Luffy Glow', 'Cyberpunk Street', 'High Comfort'],
    tagsAr: ['توهج النيون السماوي', 'نمط شارع سايبربانك', 'مبطن دافئ'],
    rating: 4.95,
    reviewsCount: 310,
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: 'anime-3',
    name: 'Evangelion Multi-Color Oversized Tee',
    nameAr: 'تيشيرت أوفر سايز إيفانجيليون',
    desc: 'Heavyweight white oversized t-shirt displaying a gorgeous anime robot graphic print detailing.',
    descAr: 'تيشيرت من القطن عالي الجودة باللون الأبيض يعرض طباعة مفصلة ملونة لشخصيات ومقود إيفانجيليون الخيالية لأناقة حضرية فريدة.',
    price: 120, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=600&auto=format&fit=crop',
    category: 'anime',
    tags: ['Evangelion Unit', 'Off-White Tech', 'Vibrant Mech'],
    tagsAr: ['وحدات إيفانجيليون', 'أوف وايت تيك', 'ألوان زاهية ميتشا'],
    rating: 4.8,
    reviewsCount: 147,
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'anime-4',
    name: 'Naruto Classic Kanji Hoodie',
    nameAr: 'هودي ناروتو كلاسيك',
    desc: 'Iconic orange-and-black luxury streetwear hoodie with an artistic anime character face print.',
    descAr: 'هودي كلاسيكي فخم باللون الأسود يتميز بطباعة أنمي جذابة لشخصية هارا مع الحروف اليابانية مطرزة باللون البرتقالي على الأكمام.',
    price: 190, // In SAR
    currency: 'SAR',
    originalPrice: 240,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
    category: 'anime',
    tags: ['Akatsuki Orange', 'Speacial Price', 'Manga Knit'],
    tagsAr: ['أورانج أكاتسوكي', 'خصم خاص', 'أحرف يابانية مطرزة'],
    rating: 4.86,
    reviewsCount: 189,
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 'anime-5',
    name: 'Studio Ghibli Watercolor Tee',
    nameAr: 'تيشيرت استوديو غيبلي',
    desc: 'Beige minimalist crewneck illustrating a quiet watercolor artistic landscape design.',
    descAr: 'تيشيرت أنيق بلون البيج الكلاسيكي يحمل لوحة مائية ساحرة تمثل هدوء وسحر الطبيعة الأسطورية لعالم غيبلي الخالد.',
    price: 95, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop',
    category: 'anime',
    tags: ['Ghibli Landscape', 'Cozy Pastel', 'Minimalist'],
    tagsAr: ['الطبيعة الساحرة غيبلي', 'باستيل هادئ', 'نمط مريح'],
    rating: 4.88,
    reviewsCount: 205,
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'anime-6',
    name: 'Akatsuki Embroidered Red Cloud Snapback',
    nameAr: 'كاب أكاتسوكي المطرز',
    desc: 'Pristine white tech snapback boasting highly detailed vibrant red cloud embroidery.',
    descAr: 'كاب باللون الأبيض الناصع تم تطريزه يدويًا وبدقة عالية برمز السحابة الحمراء الشهير لتشكيلات أكاتسوكي الأسطورية.',
    price: 75, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop',
    category: 'anime',
    tags: ['Red Cloud', 'Custom Embroidery', 'Street Cap'],
    tagsAr: ['سحابة حمراء مطرزة', 'تطريز ممتص للحرارة', 'إكسسوار غاية في الأناقة'],
    rating: 4.9,
    reviewsCount: 92
  },

  // --- CROCHET HANDMADE CATEGORY ---
  {
    id: 'crochet-1',
    name: 'Geometric Pastel Crochet Tote Bag',
    nameAr: 'حقيبة توت هندسية',
    desc: 'Warm soft-toned artisanal geometric patterned granny square shoulder shoulder tote bag.',
    descAr: 'حقيبة كتف فريدة من نوعها تم حياكتها يدويًا بأشكال هندسية متناسقة دافئة تجمع بين البساطة والأناقة المترفة لتلائم يومك المزدحم.',
    price: 120, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600&auto=format&fit=crop',
    category: 'crochet',
    tags: ['Hand-knitted', 'Artisanal Tote', 'Soft Pastel Yarn'],
    tagsAr: ['خياطة كروشيه يدوية', 'حقيبة منسوجة', 'غزل الباستيل الناعم'],
    rating: 4.94,
    reviewsCount: 112,
    features: ['High durability cotton blend yarn', 'Reinforced straps of matching yarn structure', 'Internal linen protective lining'],
    featuresAr: ['ألياف قطن عالية القوة والمتانة لحمل أمتعتك', 'أحزمة كتف مبنية ومزدوجة تمنع التمدد المزعج', 'مبطنة بالكامل بقماش الكتان الناعم لحماية الأمتعة الداخلية'],
    isBestSeller: true
  },
  {
    id: 'crochet-2',
    name: 'Artisan Soft Summer Top',
    nameAr: 'بلوزة صيفية ناعمة',
    desc: 'Delicate summer lace-knit lightweight comfortable breathable top in soft warm pastel orange.',
    descAr: 'بلوزة صيفية غاية في النعومة كروشيه مفرغ بنقوش دانتيلية خلابة، تأتي بلون برتقالي باستيل هادئ لتشعر بخفة نسيم الصيف.',
    price: 85, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=600&auto=format&fit=crop',
    category: 'crochet',
    tags: ['Organic Cotton', 'Artisanal Lace', 'Boho Chic'],
    tagsAr: ['قطن خالص عضوي', 'دانتيل كروشيه', 'تصميم بوهيمي ساحر'],
    rating: 4.84,
    reviewsCount: 78,
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'crochet-3',
    name: 'Chunky Cozy Knit Decor Pillow',
    nameAr: 'وسادة ديكور مكتنزة',
    desc: 'Heavily thick textured creamy off-white crochet throw pillow perfect for beautiful homes.',
    descAr: 'وسادة كروشيه ممتلئة بغرز ضخمة تمنح غرفتك لمسة من الدفء والعمق الجمالي المحضر خصيصًا بلون أوف وايت كريمي هادئ.',
    price: 60, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=600&auto=format&fit=crop',
    category: 'crochet',
    tags: ['Home Aesthetics', 'Textured Knit', 'Cozy Vibe'],
    tagsAr: ['إكسسوار منزل فاخر', 'غرزة كروشيه سميكة', 'فخامة وخلابة'],
    rating: 4.9,
    reviewsCount: 142
  },
  {
    id: 'crochet-4',
    name: 'Artisan Burgundy Warm Winter Scarf',
    nameAr: 'وشاح شتوي دافئ',
    desc: 'Heavy luxury handcrafted wool burgundy winter cowl scarf with rich, highly-defined yarn braids.',
    descAr: 'وشاح عريض دافئ محاك ببراعة يدوية تامة غرزة تلو الأخرى بلون أحمر بورغندي (عنابي) عميق يوفر لك الدفء الفاخر والحنان البصري والملمسي.',
    price: 95, // In SAR
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?q=80&w=600&auto=format&fit=crop',
    category: 'crochet',
    tags: ['Premium Merino', 'Cable Knit Scarf', 'Rich Burgundy'],
    tagsAr: ['صوف ميرينو الممتاز', 'جدائل منسوجة فخمة', 'أحمر بورغندي ملكي'],
    rating: 4.92,
    reviewsCount: 85
  }
];

export const staticUserProfile: import('./types').UserProfile = {
  name: 'Ahmed Mohamed',
  nameAr: 'أحمد محمد',
  email: 'ahmed.mohamed@example.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
  addresses: [
    {
      id: 'addr-1',
      title: 'Home Address',
      titleAr: 'المنزل الرئيسي',
      details: 'King Fahd Rd, Al Olaya District, Building 332, Riyadh, Saudi Arabia',
      detailsAr: 'طريق الملك فهد، حي العليا، مبنى 332، الرياض، المملكة العربية السعودية',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'Kuwait Office',
      titleAr: 'مكتب الكويت',
      details: 'Sharq Area, Jaber Al-Mubarak St, Al Hamra Tower, Floor 42, Kuwait City',
      detailsAr: 'منطقة الشرق، شارع جابر المبارك، برج الحمراء، الدور 42، مدينة الكويت',
      isDefault: false
    }
  ],
  paymentMethods: [
    {
      id: 'pay-1',
      type: 'apple_pay',
      label: 'Apple Pay',
      labelAr: 'آبل باي',
      isDefault: true
    },
    {
      id: 'pay-2',
      type: 'mada',
      label: 'Mada Credit Card',
      labelAr: 'بطاقة مدى الائتمانية',
      lastFour: '4031',
      isDefault: false
    }
  ],
  favorites: ['lib-1', 'perf-1', 'watch-1', 'anime-1'],
  orders: [
    {
      id: 'ASH-39281',
      date: '2026-06-01',
      status: 'delivered',
      statusAr: 'تم التوصيل بنجاح',
      total: 1045, // in SAR
      currency: 'SAR',
      items: [
        {
          product: {
            id: 'perf-1',
            name: 'Royal Oud Deluxe',
            nameAr: 'عود ملكي فاخر',
            desc: '',
            descAr: '',
            price: 850,
            currency: 'SAR',
            image: 'https://images.unsplash.com/photo-1594035910387-fea477274976?q=80&w=600&auto=format&fit=crop',
            category: 'perfumes',
            rating: 5.0,
            reviewsCount: 1
          },
          quantity: 1
        },
        {
          product: {
            id: 'anime-4',
            name: 'Naruto Classic Kanji Hoodie',
            nameAr: 'هودي ناروتو كلاسيك',
            desc: '',
            descAr: '',
            price: 190,
            currency: 'SAR',
            image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
            category: 'anime',
            rating: 4.86,
            reviewsCount: 189
          },
          quantity: 1,
          selectedSize: 'XL'
        }
      ]
    }
  ]
};
