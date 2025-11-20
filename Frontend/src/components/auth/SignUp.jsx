import { useState } from 'react';
import { Mail, Lock, Shield, ChevronRight, AlertCircle, Eye, EyeOff, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock store for demonstration
const useLanguageStore = () => ({ language: 'en' });

// Translation object
const SIGNUP_TRANSLATIONS = {
  en: {
    title: 'Join Legal Aid',
    subtitle: 'Create your account to get started',
    nameLabel: 'Full Name',
    namePlaceholder: 'Enter your full name',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter your email',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Create a password',
    confirmPasswordLabel: 'Confirm Password',
    confirmPasswordPlaceholder: 'Re-enter your password',
    signUp: 'Create Account',
    signingUp: 'Creating Account...',
    alreadyAccount: 'Already have an account?',
    signIn: 'Sign In',
    termsPrefix: 'By signing up, you agree to our',
    terms: 'Terms of Service',
    and: 'and',
    privacy: 'Privacy Policy',
    whySignUp: 'Why sign up with Legal Aid?',
    reason1: 'Get personalized legal assistance',
    reason2: 'Save and track your documents',
    reason3: 'Access expert legal resources',
    nameError: 'Please enter your full name',
    emailError: 'Please enter a valid email address',
    passwordError: 'Password must be at least 8 characters',
    confirmPasswordError: 'Passwords do not match',
    passwordStrength: 'Use at least 8 characters with letters and numbers',
  },
  hi: {
    title: 'कानूनी सहायता में शामिल हों',
    subtitle: 'शुरू करने के लिए अपना खाता बनाएं',
    nameLabel: 'पूरा नाम',
    namePlaceholder: 'अपना पूरा नाम दर्ज करें',
    emailLabel: 'ईमेल पता',
    emailPlaceholder: 'अपना ईमेल दर्ज करें',
    passwordLabel: 'पासवर्ड',
    passwordPlaceholder: 'एक पासवर्ड बनाएं',
    confirmPasswordLabel: 'पासवर्ड की पुष्टि करें',
    confirmPasswordPlaceholder: 'अपना पासवर्ड फिर से दर्ज करें',
    signUp: 'खाता बनाएं',
    signingUp: 'खाता बनाया जा रहा है...',
    alreadyAccount: 'पहले से खाता है?',
    signIn: 'साइन इन करें',
    termsPrefix: 'साइन अप करके, आप हमारी',
    terms: 'सेवा की शर्तों',
    and: 'और',
    privacy: 'गोपनीयता नीति',
    whySignUp: 'कानूनी सहायता के साथ साइन अप क्यों करें?',
    reason1: 'व्यक्तिगत कानूनी सहायता प्राप्त करें',
    reason2: 'अपने दस्तावेज़ों को सहेजें और ट्रैक करें',
    reason3: 'विशेषज्ञ कानूनी संसाधनों तक पहुंचें',
    nameError: 'कृपया अपना पूरा नाम दर्ज करें',
    emailError: 'कृपया एक मान्य ईमेल पता दर्ज करें',
    passwordError: 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए',
    confirmPasswordError: 'पासवर्ड मेल नहीं खाते',
    passwordStrength: 'अक्षरों और संख्याओं के साथ कम से कम 8 वर्ण उपयोग करें',
  },
  mr: {
    title: 'कायदेशीर मदतीमध्ये सामील व्हा',
    subtitle: 'सुरुवात करण्यासाठी तुमचे खाते तयार करा',
    nameLabel: 'पूर्ण नाव',
    namePlaceholder: 'तुमचे पूर्ण नाव प्रविष्ट करा',
    emailLabel: 'ईमेल पत्ता',
    emailPlaceholder: 'तुमचा ईमेल प्रविष्ट करा',
    passwordLabel: 'पासवर्ड',
    passwordPlaceholder: 'एक पासवर्ड तयार करा',
    confirmPasswordLabel: 'पासवर्डची पुष्टी करा',
    confirmPasswordPlaceholder: 'तुमचा पासवर्ड पुन्हा प्रविष्ट करा',
    signUp: 'खाते तयार करा',
    signingUp: 'खाते तयार करत आहे...',
    alreadyAccount: 'आधीपासून खाते आहे?',
    signIn: 'साइन इन करा',
    termsPrefix: 'साइन अप करून, तुम्ही आमच्या',
    terms: 'सेवा अटी',
    and: 'आणि',
    privacy: 'गोपनीयता धोरण',
    whySignUp: 'कायदेशीर मदतीसह साइन अप का करावे?',
    reason1: 'वैयक्तिक कायदेशीर सहाय्य मिळवा',
    reason2: 'तुमचे दस्तऐवज जतन करा आणि ट्रॅक करा',
    reason3: 'तज्ञ कायदेशीर संसाधने मिळवा',
    nameError: 'कृपया तुमचे पूर्ण नाव प्रविष्ट करा',
    emailError: 'कृपया वैध ईमेल पत्ता प्रविष्ट करा',
    passwordError: 'पासवर्ड किमान 8 वर्णांचा असावा',
    confirmPasswordError: 'पासवर्ड जुळत नाहीत',
    passwordStrength: 'अक्षरे आणि संख्या असलेले किमान 8 वर्ण वापरा',
  },
};

const SignUp = ({ onSubmit }) => {
  const { language } = useLanguageStore();
  const t = SIGNUP_TRANSLATIONS[language] || SIGNUP_TRANSLATIONS.en;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errors, setErrors] = useState({});

  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
    if (errors.confirmPassword && confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};

    // Validate all fields
    if (!validateName(name)) {
      newErrors.name = t.nameError;
    }
    if (!validateEmail(email)) {
      newErrors.email = t.emailError;
    }
    if (!validatePassword(password)) {
      newErrors.password = t.passwordError;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = t.confirmPasswordError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSigningUp(true);
    setErrors({});

    try {
      // Simulate API call to create account
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Creating account with:', { name, email, password: '***' });

      // Call parent callback
      onSubmit && onSubmit({ name, email, password });
    } catch (err) {
      console.error('Error creating account:', err);
      setErrors({ general: 'Failed to create account. Please try again.' });
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const isFormValid = validateName(name) && validateEmail(email) && 
                      validatePassword(password) && password === confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden py-8">
      {/* Background decoration - matching home page */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-green-500 to-green-600 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Card */}
      <div className="max-w-md w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl border border-slate-700 p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-slate-300">{t.subtitle}</p>
        </div>

        {/* Sign Up Form */}
        <div className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              {t.nameLabel}
            </label>
            <div className="relative">
              <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                onKeyPress={handleKeyPress}
                placeholder={t.namePlaceholder}
                className={`w-full h-12 pl-11 pr-4 border-2 rounded-lg outline-none transition-all text-base placeholder-slate-500 ${
                  errors.name 
                    ? 'border-red-500 bg-red-900/20 text-red-400 focus:ring-red-500/50' 
                    : 'border-slate-600 bg-slate-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
                }`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.name}
              </p>
            )}
          </div>

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
                className={`w-full h-12 pl-11 pr-4 border-2 rounded-lg outline-none transition-all text-base placeholder-slate-500 ${
                  errors.email 
                    ? 'border-red-500 bg-red-900/20 text-red-400 focus:ring-red-500/50' 
                    : 'border-slate-600 bg-slate-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.email}
              </p>
            )}
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
                className={`w-full h-12 pl-11 pr-12 border-2 rounded-lg outline-none transition-all text-base placeholder-slate-500 ${
                  errors.password 
                    ? 'border-red-500 bg-red-900/20 text-red-400 focus:ring-red-500/50' 
                    : 'border-slate-600 bg-slate-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.password}
              </p>
            )}
            {!errors.password && password.length > 0 && (
              <p className="mt-1 text-xs text-slate-400">{t.passwordStrength}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              {t.confirmPasswordLabel}
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onKeyPress={handleKeyPress}
                placeholder={t.confirmPasswordPlaceholder}
                className={`w-full h-12 pl-11 pr-12 border-2 rounded-lg outline-none transition-all text-base placeholder-slate-500 ${
                  errors.confirmPassword 
                    ? 'border-red-500 bg-red-900/20 text-red-400 focus:ring-red-500/50' 
                    : 'border-slate-600 bg-slate-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* General Error Message */}
          {errors.general && (
            <div className="p-3 bg-red-900/30 border-l-4 border-red-500 rounded flex items-start gap-2">
              <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{errors.general}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSigningUp || !isFormValid}
            className={`
              w-full px-6 py-4 rounded-lg font-semibold transition-all duration-300 text-lg
              inline-flex items-center justify-center gap-2
              ${isSigningUp || !isFormValid
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-400 to-green-500 text-slate-900 hover:from-green-300 hover:to-green-400 shadow-xl hover:shadow-2xl hover:scale-105 transform cursor-pointer'
              }
            `}
          >
            {isSigningUp ? t.signingUp : t.signUp}
            {!isSigningUp && <ChevronRight size={20} />}
          </button>
        </div>

        {/* Sign In Link */}
        <div className="text-center text-sm text-slate-400 mt-6">
          {t.alreadyAccount}{' '}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 hover:underline font-semibold transition-colors">
            {t.signIn}
          </Link>
        </div>

        {/* Terms & Privacy */}
        <div className="text-center text-xs text-slate-400 mt-4">
          {t.termsPrefix}{' '}
          <Link to="/terms-of-service" className="text-blue-400 hover:text-blue-300 hover:underline font-semibold transition-colors">
            {t.terms}
          </Link>{' '}
          {t.and}{' '}
          <Link to="/privacy-policy" className="text-blue-400 hover:text-blue-300 hover:underline font-semibold transition-colors">
            {t.privacy}
          </Link>
        </div>

        {/* Why Sign Up Section */}
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700 backdrop-blur-sm">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Shield size={18} className="text-blue-400" />
            {t.whySignUp}
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

export default SignUp;