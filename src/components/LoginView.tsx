import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Check, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

interface LoginViewProps {
  lang: 'ar' | 'en';
  onLoginSuccess: (email: string) => void;
  onSkipLogin: () => void;
}

export default function LoginView({ lang, onLoginSuccess, onSkipLogin }: LoginViewProps) {
  const isRtl = lang === 'ar';

  // Form inputs
  const [email, setEmail] = useState('ahmed.mohamed@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorError] = useState('');

  const handleFormLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorError('');

    // Mock login handling for generic form
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email);
    }, 1200);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorError('');
    try {
      const { GoogleAuthProvider } = await import('firebase/auth');
      const { setAccessToken } = await import('../firebase');
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        setAccessToken(credential.accessToken);
      }
      onLoginSuccess(result.user.email || '');
    } catch (error: any) {
      console.error(error);
      setErrorError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="w-full min-h-[80vh] flex items-center justify-center p-4 relative"
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      <div className="w-full max-w-md bg-white dark:bg-neutral-950 rounded-2xl p-6 sm:p-8 border border-neutral-100 dark:border-neutral-800 shadow-xl relative overflow-hidden group">
        
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/50 dark:from-neutral-900/50 to-neutral-100/30 dark:to-neutral-800/30 opacity-70 z-0 pointer-events-none" />

        {/* Back and skip links header */}
        <div className="flex justify-between items-center relative z-10 mb-8">
          <button 
            onClick={onSkipLogin}
            className="text-xs font-bold text-neutral-450 dark:text-neutral-500 hover:text-neutral-750 dark:hover:text-neutral-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            {isRtl ? 'التصفح كزائر' : 'Browse as Guest'}
            {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
          
          <h2 className="font-extrabold text-neutral-900 dark:text-white text-lg tracking-tight">
            {isRtl ? 'متجر أشيتي' : 'Ashity Shop'}
          </h2>
        </div>

        {/* Greeting block */}
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
            {isRtl ? 'مرحباً بك مجدداً' : 'Welcome Back'}
          </h1>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium mt-1.5">
            {isRtl 
              ? 'سجل الدخول للمتابعة إلى عالم الأناقة والقرطاسية الفاخرة' 
              : 'Sign in to continue into the world of curated luxury'
            }
          </p>
        </div>

        {/* Error panel */}
        {errorMsg && (
          <div className="p-3 mb-4 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-lg flex items-center gap-2 z-10 relative">
            <X className="w-4 h-4" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Main interactive form */}
        <form onSubmit={handleFormLogin} className="space-y-5 relative z-10">
          
          {/* Email input field */}
          <div className="relative">
            <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 block mb-1">
              {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-neutral-50/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl py-3 px-4 text-sm text-neutral-900 dark:text-white outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-500 focus:border-neutral-900 dark:focus:border-neutral-500 focus:bg-white dark:focus:bg-neutral-950 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
              placeholder="example@yourdomain.com"
            />
          </div>

          {/* Password input field */}
          <div className="relative">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 block">
                {isRtl ? 'كلمة المرور' : 'Password'}
              </label>
              <button
                type="button"
                className="text-[10px] text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 font-bold cursor-pointer"
              >
                {isRtl ? 'هل نسيت كلمة المرور؟' : 'Forgot Password?'}
              </button>
            </div>
            
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-neutral-50/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl py-3 px-4 text-sm text-neutral-900 dark:text-white outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-500 focus:border-neutral-900 dark:focus:border-neutral-500 focus:bg-white dark:focus:bg-neutral-950 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 -translate-y-1/2 text-neutral-450 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 focus:outline-none cursor-pointer"
                style={{ right: isRtl ? 'auto' : '16px', left: isRtl ? '16px' : 'auto' }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-neutral-950 dark:bg-amber-600 hover:bg-neutral-850 dark:hover:bg-amber-500 text-white font-bold text-sm rounded-full transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.11 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <span>{isRtl ? 'تسجيل الدخول' : 'Sign In'}</span>
            )}
          </button>
        </form>

        {/* Or divider */}
        <div className="relative my-6 z-10 flex items-center">
          <div className="flex-grow border-t border-neutral-100 dark:border-neutral-800" />
          <span className="flex-shrink-0 mx-3 text-neutral-400 dark:text-neutral-500 font-bold text-[10px] uppercase tracking-wider">
            {isRtl ? 'أو' : 'Or'}
          </span>
          <div className="flex-grow border-t border-neutral-100 dark:border-neutral-800" />
        </div>

        {/* Apple and Google multi grids */}
        <div className="grid grid-cols-2 gap-3 relative z-10">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 border border-neutral-200 dark:border-neutral-800 rounded-full py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-200 cursor-pointer text-xs font-bold text-neutral-700 dark:text-neutral-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span>Google</span>
          </button>

          <button
            onClick={() => onLoginSuccess('apple-user@icloud.com')}
            className="flex items-center justify-center gap-2 border border-neutral-200 dark:border-neutral-800 rounded-full py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-200 cursor-pointer text-xs font-bold text-neutral-700 dark:text-neutral-300"
          >
            <svg className="w-4 h-4 text-neutral-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.05 2.53.86 3.23.86.72 0 2.14-.94 3.73-.8 1.56.05 3 .69 3.9 1.83-3.32 1.88-2.76 6.32.48 7.61-.71 1.73-1.6 3.55-3.34 3.47zM12.03 7.25c-.15-2.5 1.94-4.56 4.24-4.81.33 2.68-2.21 4.88-4.24 4.81z" />
            </svg>
            <span>Apple</span>
          </button>
        </div>

        {/* Footer sign up redirection */}
        <div className="text-center mt-8 relative z-10 text-xs">
          <p className="text-neutral-400 dark:text-neutral-500 font-medium">
            {isRtl ? 'ليس لديك حساب حتى الآن؟' : "Don't have an account yet?"}{' '}
            <button className="text-neutral-900 dark:text-white font-bold hover:underline cursor-pointer">
              {isRtl ? 'سجل معنا الآن' : 'Sign Up'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
