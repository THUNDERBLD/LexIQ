import { 
  Upload, 
  FileText, 
  Shield, 
  Zap, 
  Globe, 
  Users,
  ChevronRight,
  CheckCircle,
  MessageCircle
} from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Button = ({ children, onClick, icon: Icon, className, variant }) => (
  <button 
    onClick={onClick} 
    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${className}`}
  >
    {children}
    {Icon && <Icon size={20} />}
  </button>
);
const Card = ({ children, className, onClick }) => (
  <div onClick={onClick} className={`rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);

// Translation object
const HOME_TRANSLATIONS = {
  en: {
    hero: {
      title: 'Legal Help for Everyone',
      subtitle: 'Understand your legal documents in simple language with AI assistance',
      getStarted: 'Get Started',
      uploadDoc: 'Upload Document',
      learnMore: 'Learn More',
    },
    features: {
      title: 'How It Works',
      subtitle: 'Simple steps to understand your documents',
      steps: [
        {
          icon: Upload,
          title: 'Upload Document',
          description: 'Upload your legal document - land records, FIR, court notice, or any legal paper',
        },
        {
          icon: Zap,
          title: 'AI Analysis',
          description: 'Our AI reads and analyzes your document in seconds',
        },
        {
          icon: MessageCircle,
          title: 'Get Simple Explanation',
          description: 'Receive easy-to-understand explanation in your language',
        },
        {
          icon: CheckCircle,
          title: 'Know What to Do',
          description: 'Get clear next steps and guidance on your legal matter',
        },
      ],
    },
    benefits: {
      title: 'Why Use Legal Aid Assistant?',
      items: [
        {
          icon: Globe,
          title: 'Multi-Language Support',
          description: 'Available in Hindi, Marathi, English and 5+ Indian languages',
        },
        {
          icon: Shield,
          title: 'Secure & Private',
          description: 'Your documents are encrypted and never shared',
        },
        {
          icon: Zap,
          title: 'Instant Results',
          description: 'Get document analysis in seconds, not days',
        },
        {
          icon: Users,
          title: 'Made for Rural India',
          description: 'Simple interface designed for low-literacy users',
        },
      ],
    },
    documentTypes: {
      title: 'We Support All Legal Documents',
      subtitle: 'Upload any legal document and get help',
    },
    cta: {
      title: 'Ready to Understand Your Documents?',
      subtitle: 'Join thousands of users getting legal clarity',
      button: 'Start Now - It\'s Free',
    },
  },
  hi: {
    hero: {
      title: 'सभी के लिए कानूनी सहायता',
      subtitle: 'AI सहायता के साथ सरल भाषा में अपने कानूनी दस्तावेजों को समझें',
      getStarted: 'शुरू करें',
      uploadDoc: 'दस्तावेज़ अपलोड करें',
      learnMore: 'और जानें',
    },
    features: {
      title: 'यह कैसे काम करता है',
      subtitle: 'अपने दस्तावेजों को समझने के लिए सरल कदम',
      steps: [
        {
          icon: Upload,
          title: 'दस्तावेज़ अपलोड करें',
          description: 'अपना कानूनी दस्तावेज़ अपलोड करें - भूमि रिकॉर्ड, एफआईआर, कोर्ट नोटिस, या कोई भी कानूनी पेपर',
        },
        {
          icon: Zap,
          title: 'AI विश्लेषण',
          description: 'हमारा AI सेकंडों में आपके दस्तावेज़ को पढ़ता और विश्लेषण करता है',
        },
        {
          icon: MessageCircle,
          title: 'सरल स्पष्टीकरण प्राप्त करें',
          description: 'अपनी भाषा में समझने में आसान स्पष्टीकरण प्राप्त करें',
        },
        {
          icon: CheckCircle,
          title: 'जानें कि क्या करना है',
          description: 'अपने कानूनी मामले पर स्पष्ट अगले कदम और मार्गदर्शन प्राप्त करें',
        },
      ],
    },
    benefits: {
      title: 'कानूनी सहायता सहायक का उपयोग क्यों करें?',
      items: [
        {
          icon: Globe,
          title: 'बहु-भाषा समर्थन',
          description: 'हिंदी, मराठी, अंग्रेजी और 5+ भारतीय भाषाओं में उपलब्ध',
        },
        {
          icon: Shield,
          title: 'सुरक्षित और निजी',
          description: 'आपके दस्तावेज़ एन्क्रिप्टेड हैं और कभी साझा नहीं किए जाते',
        },
        {
          icon: Zap,
          title: 'तत्काल परिणाम',
          description: 'दिनों में नहीं, सेकंडों में दस्तावेज़ विश्लेषण प्राप्त करें',
        },
        {
          icon: Users,
          title: 'ग्रामीण भारत के लिए निर्मित',
          description: 'कम साक्षरता वाले उपयोगकर्ताओं के लिए डिज़ाइन किया गया सरल इंटरफ़ेस',
        },
      ],
    },
    documentTypes: {
      title: 'हम सभी कानूनी दस्तावेजों का समर्थन करते हैं',
      subtitle: 'कोई भी कानूनी दस्तावेज़ अपलोड करें और सहायता प्राप्त करें',
    },
    cta: {
      title: 'अपने दस्तावेजों को समझने के लिए तैयार हैं?',
      subtitle: 'कानूनी स्पष्टता प्राप्त करने वाले हजारों उपयोगकर्ताओं में शामिल हों',
      button: 'अभी शुरू करें - यह मुफ़्त है',
    },
  },
  mr: {
    hero: {
      title: 'प्रत्येकासाठी कायदेशीर मदत',
      subtitle: 'AI च्या मदतीने सोप्या भाषेत तुमची कायदेशीर कागदपत्रे समजून घ्या',
      getStarted: 'सुरू करा',
      uploadDoc: 'दस्तऐवज अपलोड करा',
      learnMore: 'अधिक जाणून घ्या',
    },
    features: {
      title: 'हे कसे कार्य करते',
      subtitle: 'तुमची कागदपत्रे समजून घेण्यासाठी सोप्या पायऱ्या',
      steps: [
        {
          icon: Upload,
          title: 'दस्तऐवज अपलोड करा',
          description: 'तुमचे कायदेशीर दस्तऐवज अपलोड करा - जमीन नोंदी, एफआयआर, न्यायालयीन नोटीस किंवा कोणतेही कायदेशीर कागद',
        },
        {
          icon: Zap,
          title: 'AI विश्लेषण',
          description: 'आमचा AI सेकंदात तुमचे दस्तऐवज वाचतो आणि त्याचे विश्लेषण करतो',
        },
        {
          icon: MessageCircle,
          title: 'सोपे स्पष्टीकरण मिळवा',
          description: 'तुमच्या भाषेत समजण्यास सोपे स्पष्टीकरण मिळवा',
        },
        {
          icon: CheckCircle,
          title: 'काय करावे ते जाणून घ्या',
          description: 'तुमच्या कायदेशीर बाबीवर स्पष्ट पुढील पायऱ्या आणि मार्गदर्शन मिळवा',
        },
      ],
    },
    benefits: {
      title: 'कायदेशीर मदत सहाय्यक का वापरावे?',
      items: [
        {
          icon: Globe,
          title: 'बहु-भाषा समर्थन',
          description: 'हिंदी, मराठी, इंग्रजी आणि 5+ भारतीय भाषांमध्ये उपलब्ध',
        },
        {
          icon: Shield,
          title: 'सुरक्षित आणि खाजगी',
          description: 'तुमची कागदपत्रे कूटबद्ध केलेली आहेत आणि कधीही सामायिक केली जात नाहीत',
        },
        {
          icon: Zap,
          title: 'झटपट निकाल',
          description: 'काही दिवसात नाही, तर सेकंदात दस्तऐवज विश्लेषण मिळवा',
        },
        {
          icon: Users,
          title: 'ग्रामीण भारतासाठी बनवलेले',
          description: 'कमी साक्षरता असलेल्या वापरकर्त्यांसाठी डिझाइन केलेले सोपे इंटरफेस',
        },
      ],
    },
    documentTypes: {
      title: 'आम्ही सर्व कायदेशीर कागदपत्रांना समर्थन देतो',
      subtitle: 'कोणतेही कायदेशीर दस्तऐवज अपलोड करा आणि मदत मिळवा',
    },
    cta: {
      title: 'तुमची कायदेशीर कागदपत्रे समजून घेण्यासाठी तयार आहात?',
      subtitle: 'कायदेशीर स्पष्टता मिळविणाऱ्या हजारो वापरकर्त्यांमध्ये सामील व्हा',
      button: 'आता सुरू करा - हे विनामूल्य आहे',
    },
  },
};

