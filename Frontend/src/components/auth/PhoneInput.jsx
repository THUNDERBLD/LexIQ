import { useState } from 'react';
import { Phone, Shield, ChevronRight, AlertCircle } from 'lucide-react';

// Mock store for demonstration
const useLanguageStore = () => ({ language: 'en' });

// Translation object
const PHONE_TRANSLATIONS = {
  en: {
    title: 'Welcome to Legal Aid',
    subtitle: 'Enter your phone number to continue',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '10-digit mobile number',
    sendOTP: 'Send OTP',
    sending: 'Sending...',
    termsPrefix: 'By continuing, you agree to our',
    terms: 'Terms of Service',
    and: 'and',
    privacy: 'Privacy Policy',
    whyPhone: 'Why do we need your phone number?',
    reason1: 'To send you verification code',
    reason2: 'To save your documents securely',
    reason3: 'To notify you about important updates',
    error: 'Please enter a valid 10-digit phone number',
    countryCode: '+91',
  },
  hi: {
    title: 'कानूनी सहायता में आपका स्वागत है',
    subtitle: 'जारी रखने के लिए अपना फ़ोन नंबर दर्ज करें',
    phoneLabel: 'फ़ोन नंबर',
    phonePlaceholder: '10 अंकों का मोबाइल नंबर',
    sendOTP: 'OTP भेजें',
    sending: 'भेजा जा रहा है...',
    termsPrefix: 'जारी रखकर, आप हमारी',
    terms: 'सेवा की शर्तों',
    and: 'और',
    privacy: 'गोपनीयता नीति',
    whyPhone: 'हमें आपके फ़ोन नंबर की आवश्यकता क्यों है?',
    reason1: 'आपको सत्यापन कोड भेजने के लिए',
    reason2: 'आपके दस्तावेज़ों को सुरक्षित रूप से सहेजने के लिए',
    reason3: 'आपको महत्वपूर्ण अपडेट के बारे में सूचित करने के लिए',
    error: 'कृपया एक मान्य 10 अंकों का फ़ोन नंबर दर्ज करें',
    countryCode: '+91',
  },
  mr: {
    title: 'कायदेशीर मदतीमध्ये आपले स्वागत आहे',
    subtitle: 'सुरू ठेवण्यासाठी तुमचा फोन नंबर प्रविष्ट करा',
    phoneLabel: 'फोन नंबर',
    phonePlaceholder: '10 अंकी मोबाइल नंबर',
    sendOTP: 'OTP पाठवा',
    sending: 'पाठवत आहे...',
    termsPrefix: 'सुरू ठेवून, तुम्ही आमच्या',
    terms: 'सेवा अटी',
    and: 'आणि',
    privacy: 'गोपनीयता धोरण',
    whyPhone: 'आम्हाला तुमच्या फोन नंबरची आवश्यकता का आहे?',
    reason1: 'तुम्हाला सत्यापन कोड पाठवण्यासाठी',
    reason2: 'तुमचे दस्तऐवज सुरक्षितपणे जतन करण्यासाठी',
    reason3: 'तुम्हाला महत्त्वाच्या अद्यतनांबद्दल सूचित करण्यासाठी',
    error: 'कृपया वैध 10 अंकी फोन नंबर प्रविष्ट करा',
    countryCode: '+91',
  },
};

const PhoneInput = ({ onSubmit, countryCode = '+91' }) => {
  const { language } = useLanguageStore();
  const t = PHONE_TRANSLATIONS[language] || PHONE_TRANSLATIONS.en;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const validatePhone = (phone) => {
    // Indian phone number: 10 digits starting with 6-9
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!validatePhone(phoneNumber)) {
      setError(t.error);
      return;
    }

    setIsSending(true);
    setError('');

    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500));

      const fullNumber = `${countryCode} ${phoneNumber}`;
      console.log('Sending OTP to:', fullNumber);

      // Call parent callback
      onSubmit && onSubmit(fullNumber);
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && phoneNumber.length === 10) {
      handleSubmit();
    }
  };

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
        <div className="text-center mb-8 button-spacing">
          <div className="inline-flex items-center button-spacing justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-slate-300">{t.subtitle}</p>
        </div>

        {/* Phone Input Section */}
        <div className="button-spacing flex flex-col gap-y-5">
          <label className="block text-sm font-semibold text-slate-300 mb-3 margin-side-small">
            {t.phoneLabel}
          </label>
          
          <div className="flex gap-2">
            {/* Country Code */}
            <div className="flex-shrink-0">
              <div className="h-12 px-4 bg-slate-700 button-spacing border-2 border-slate-600 rounded-lg flex items-center justify-center font-semibold text-white shadow-lg">
                {t.countryCode}
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="flex-1 relative">
              
              <input
                type="tel"
                inputMode="numeric"
                value={phoneNumber}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder={t.phonePlaceholder}
                maxLength={10}
                className={`
                  w-full h-12 pl-11 pr-4 border-2 rounded-lg outline-none transition-all button-spacing
                  ${error 
                    ? 'border-red-500 bg-red-900/20 text-red-400 focus:ring-red-500/50' 
                    : 'border-slate-600 bg-slate-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
                  }
                  text-lg font-semibold placeholder-slate-500
                `}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border-l-4 border-red-500 rounded flex items-start gap-2">
              <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSending || phoneNumber.length !== 10}
            className={`
              w-full px-6 py-4 rounded-lg font-semibold transition-all duration-300 text-lg button-spacing
              inline-flex items-center justify-center gap-2
              ${isSending || phoneNumber.length !== 10
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-400 to-green-500 text-slate-900 hover:from-green-300 hover:to-green-400 shadow-xl hover:shadow-2xl hover:scale-105 transform cursor-pointer'
              }
            `}
          >
            {isSending ? t.sending : t.sendOTP}
            {!isSending && <ChevronRight size={20} />}
          </button>
        </div>

        {/* Terms & Privacy */}
        <div className="text-center text-xs text-slate-400 mb-6 button-spacing">
          {t.termsPrefix}{' '}
          <a href="#terms" className="text-blue-400 hover:text-blue-300 hover:underline font-semibold transition-colors">
            {t.terms}
          </a>{' '}
          {t.and}{' '}
          <a href="#privacy" className="text-blue-400 hover:text-blue-300 hover:underline font-semibold transition-colors">
            {t.privacy}
          </a>
        </div>

        {/* Why Phone Number Section */}
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 backdrop-blur-sm button-spacing">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2 button-spacing">
            <Shield size={18} className="text-blue-400" />
            {t.whyPhone}
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2 button-spacing">
              <span className="text-blue-400 font-bold">•</span>
              <span>{t.reason1}</span>
            </li>
            <li className="flex items-start gap-2 button-spacing">
              <span className="text-blue-400 font-bold">•</span>
              <span>{t.reason2}</span>
            </li>
            <li className="flex items-start gap-2 button-spacing">
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

export default PhoneInput;