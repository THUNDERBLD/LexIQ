import { useState } from 'react';
import { Mail, Lock, Shield, ChevronRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock store for demonstration
const useLanguageStore = () => ({ language: 'en' });

// Translation object
const LOGIN_TRANSLATIONS = {
  en: {
    title: 'Welcome to Legal Aid',
    subtitle: 'Sign in to your account',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter your email',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    signIn: 'Sign In',
    signingIn: 'Signing In...',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    signUp: 'Sign Up',
    termsPrefix: 'By continuing, you agree to our',
    terms: 'Terms of Service',
    and: 'and',
    privacy: 'Privacy Policy',
    whyAccount: 'Why create an account?',
    reason1: 'Access your documents anytime',
    reason2: 'Track your case progress',
    reason3: 'Get personalized legal assistance',
    emailError: 'Please enter a valid email address',
    passwordError: 'Password must be at least 6 characters',
    loginError: 'Invalid email or password',
  },
  hi: {
    title: 'कानूनी सहायता में आपका स्वागत है',
    subtitle: 'अपने खाते में साइन इन करें',
    emailLabel: 'ईमेल पता',
    emailPlaceholder: 'अपना ईमेल दर्ज करें',
    passwordLabel: 'पासवर्ड',
    passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
    signIn: 'साइन इन करें',
    signingIn: 'साइन इन हो रहा है...',
    forgotPassword: 'पासवर्ड भूल गए?',
    noAccount: 'खाता नहीं है?',
    signUp: 'साइन अप करें',
    termsPrefix: 'जारी रखकर, आप हमारी',
    terms: 'सेवा की शर्तों',
    and: 'और',
    privacy: 'गोपनीयता नीति',
    whyAccount: 'खाता क्यों बनाएं?',
    reason1: 'किसी भी समय अपने दस्तावेज़ों तक पहुंचें',
    reason2: 'अपने मामले की प्रगति को ट्रैक करें',
    reason3: 'व्यक्तिगत कानूनी सहायता प्राप्त करें',
    emailError: 'कृपया एक मान्य ईमेल पता दर्ज करें',
    passwordError: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',
    loginError: 'अमान्य ईमेल या पासवर्ड',
  },
  mr: {
    title: 'कायदेशीर मदतीमध्ये आपले स्वागत आहे',
    subtitle: 'तुमच्या खात्यात साइन इन करा',
    emailLabel: 'ईमेल पत्ता',
    emailPlaceholder: 'तुमचा ईमेल प्रविष्ट करा',
    passwordLabel: 'पासवर्ड',
    passwordPlaceholder: 'तुमचा पासवर्ड प्रविष्ट करा',
    signIn: 'साइन इन करा',
    signingIn: 'साइन इन करत आहे...',
    forgotPassword: 'पासवर्ड विसरलात?',
    noAccount: 'खाते नाही?',
    signUp: 'साइन अप करा',
    termsPrefix: 'सुरू ठेवून, तुम्ही आमच्या',
    terms: 'सेवा अटी',
    and: 'आणि',
    privacy: 'गोपनीयता धोरण',
    whyAccount: 'खाते का तयार करावे?',
    reason1: 'कधीही तुमच्या दस्तऐवजांमध्ये प्रवेश करा',
    reason2: 'तुमच्या केसची प्रगती ट्रॅक करा',
    reason3: 'वैयक्तिक कायदेशीर सहाय्य मिळवा',
    emailError: 'कृपया वैध ईमेल पत्ता प्रविष्ट करा',
    passwordError: 'पासवर्ड किमान 6 वर्णांचा असावा',
    loginError: 'अवैध ईमेल किंवा पासवर्ड',
  },
};

const Login = ({ onSubmit }) => {
  const { language } = useLanguageStore();
  const t = LOGIN_TRANSLATIONS[language] || LOGIN_TRANSLATIONS.en;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleSubmit = async () => {
    // Validate email
    if (!validateEmail(email)) {
      setError(t.emailError);
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setError(t.passwordError);
      return;
    }

    setIsSigningIn(true);
    setError('');

    try {
      // Simulate API call to authenticate
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Logging in with:', { email, password: '***' });

      // Call parent callback
      onSubmit && onSubmit({ email, password });
    } catch (err) {
      console.error('Error signing in:', err);
      setError(t.loginError);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && validateEmail(email) && validatePassword(password)) {
      handleSubmit();
    }
  };

  const isFormValid = validateEmail(email) && validatePassword(password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
      {/* Background decoration - matching home page */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-green-500 to-green-600 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Card */}
      <div className="max-w-md w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl border border-slate-700 p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-slate-300">{t.subtitle}</p>
        </div>

        {/* Login Form */}
        <div className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              {t.emailLabel}
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onKeyPress={handleKeyPress}
                placeholder={t.emailPlaceholder}
                className="w-full h-12 pl-11 pr-4 border-2 rounded-lg outline-none transition-all border-slate-600 bg-slate-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-base placeholder-slate-500"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              {t.passwordLabel}
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                onKeyPress={handleKeyPress}
                placeholder={t.passwordPlaceholder}
                className="w-full h-12 pl-11 pr-12 border-2 rounded-lg outline-none transition-all border-slate-600 bg-slate-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-base placeholder-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a href="#forgot" className="text-sm text-blue-400 hover:text-blue-300 hover:underline font-semibold transition-colors">
              {t.forgotPassword}
            </a>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-900/30 border-l-4 border-red-500 rounded flex items-start gap-2">
              <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSigningIn || !isFormValid}
            className={`
              w-full px-6 py-4 rounded-lg font-semibold transition-all duration-300 text-lg
              inline-flex items-center justify-center gap-2
              ${isSigningIn || !isFormValid
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-400 to-green-500 text-slate-900 hover:from-green-300 hover:to-green-400 shadow-xl hover:shadow-2xl hover:scale-105 transform cursor-pointer'
              }
            `}
          >
            {isSigningIn ? t.signingIn : t.signIn}
            {!isSigningIn && <ChevronRight size={20} />}
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center text-sm text-slate-400 mt-6">
          {t.noAccount}{' '}

          <Link to="/signup" className="text-blue-400 hover:text-blue-300 hover:underline font-semibold transition-colors">
            {t.signUp}
          </Link>
        </div>

        {/* Terms & Privacy */}
        <div className="text-center text-xs text-slate-400 mt-6">
          {t.termsPrefix}{' '}
          <Link to="/terms-of-service" className="text-blue-400 hover:text-blue-300 hover:underline font-semibold transition-colors">
            {t.terms}
          </Link>{' '}
          {t.and}{' '}
          <Link to="/privacy-policy" className="text-blue-400 hover:text-blue-300 hover:underline font-semibold transition-colors">
            {t.privacy}
          </Link>
        </div>

        {/* Why Account Section */}
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700 backdrop-blur-sm">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Shield size={18} className="text-blue-400" />
            {t.whyAccount}
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span>{t.reason1}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span>{t.reason2}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span>{t.reason3}</span>
            </li>
          </ul>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
          <Shield size={16} className="text-green-400" />
          <span>Secure & Encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default Login;