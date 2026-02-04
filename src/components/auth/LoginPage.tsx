import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock, Eye, EyeOff, Save } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/utils';

type AuthMode = 'login' | 'signup';

// Saved credentials key
const SAVED_EMAIL_KEY = 'n2-saved-email';

export function LoginPage() {
  const { login, loginWithEmail, signUp, isLoading, error, clearError } = useAuthStore();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [hasSavedEmail, setHasSavedEmail] = useState(false);

  // Load saved email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem(SAVED_EMAIL_KEY);
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
      setHasSavedEmail(true);
    }
  }, []);

  const handleGoogleLogin = async () => {
    clearError();
    await login();
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!email || !password) return;

    if (authMode === 'login') {
      await loginWithEmail(email, password);
    } else {
      await signUp(email, password);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(prev => prev === 'login' ? 'signup' : 'login');
    clearError();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo & Title */}
        <div className="text-center mb-6">
          <motion.div
            className="text-5xl mb-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            📚
          </motion.div>
          <motion.h1
            className="text-3xl font-bold text-white mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            N2 Master
          </motion.h1>
          <motion.p
            className="text-slate-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            JLPT N2 Kanji & Vocabulary Study App
          </motion.p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 text-red-400 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Email/Password Form */}
        <motion.form
          onSubmit={handleEmailSubmit}
          className="bg-slate-900 rounded-xl p-5 mb-4 border border-slate-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-white font-medium mb-4 text-center">
            {authMode === 'login' ? 'Login' : 'Create Account'}
          </h2>

          {/* Email Input */}
          <div className="mb-3">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  'w-full py-3 pl-10 pr-4 rounded-lg',
                  'bg-slate-800 border border-slate-700',
                  'text-white placeholder-slate-500',
                  'focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500',
                  'transition-colors'
                )}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(
                  'w-full py-3 pl-10 pr-12 rounded-lg',
                  'bg-slate-800 border border-slate-700',
                  'text-white placeholder-slate-500',
                  'focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500',
                  'transition-colors'
                )}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {authMode === 'signup' && (
              <p className="text-slate-500 text-xs mt-1 ml-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className={cn(
              'w-full py-3 rounded-lg font-medium transition-all',
              'flex items-center justify-center gap-2',
              'bg-cyan-600 hover:bg-cyan-500 text-white',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              authMode === 'login' ? 'Login' : 'Sign Up'
            )}
          </button>

          {/* Toggle Auth Mode */}
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={toggleAuthMode}
              className="text-cyan-400 text-sm hover:underline"
            >
              {authMode === 'login'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Login'}
            </button>
          </div>
        </motion.form>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-slate-700" />
          <span className="text-slate-500 text-sm">or</span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>

        {/* Google Sign In Button */}
        <motion.button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className={cn(
            'w-full py-3 px-4 rounded-xl font-medium transition-all',
            'flex items-center justify-center gap-3',
            'bg-white hover:bg-slate-100 text-slate-800',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              {/* Google Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </>
          )}
        </motion.button>

        {/* Footer */}
        <motion.p
          className="text-center text-slate-500 text-xs mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          N2 日本語総まとめ • Data: Hla Hla Htay
        </motion.p>
      </motion.div>
    </div>
  );
}
