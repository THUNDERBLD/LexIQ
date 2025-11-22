import { useState } from 'react';
import { Mail, Lock, Shield, ChevronRight, AlertCircle, Eye, EyeOff, User, Upload, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../../store/authStore';

// Mock store for demonstration
const useLanguageStore = () => ({ language: 'en' });

// Translation object
const SIGNUP_TRANSLATIONS = {
  en: {
    title: 'Join Legal Aid',
    subtitle: 'Create your account to get started',
    backToHome: 'Back to Home',
    usernameLabel: 'Username',
    usernamePlaceholder: 'Choose a username',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter your email',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Create a password',
    avatarLabel: 'Profile Picture',
    avatarPlaceholder: 'Upload your avatar',
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
    usernameError: 'Username must be at least 3 characters',
    emailError: 'Please enter a valid email address',
    passwordError: 'Password must be at least 8 characters',
    avatarError: 'Please upload a profile picture',
    passwordStrength: 'Use at least 8 characters with letters and numbers',
  },
  hi: {
    title: 'कानूनी सहायता में शामिल हों',
    subtitle: 'शुरू करने के लिए अपना खाता बनाएं',
    backToHome: 'होम पर वापस जाएं',
    usernameLabel: 'उपयोगकर्ता नाम',
    usernamePlaceholder: 'एक उपयोगकर्ता नाम चुनें',
    emailLabel: 'ईमेल पता',
    emailPlaceholder: 'अपना ईमेल दर्ज करें',
    passwordLabel: 'पासवर्ड',
    passwordPlaceholder: 'एक पासवर्ड बनाएं',
    avatarLabel: 'प्रोफ़ाइल चित्र',
    avatarPlaceholder: 'अपना अवतार अपलोड करें',
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
    usernameError: 'उपयोगकर्ता नाम कम से कम 3 अक्षर का होना चाहिए',
    emailError: 'कृपया एक मान्य ईमेल पता दर्ज करें',
    passwordError: 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए',
    avatarError: 'कृपया एक प्रोफ़ाइल चित्र अपलोड करें',
    passwordStrength: 'अक्षरों और संख्याओं के साथ कम से कम 8 वर्ण उपयोग करें',
  }
};

const SignUp = ({ onSubmit }) => {
  const { language } = useLanguageStore();
  const t = SIGNUP_TRANSLATIONS[language] || SIGNUP_TRANSLATIONS.en;
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errors, setErrors] = useState({});

  const validateUsername = (username) => {
    return username.trim().length >= 3;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (errors.username) {
      setErrors(prev => ({ ...prev, username: '' }));
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
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      if (errors.avatar) {
        setErrors(prev => ({ ...prev, avatar: '' }));
      }
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};

    // Validate all fields
    if (!validateUsername(username)) {
      newErrors.username = t.usernameError;
    }
    if (!validateEmail(email)) {
      newErrors.email = t.emailError;
    }
    if (!validatePassword(password)) {
      newErrors.password = t.passwordError;
    }
    if (!avatar) {
      newErrors.avatar = t.avatarError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSigningUp(true);
    setErrors({});

    try {
      // Create FormData to send file
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('avatar', avatar);

      // Call backend API using axios
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Registration successful:', response.data);

      // Check if response contains tokens (some backends auto-login after registration)
      if (response.data?.data?.accessToken) {
        const { accessToken, refreshToken, user } = response.data.data;

        // Store tokens in localStorage
        localStorage.setItem('accessToken', accessToken);
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // Update auth store if you have a login method
        if (login && typeof login === 'function') {
          login(user, accessToken);
        }

        // Navigate to dashboard if auto-logged in
        navigate('/dashboard');
      } else {
        // If no tokens, just store user data and navigate to login
        if (response.data?.data) {
          localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        
        // Navigate to login page
        navigate('/login');
      }

      // Call parent callback if provided
      if (onSubmit) {
        onSubmit(response.data.data);
      }
      
    } catch (err) {
      console.error('Error creating account:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create account. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const isFormValid = validateUsername(username) && validateEmail(email) && 
                      validatePassword(password) && avatar;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-green-500 to-green-600 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Back to Home Button - Top Left */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700/80 text-white rounded-lg transition-all duration-300 border border-slate-600 hover:border-slate-500 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">{t.backToHome}</span>
      </Link>

      {/* Card */}
      <div className="max-w-lg w-full bg-gradient-to-br my-6 from-slate-800 to-slate-900 rounded-xl shadow-2xl border border-slate-700 p-8 relative z-10 mx-4">
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
          {/* Avatar Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              {t.avatarLabel}
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border-2 border-slate-600">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                ) : (
                  <User size={32} className="text-slate-400" />
                )}
              </div>
              <label className="flex-1 cursor-pointer">
                <div className={`flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg transition-all ${
                  errors.avatar 
                    ? 'border-red-500 bg-red-900/20 text-red-400' 
                    : 'border-slate-600 bg-slate-800 text-slate-300 hover:border-blue-500'
                }`}>
                  <Upload size={18} />
                  <span className="text-sm truncate">{avatar ? avatar.name : t.avatarPlaceholder}</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            {errors.avatar && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.avatar}
              </p>
            )}
          </div>

          {/* Username Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              {t.usernameLabel}
            </label>
            <div className="relative">
              <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                onKeyPress={handleKeyPress}
                placeholder={t.usernamePlaceholder}
                className={`w-full h-12 pl-11 pr-4 border-2 rounded-lg outline-none transition-all text-base placeholder-slate-500 ${
                  errors.username 
                    ? 'border-red-500 bg-red-900/20 text-red-400 focus:ring-red-500/50' 
                    : 'border-slate-600 bg-slate-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
                }`}
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.username}
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