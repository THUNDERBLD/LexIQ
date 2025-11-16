import { useState, useRef, useEffect } from 'react';
import { Shield, ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';

// Mock stores for demonstration
const useLanguageStore = () => ({ language: 'en' });
const useAuthStore = () => ({ 
  login: (phone) => console.log('Logged in:', phone) 
});

// Translation object
const OTP_TRANSLATIONS = {
  en: {
    title: 'Enter Verification Code',
    subtitle: 'We sent a 6-digit code to',
    resend: 'Resend Code',
    verify: 'Verify OTP',
    didntReceive: "Didn't receive the code?",
    resendIn: 'Resend in',
    seconds: 'seconds',
    back: 'Back',
    verifying: 'Verifying...',
    success: 'Verified Successfully!',
    error: 'Invalid OTP. Please try again.',
    enterCode: 'Enter 6-digit code',
  },
  hi: {
    title: 'सत्यापन कोड दर्ज करें',
    subtitle: 'हमने 6 अंकों का कोड भेजा है',
    resend: 'कोड फिर से भेजें',
    verify: 'OTP सत्यापित करें',
    didntReceive: 'कोड नहीं मिला?',
    resendIn: 'फिर से भेजें',
    seconds: 'सेकंड में',
    back: 'वापस',
    verifying: 'सत्यापित कर रहे हैं...',
    success: 'सफलतापूर्वक सत्यापित!',
    error: 'अमान्य OTP। कृपया पुनः प्रयास करें।',
    enterCode: '6 अंकों का कोड दर्ज करें',
  },
  mr: {
    title: 'सत्यापन कोड प्रविष्ट करा',
    subtitle: 'आम्ही 6 अंकी कोड पाठवला आहे',
    resend: 'कोड पुन्हा पाठवा',
    verify: 'OTP सत्यापित करा',
    didntReceive: 'कोड मिळाला नाही?',
    resendIn: 'पुन्हा पाठवा',
    seconds: 'सेकंदांत',
    back: 'मागे',
    verifying: 'सत्यापित करत आहे...',
    success: 'यशस्वीरित्या सत्यापित!',
    error: 'अवैध OTP. कृपया पुन्हा प्रयत्न करा.',
    enterCode: '6 अंकी कोड प्रविष्ट करा',
  },
};

const OTPLogin = ({ phoneNumber = '+91 98765 43210', onVerify, onBack, otpLength = 6 }) => {
  const { language } = useLanguageStore();
  const { login } = useAuthStore();
  const t = OTP_TRANSLATIONS[language] || OTP_TRANSLATIONS.en;

  const [otp, setOtp] = useState(new Array(otpLength).fill(''));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  // Timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    setError('');

    // Move to next input
    if (element.value && index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Auto-verify when all digits are entered
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === otpLength) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, otpLength);
    
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp([...newOtp, ...new Array(otpLength - newOtp.length).fill('')]);
      
      // Focus last filled input
      const lastIndex = Math.min(newOtp.length, otpLength - 1);
      inputRefs.current[lastIndex].focus();

      // Auto-verify if complete
      if (newOtp.length === otpLength) {
        handleVerify(pastedData);
      }
    }
  };

  const handleVerify = async (otpValue = otp.join('')) => {
    if (otpValue.length !== otpLength) {
      setError(t.error);
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo: accept any 6-digit code
      if (otpValue.length === otpLength) {
        setIsVerified(true);
        login(phoneNumber);
        
        setTimeout(() => {
          onVerify && onVerify(otpValue);
        }, 1000);
      } else {
        setError(t.error);
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setError(t.error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setCanResend(false);
    setResendTimer(30);
    setOtp(new Array(otpLength).fill(''));
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('OTP resent to:', phoneNumber);
      inputRefs.current[0].focus();
    } catch (err) {
      console.error('Resend error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900 relative overflow-hidden">
      {/* Background decoration - matching home page */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-green-500 to-green-600 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Card */}
      <div className="max-w-md w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl border border-slate-700 p-8 relative z-10">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">{t.back}</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4 shadow-lg">
            <Shield size={36} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text">
            {t.title}
          </h2>
          <p className="text-slate-300 mb-2">
            {t.subtitle}
          </p>
          <p className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {phoneNumber}
          </p>
        </div>

        {isVerified ? (
          /* Success State */
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 animate-bounce shadow-lg">
              <CheckCircle size={48} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">{t.success}</h3>
            <p className="text-slate-300">Redirecting...</p>
          </div>
        ) : (
          <>
            {/* OTP Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-4 text-center">
                {t.enterCode}
              </label>
              <div className="flex justify-center gap-2 md:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    disabled={isVerifying || isVerified}
                    className={`
                      w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold 
                      border-2 rounded-xl outline-none transition-all
                      ${error 
                        ? 'border-red-500 bg-red-900/20 text-red-400' 
                        : digit 
                        ? 'border-blue-500 bg-blue-900/20 text-white shadow-lg shadow-blue-500/20' 
                        : 'border-slate-600 bg-slate-800 text-white'
                      }
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:shadow-lg focus:shadow-blue-500/20
                      disabled:bg-slate-700 disabled:cursor-not-allowed disabled:border-slate-600
                    `}
                  />
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border-l-4 border-red-500 rounded text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Verify Button */}
            <button
              onClick={() => handleVerify()}
              disabled={isVerifying || otp.some(digit => !digit)}
              className={`
                w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 mb-4
                ${isVerifying || otp.some(digit => !digit)
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-400 to-green-500 text-slate-900 hover:from-green-300 hover:to-green-400 shadow-xl hover:shadow-2xl hover:scale-105 transform cursor-pointer'
                }
              `}
            >
              {isVerifying ? t.verifying : t.verify}
            </button>

            {/* Resend Section */}
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-2">{t.didntReceive}</p>
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors group"
                >
                  <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                  {t.resend}
                </button>
              ) : (
                <p className="text-sm text-slate-400">
                  {t.resendIn} <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{resendTimer}</span> {t.seconds}
                </p>
              )}
            </div>
          </>
        )}

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-xs text-slate-400 text-center backdrop-blur-sm">
          🔒 Your information is secure and encrypted
        </div>
      </div>
    </div>
  );
};

export default OTPLogin;