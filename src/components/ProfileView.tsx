  import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { User, Mail, MapPin, CreditCard, ShoppingBag, LogOut, Check, ArrowLeft, ArrowRight, Save, Calendar } from 'lucide-react';
import { UserProfile, Order, Address, PaymentMethod } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  lang: 'ar' | 'en';
  currency: 'SAR' | 'KWD';
  onUpdateUser: (newUser: UserProfile) => void;
  onLogout: () => void;
  categoryColors: Record<string, string>;
}

export default function ProfileView({
  user,
  lang,
  currency,
  onUpdateUser,
  onLogout,
  categoryColors,
}: ProfileViewProps) {
  const isRtl = lang === 'ar';

  // Local state managers
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'payments' | 'edit' | 'emails' | 'calendar'>('orders');
  const [editName, setEditName] = useState(user.name);
  const [editNameAr, setEditNameAr] = useState(user.nameAr);
  const [editEmail, setEditEmail] = useState(user.email);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Soft currency conversion rate: 1 KWD = 12.2 SAR
  const formatPrice = (price: number, prodCurrency: string) => {
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

  const handleSaveInfo = (e: FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: editName,
      nameAr: editNameAr,
      email: editEmail,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      
      {/* Upper Profile Banner with Avatar */}
      <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-800 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-neutral-50 dark:border-neutral-800 shadow-md">
          <img
            src={user.avatar}
            alt={isRtl ? user.nameAr : user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center md:text-right flex-grow space-y-1">
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
            {isRtl ? user.nameAr : user.name}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-2 sm:gap-6 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1.5 justify-center">
              <Mail className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
              <span>{user.email}</span>
            </span>
            <span className="flex items-center gap-1.5 justify-center">
              <MapPin className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
              <span>
                {isRtl 
                  ? `${user.addresses.length} عناوين مسجلة` 
                  : `${user.addresses.length} saved addresses`
                }
              </span>
            </span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-5 py-2.5 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/40 text-red-600 dark:text-red-500 font-bold text-xs rounded-full flex items-center gap-1.5 transition-colors self-center cursor-pointer border border-transparent dark:border-red-900/30"
        >
          <LogOut className="w-4 h-4" />
          <span>{isRtl ? 'تسجيل الخروج' : 'Log Out'}</span>
        </button>
      </section>

      {/* Tabs navigation */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto no-scrollbar gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 px-1 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'orders'
              ? 'border-neutral-900 dark:border-amber-500 text-neutral-900 dark:text-amber-500 font-bold'
              : 'border-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{isRtl ? 'طلباتي' : 'My Orders'}</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 border-b-2 px-1 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'addresses'
              ? 'border-neutral-900 dark:border-amber-500 text-neutral-900 dark:text-amber-500 font-bold'
              : 'border-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>{isRtl ? 'العناوين المسجلة' : 'Saved Addresses'}</span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`pb-3 border-b-2 px-1 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'payments'
              ? 'border-neutral-900 dark:border-amber-500 text-neutral-900 dark:text-amber-500 font-bold'
              : 'border-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>{isRtl ? 'طرق الدفع' : 'Payment Methods'}</span>
        </button>

        <button
          onClick={() => setActiveTab('emails')}
          className={`pb-3 border-b-2 px-1 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'emails'
              ? 'border-neutral-900 dark:border-amber-500 text-neutral-900 dark:text-amber-500 font-bold'
              : 'border-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>{isRtl ? 'البريد الإلكتروني' : 'Emails'}</span>
        </button>

        <button
          onClick={() => setActiveTab('calendar')}
          className={`pb-3 border-b-2 px-1 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'calendar'
              ? 'border-neutral-900 dark:border-amber-500 text-neutral-900 dark:text-amber-500 font-bold'
              : 'border-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{isRtl ? 'التقويم' : 'Calendar'}</span>
        </button>

        <button
          onClick={() => setActiveTab('edit')}
          className={`pb-3 border-b-2 px-1 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'edit'
              ? 'border-neutral-900 dark:border-amber-500 text-neutral-900 dark:text-amber-500 font-bold'
              : 'border-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300'
          }`}
        >
          <User className="w-4 h-4" />
          <span>{isRtl ? 'تعديل الحساب' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Dynamic Tab Body */}
      <div className="min-h-[30vh]">
        
        {/* TAB 1: Historic Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {user.orders.length === 0 ? (
              <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-100 dark:border-neutral-800 text-center space-y-4 shadow-sm">
                <ShoppingBag className="w-12 h-12 text-neutral-200 dark:text-neutral-700 mx-auto" />
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                  {isRtl ? 'ليس لديك أي طلبات تاريخية حتى الآن.' : 'You do not have any orders yet.'}
                </p>
              </div>
            ) : (
              user.orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800 shadow-sm"
                >
                  {/* Order header banner */}
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-950/50 border-b border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row justify-between gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    <div className="flex flex-wrap gap-4">
                      <span>
                        {isRtl ? 'رقم الطلب:' : 'Order ID:'} <strong className="text-neutral-800 dark:text-neutral-200">{order.id}</strong>
                      </span>
                      <span>
                        {isRtl ? 'تاريخ الطلب:' : 'Order Date:'} <strong className="text-neutral-800 dark:text-neutral-200">{order.date}</strong>
                      </span>
                    </div>

                    {/* Badge status */}
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      <span className="text-green-600 dark:text-green-500 font-bold">{isRtl ? order.statusAr : order.status}</span>
                    </div>
                  </div>

                  {/* Order Items list */}
                  <div className="p-4 sm:p-5 divide-y divide-neutral-100 dark:divide-neutral-800">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-3 flex gap-4 items-center justify-between text-sm">
                        <div className="flex gap-3 items-center">
                          <img
                            src={item.product.image}
                            alt={isRtl ? item.product.nameAr : item.product.name}
                            className="w-12 h-12 rounded object-cover border border-neutral-100 dark:border-neutral-700 flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="font-bold text-neutral-800 dark:text-neutral-200">
                              {isRtl ? item.product.nameAr : item.product.name}
                            </h4>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500">
                              {isRtl 
                                ? `الكمية: ${item.quantity} | السعر: ${formatPrice(item.product.price, item.product.currency)}`
                                : `Qty: ${item.quantity} | Price: ${formatPrice(item.product.price, item.product.currency)}`
                              }
                            </p>
                          </div>
                        </div>

                        <span className="font-extrabold text-neutral-950 dark:text-white">
                          {formatPrice(item.product.price * item.quantity, item.product.currency)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Summary Footer */}
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-950/50 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center text-sm font-bold">
                    <span className="text-neutral-500 dark:text-neutral-400">{isRtl ? 'المجموع الكلي المدفوع' : 'Grand Total Paid'}</span>
                    <span className="text-neutral-950 dark:text-white text-base font-black">
                      {formatPrice(order.total, order.currency)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: Addresses Management */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.addresses.map((addr) => (
              <div
                key={addr.id}
                className={`bg-white dark:bg-neutral-900 rounded-2xl p-5 border shadow-xs relative flex flex-col justify-between ${
                  addr.isDefault ? 'border-neutral-900 dark:border-amber-600 bg-neutral-50/20 dark:bg-amber-900/10' : 'border-neutral-100 dark:border-neutral-800'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full">
                      <MapPin className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                    </span>
                    <h4 className="font-bold text-neutral-800 dark:text-neutral-200 text-sm">
                      {isRtl ? addr.titleAr : addr.title}
                    </h4>
                    {addr.isDefault && (
                      <span className="text-[9px] font-black bg-stone-900 dark:bg-amber-600 text-white rounded px-1.5 py-0.5">
                        {isRtl ? 'الافتراضي' : 'DEFAULT'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed pt-1">
                    {isRtl ? addr.detailsAr : addr.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Payment methods */}
        {activeTab === 'payments' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.paymentMethods.map((pay) => (
              <div
                key={pay.id}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-100 dark:border-neutral-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2.5 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <CreditCard className="w-5 h-5 text-neutral-800 dark:text-neutral-300" />
                  </span>
                  <div>
                    <h4 className="font-bold text-neutral-800 dark:text-neutral-200 text-sm">
                      {isRtl ? pay.labelAr : pay.label}
                    </h4>
                    {pay.lastFour && (
                      <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500">•••• •••• •••• {pay.lastFour}</p>
                    )}
                  </div>
                </div>

                {pay.isDefault && (
                  <span className="text-[10px] font-extrabold bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-500 rounded px-2.5 py-1">
                    {isRtl ? 'نشط' : 'ACTIVE'}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: Edit profile */}
        {activeTab === 'edit' && (
          <form onSubmit={handleSaveInfo} className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-800 max-w-xl space-y-4 shadow-sm">
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                {isRtl ? 'الاسم بالإنجليزية' : 'Name in English'}
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg py-2.5 px-3.5 text-sm text-neutral-900 dark:text-white focus:ring-1 focus:ring-neutral-850 dark:focus:ring-neutral-500 outline-none placeholder:text-neutral-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                {isRtl ? 'الاسم بالكامل (العربية)' : 'Name in Arabic'}
              </label>
              <input
                type="text"
                value={editNameAr}
                onChange={(e) => setEditNameAr(e.target.value)}
                required
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg py-2.5 px-3.5 text-sm text-neutral-900 dark:text-white focus:ring-1 focus:ring-neutral-850 dark:focus:ring-neutral-500 outline-none placeholder:text-neutral-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                required
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg py-2.5 px-3.5 text-sm text-neutral-900 dark:text-white focus:ring-1 focus:ring-neutral-850 dark:focus:ring-neutral-500 outline-none placeholder:text-neutral-500"
              />
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-neutral-900 dark:bg-amber-600 hover:bg-neutral-850 dark:hover:bg-amber-500 text-white font-bold text-sm rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isRtl ? 'حفظ التغييرات' : 'Save Info'}</span>
              </button>

              {saveSuccess && (
                <span className="text-xs text-green-600 dark:text-green-500 font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  <span>{isRtl ? 'تم الحفظ بنجاح!' : 'Saved successfully!'}</span>
                </span>
              )}
            </div>
          </form>
        )}

        {/* TAB 5: Emails */}
        {activeTab === 'emails' && (
          <EmailsTab lang={lang} />
        )}

        {/* TAB 6: Calendar */}
        {activeTab === 'calendar' && (
          <CalendarTab lang={lang} />
        )}

      </div>
    </div>
  );
}

// Subcomponent for Calendar
function CalendarTab({ lang }: { lang: 'ar' | 'en' }) {
  const isRtl = lang === 'ar';
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadEvents() {
      try {
        const { getAccessToken } = await import('../firebase');
        const token = getAccessToken();
        if (!token) throw new Error('No access token available. Please sign in with Google again.');

        const timeMin = new Date().toISOString();
        const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&maxResults=5&orderBy=startTime&singleEvents=true`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Google Calendar API error: ${res.statusText}`);
        const data = await res.json();
        setEvents(data.items || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  if (loading) return <div className="text-sm font-bold text-neutral-500">{isRtl ? 'جاري التحميل...' : 'Loading events...'}</div>;
  if (error) return <div className="text-sm font-bold text-red-500">{error}</div>;

  return (
    <div className="space-y-3">
      {events.length === 0 ? (
        <div className="text-sm text-neutral-500">{isRtl ? 'لا توجد أحداث قادمة.' : 'No upcoming events found.'}</div>
      ) : (
        events.map((event) => {
          const startTimestamp = event.start?.dateTime || event.start?.date;
          const timeString = startTimestamp ? new Date(startTimestamp).toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US', {
            weekday: 'short', month: 'short', day: 'numeric',
            hour: 'numeric', minute: '2-digit'
          }) : '';
          return (
            <div key={event.id} className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-100 dark:border-neutral-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-neutral-900 dark:text-white text-sm">{event.summary || '(No Title)'}</h4>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  <Calendar className="w-3 h-3" />
                  <span>{timeString}</span>
                </div>
              </div>
              {event.htmlLink && (
                <a href={event.htmlLink} target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-md inline-block w-fit">
                  {isRtl ? 'عرض في التقويم' : 'View in Calendar'}
                </a>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

// Subcomponent for Emails
function EmailsTab({ lang }: { lang: 'ar' | 'en' }) {
  const isRtl = lang === 'ar';
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadEmails() {
      try {
        const { getAccessToken } = await import('../firebase');
        const token = getAccessToken();
        if (!token) throw new Error('No access token available. Please sign in with Google again.');

        const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Gmail API error: ${res.statusText}`);
        const data = await res.json();
        
        const details = await Promise.all(
          (data.messages || []).map(async (msg: any) => {
            const mRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const mData = await mRes.json();
            const subject = mData.payload.headers.find((h: any) => h.name === 'Subject')?.value;
            const from = mData.payload.headers.find((h: any) => h.name === 'From')?.value;
            return { id: msg.id, subject, from, snippet: mData.snippet };
          })
        );
        setEmails(details);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadEmails();
  });

  if (loading) return <div className="text-sm font-bold text-neutral-500">{isRtl ? 'جاري التحميل...' : 'Loading emails...'}</div>;
  if (error) return <div className="text-sm font-bold text-red-500">{error}</div>;

  return (
    <div className="space-y-3">
      {emails.length === 0 ? (
        <div className="text-sm text-neutral-500">{isRtl ? 'لا توجد رسائل.' : 'No messages found.'}</div>
      ) : (
        emails.map((email) => (
          <div key={email.id} className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-100 dark:border-neutral-800 shadow-sm">
            <h4 className="font-bold text-neutral-900 dark:text-white text-sm">{email.subject || '(No Subject)'}</h4>
            <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-1">{email.from}</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-2">{email.snippet}</p>
          </div>
        ))
      )}
    </div>
  );
}
