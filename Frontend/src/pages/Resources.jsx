import { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Scale, 
  Users, 
  Phone, 
  Globe,
  Download,
  ExternalLink,
  Search,
  Filter,
  ChevronRight,
  Info,
  Youtube,
  MessageCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../store/languageStore';
import { LEGAL_GUIDES, VIDEO_TUTORIALS, LEGAL_AID_SERVICES, FAQ_ITEMS } from '../utils/resourcesData';

// Translation object
const RESOURCES_TRANSLATIONS = {
  en: {
    title: 'Legal Resources',
    subtitle: 'Access helpful legal information, guides, and support services',
    searchPlaceholder: 'Search resources...',
    filterAll: 'All Resources',
    quickLinks: 'Quick Links',
    legalGuides: 'Legal Guides',
    legalGuidesDesc: 'Step-by-step guides for common legal procedures',
    videoTutorials: 'Video Tutorials',
    videoTutorialsDesc: 'Watch and learn about legal processes',
    legalAid: 'Legal Aid Services',
    legalAidDesc: 'Find free legal assistance in your area',
    faq: 'Frequently Asked Questions',
    faqDesc: 'Common questions and answers',
    emergency: 'Emergency Contacts',
    emergencyDesc: 'Important legal helpline numbers',
    downloadGuide: 'Download Guide',
    readMore: 'Read More',
    watchVideo: 'Watch Video',
    contact: 'Contact',
    viewAll: 'View All',
    categories: {
      land: 'Land & Property',
      criminal: 'Criminal Law',
      family: 'Family Law',
      consumer: 'Consumer Rights',
      labor: 'Labor Rights',
      government: 'Government Services'
    }
  },
  hi: {
    title: 'कानूनी संसाधन',
    subtitle: 'सहायक कानूनी जानकारी, गाइड और सहायता सेवाओं तक पहुंचें',
    searchPlaceholder: 'संसाधन खोजें...',
    filterAll: 'सभी संसाधन',
    quickLinks: 'त्वरित लिंक',
    legalGuides: 'कानूनी गाइड',
    legalGuidesDesc: 'सामान्य कानूनी प्रक्रियाओं के लिए चरण-दर-चरण गाइड',
    videoTutorials: 'वीडियो ट्यूटोरियल',
    videoTutorialsDesc: 'कानूनी प्रक्रियाओं के बारे में देखें और सीखें',
    legalAid: 'कानूनी सहायता सेवाएं',
    legalAidDesc: 'अपने क्षेत्र में मुफ्त कानूनी सहायता खोजें',
    faq: 'अक्सर पूछे जाने वाले प्रश्न',
    faqDesc: 'सामान्य प्रश्न और उत्तर',
    emergency: 'आपातकालीन संपर्क',
    emergencyDesc: 'महत्वपूर्ण कानूनी हेल्पलाइन नंबर',
    downloadGuide: 'गाइड डाउनलोड करें',
    readMore: 'और पढ़ें',
    watchVideo: 'वीडियो देखें',
    contact: 'संपर्क करें',
    viewAll: 'सभी देखें',
    categories: {
      land: 'भूमि और संपत्ति',
      criminal: 'आपराधिक कानून',
      family: 'पारिवारिक कानून',
      consumer: 'उपभोक्ता अधिकार',
      labor: 'श्रम अधिकार',
      government: 'सरकारी सेवाएं'
    }
  },
  mr: {
    title: 'कायदेशीर संसाधने',
    subtitle: 'उपयुक्त कायदेशीर माहिती, मार्गदर्शक आणि समर्थन सेवांमध्ये प्रवेश करा',
    searchPlaceholder: 'संसाधने शोधा...',
    filterAll: 'सर्व संसाधने',
    quickLinks: 'द्रुत दुवे',
    legalGuides: 'कायदेशीर मार्गदर्शक',
    legalGuidesDesc: 'सामान्य कायदेशीर प्रक्रियांसाठी चरण-दर-चरण मार्गदर्शक',
    videoTutorials: 'व्हिडिओ ट्यूटोरियल',
    videoTutorialsDesc: 'कायदेशीर प्रक्रियांबद्दल पहा आणि शिका',
    legalAid: 'कायदेशीर मदत सेवा',
    legalAidDesc: 'तुमच्या क्षेत्रात मोफत कायदेशीर मदत शोधा',
    faq: 'वारंवार विचारले जाणारे प्रश्न',
    faqDesc: 'सामान्य प्रश्न आणि उत्तरे',
    emergency: 'आपत्कालीन संपर्क',
    emergencyDesc: 'महत्त्वाचे कायदेशीर हेल्पलाइन क्रमांक',
    downloadGuide: 'मार्गदर्शक डाउनलोड करा',
    readMore: 'अधिक वाचा',
    watchVideo: 'व्हिडिओ पहा',
    contact: 'संपर्क',
    viewAll: 'सर्व पहा',
    categories: {
      land: 'जमीन आणि मालमत्ता',
      criminal: 'गुन्हेगारी कायदा',
      family: 'कौटुंबिक कायदा',
      consumer: 'ग्राहक हक्क',
      labor: 'कामगार हक्क',
      government: 'सरकारी सेवा'
    }
  }
};



const Resources = () => {
  const { language } = useLanguageStore();
  const t = RESOURCES_TRANSLATIONS[language] || RESOURCES_TRANSLATIONS.en;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'all', label: t.filterAll, icon: Filter },
    { id: 'land', label: t.categories.land, icon: FileText },
    { id: 'criminal', label: t.categories.criminal, icon: Scale },
    { id: 'consumer', label: t.categories.consumer, icon: Users },
    { id: 'labor', label: t.categories.labor, icon: Users },
    { id: 'government', label: t.categories.government, icon: Globe }
  ];

  const filteredGuides = LEGAL_GUIDES.filter(guide => 
    (selectedCategory === 'all' || guide.category === selectedCategory) &&
    (searchQuery === '' || guide.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/20 rounded-full mb-4 relative border-2 border-blue-500/30">
            <BookOpen size={40} className="text-blue-400" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 relative">
            {t.title}
          </h1>
          <p className="text-blue-200/80 text-lg md:text-xl relative max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          
          {/* Decorative line */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded"></div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-10">
          <div className="max-w-2xl mx-auto mb-6 relative group">
            <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-xl group-hover:bg-blue-500/30 transition-all"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 z-10" size={24} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 text-lg bg-slate-800/60 backdrop-blur-sm border-2 border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-lg text-white placeholder-slate-400 transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                    ${selectedCategory === category.id
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60 border border-slate-700/50'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span className="text-sm">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Legal Guides Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                <FileText className="text-blue-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{t.legalGuides}</h2>
                <p className="text-blue-200/70 text-sm">{t.legalGuidesDesc}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGuides.map((guide) => (
              <div
                key={guide.id}
                className="group bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-blue-500/50 p-6 transition-all hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`text-4xl p-3 rounded-lg ${guide.color} bg-opacity-20 border border-slate-600/30`}>
                    {guide.icon}
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded">
                    {guide.readTime}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-slate-300 mb-4 line-clamp-2">
                  {guide.description}
                </p>

                <div className="flex gap-2">
                  <a 
                    href={guide.downloadUrl}
                    download
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-medium transition-all"
                  >
                    <Download size={16} />
                    {t.downloadGuide}
                  </a>
                  <Link 
                    to={`/resources/guide/${guide.id}`}
                    className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white transition-all"
                  >
                    <ExternalLink size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Tutorials Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30">
                <Youtube className="text-red-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{t.videoTutorials}</h2>
                <p className="text-blue-200/70 text-sm">{t.videoTutorialsDesc}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDEO_TUTORIALS.map((video) => (
              <div
                key={video.id}
                className="group bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-red-500/50 overflow-hidden transition-all hover:shadow-2xl hover:shadow-red-500/20"
              >
                <div className="relative aspect-video bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-6xl">
                  {video.thumbnail}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-500/90 group-hover:bg-red-500 rounded-full flex items-center justify-center transition-all group-hover:scale-110">
                      <ChevronRight size={32} className="text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-white text-xs font-semibold">
                    {video.duration}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-red-300 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-slate-400">{video.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Aid Services */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                <Users className="text-green-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{t.legalAid}</h2>
                <p className="text-blue-200/70 text-sm">{t.legalAidDesc}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEGAL_AID_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-green-500/50 p-6 transition-all hover:shadow-xl"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-green-500/30">
                      <Icon className="text-green-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">{service.name}</h3>
                      <p className="text-sm text-slate-300">{service.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href={`tel:${service.phone}`}
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    >
                      <Phone size={16} />
                      {service.phone}
                    </a>
                    <a
                      href={service.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    >
                      <Globe size={16} />
                      Visit Website
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                <MessageCircle className="text-purple-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{t.faq}</h2>
                <p className="text-blue-200/70 text-sm">{t.faqDesc}</p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ITEMS.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-700/30 transition-all"
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  <ChevronRight
                    size={20}
                    className={`text-blue-400 flex-shrink-0 transition-transform ${
                      expandedFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-700/50 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Help Banner */}
        <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 backdrop-blur-sm border-2 border-red-500/30 rounded-xl p-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-red-500/30">
              <AlertCircle className="text-red-400" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg mb-2">{t.emergency}</h3>
              <p className="text-red-100/80 mb-4">{t.emergencyDesc}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:100"
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold transition-all"
                >
                  <Phone size={18} />
                  Police: 100
                </a>
                <a
                  href="tel:1800-11-3988"
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold transition-all"
                >
                  <Phone size={18} />
                  Legal Aid: 1800-11-3988
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="mt-8 flex justify-center gap-2 opacity-30">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Resources;