const DOCUMENT_TYPES = [
  { icon: '🏡', name: 'Land Records', color: 'from-green-500 to-green-600' },
  { icon: '👮', name: 'FIR / Police Report', color: 'from-red-500 to-red-600' },
  { icon: '🍚', name: 'Ration Card', color: 'from-orange-500 to-orange-600' },
  { icon: '⚖️', name: 'Court Notice', color: 'from-blue-500 to-blue-600' },
  { icon: '✉️', name: 'Legal Message', color: 'from-purple-500 to-purple-600' },
  { icon: '📝', name: 'Agreement', color: 'from-indigo-500 to-indigo-600' },
];

const Home = ({ onNavigate}) => {
  const { language } = useLanguageStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const t = HOME_TRANSLATIONS[language] || HOME_TRANSLATIONS.en;

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/upload');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white py-24 px-4 overflow-hidden rounded-b-2xl">
        {/* Enhanced Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-green-500 to-green-600 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-full mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex gap-4 justify-center w-full mt-6">
              <Button
                onClick={handleGetStarted}
                icon={ChevronRight}
                className="text-lg cursor-pointer button-spacing bg-gradient-to-r from-green-400 to-green-500 text-slate-900 hover:from-green-300 hover:to-green-400 shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                  {t.hero.getStarted}
              </Button>
              <Button
                onClick={() => navigate('/upload')}
                variant="outline"
                icon={Upload}
                className="text-lg cursor-pointer button-spacing border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
              >
                  {t.hero.uploadDoc}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 bg-clip-text">
              {t.features.title}
            </h2>
            <p className="text-xl text-slate-300">{t.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.features.steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="icon-spacing text-center cursor-default bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 group">
                  <div className="inline-flex icon-spacing items-center mt-4 justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon size={36} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-300 leading-relaxed mb-1">{step.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Document Types Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
              {t.documentTypes.title}
            </h2>
            <p className="text-xl text-slate-300">{t.documentTypes.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {DOCUMENT_TYPES.map((doc, index) => (
              <Card 
                key={index} 
                className="text-center icon-spacing2 bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 hover:scale-105 hover:border-slate-500 hover:shadow-xl transition-all duration-300 cursor-pointer p-6 group"
                onClick={handleGetStarted}
              >
                <div className={`text-5xl mb-4 p-4 rounded-full bg-gradient-to-br ${doc.color} bg-opacity-20 inline-block group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {doc.icon}
                </div>
                <p className="text-sm font-semibold text-white">{doc.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 mt-10">
            <h2 className="text-4xl md:text-5xl font-bold icon-spacing2 text-white mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
              {t.benefits.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.benefits.items.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="text-center cursor-default button-spacing bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 border border-slate-600 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 p-6 group">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon size={36} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 rounded-b-md bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl my-10 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            {t.cta.title}
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            {t.cta.subtitle}
          </p>
          <Button
            onClick={handleGetStarted}
            icon={ChevronRight}
            className="text-lg button-spacing cursor-pointer bg-gradient-to-r from-green-400 to-green-500 text-slate-900 hover:from-green-300 hover:to-green-400 shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            {t.cta.button}
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 rounded-2xl">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-lg button-spacing bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
              <p className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent mb-2">10K+</p>
              <p className="text-slate-400">Documents Analyzed</p>
            </div>
            <div className="p-6 rounded-lg button-spacing bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
              <p className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent mb-2">8</p>
              <p className="text-slate-400">Languages Supported</p>
            </div>
            <div className="p-6 rounded-lg button-spacing bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
              <p className="text-5xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent mb-2">95%</p>
              <p className="text-slate-400">Accuracy Rate</p>
            </div>
            <div className="p-6 rounded-lg button-spacing bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
              <p className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent mb-2">24/7</p>
              <p className="text-slate-400">Available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;