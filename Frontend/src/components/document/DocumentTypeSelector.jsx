import { useState } from 'react';
import { Search, ChevronRight, Info } from 'lucide-react';

import { useLanguageStore } from '../../store/languageStore';

// Document Types Configuration
const DOCUMENT_TYPES = [
  {
    id: 'land',
    icon: '🏡',
    color: 'bg-green-500',
    name: {
      en: 'Land Records',
      hi: 'भूमि रिकॉर्ड',
      mr: 'जमीन नोंदी',
    },
    description: {
      en: 'Property documents, land ownership papers, patta, 7/12 extract',
      hi: 'संपत्ति दस्तावेज़, भूमि स्वामित्व पत्र, पट्टा, 7/12 उद्धरण',
      mr: 'मालमत्ता दस्तऐवज, जमीन मालकी कागदपत्रे, पट्टा, 7/12 उतारा',
    },
  },
  {
    id: 'fir',
    icon: '👮',
    color: 'bg-red-500',
    name: {
      en: 'FIR / Police Report',
      hi: 'एफआईआर / पुलिस रिपोर्ट',
      mr: 'एफआयआर / पोलीस अहवाल',
    },
    description: {
      en: 'First Information Report, police complaints, chargesheet',
      hi: 'प्रथम सूचना रिपोर्ट, पुलिस शिकायत, आरोप पत्र',
      mr: 'प्रथम माहिती अहवाल, पोलीस तक्रार, आरोपपत्र',
    },
  },
  {
    id: 'ration',
    icon: '🍚',
    color: 'bg-orange-500',
    name: {
      en: 'Ration Card',
      hi: 'राशन कार्ड',
      mr: 'शिधापत्रिका',
    },
    description: {
      en: 'Food security card, APL/BPL card, PDS documents',
      hi: 'खाद्य सुरक्षा कार्ड, एपीएल/बीपीएल कार्ड, पीडीएस दस्तावेज',
      mr: 'अन्न सुरक्षा कार्ड, एपीएल/बीपीएल कार्ड, पीडीएस दस्तऐवज',
    },
  },
  {
    id: 'court',
    icon: '⚖️',
    color: 'bg-blue-500',
    name: {
      en: 'Court Notice',
      hi: 'न्यायालय नोटिस',
      mr: 'न्यायालयीन नोटीस',
    },
    description: {
      en: 'Court summons, legal notices, judgments, orders',
      hi: 'अदालती सम्मन, कानूनी नोटिस, निर्णय, आदेश',
      mr: 'न्यायालयीन समन्स, कायदेशीर नोटीस, निर्णय, आदेश',
    },
  },
  {
    id: 'message',
    icon: '✉️',
    color: 'bg-purple-500',
    name: {
      en: 'Legal Message',
      hi: 'कानूनी संदेश',
      mr: 'कायदेशीर संदेश',
    },
    description: {
      en: 'Legal letters, demand notices, threatening messages',
      hi: 'कानूनी पत्र, मांग नोटिस, धमकी भरे संदेश',
      mr: 'कायदेशीर पत्रे, मागणी नोटीस, धमकीचे संदेश',
    },
  },
  {
    id: 'agreement',
    icon: '📝',
    color: 'bg-indigo-500',
    name: {
      en: 'Agreement / Contract',
      hi: 'समझौता / अनुबंध',
      mr: 'करार / संविदा',
    },
    description: {
      en: 'Rent agreements, work contracts, lease documents',
      hi: 'किराया समझौते, काम के अनुबंध, पट्टा दस्तावेज़',
      mr: 'भाडे करार, काम करार, भाडेपट्टा दस्तऐवज',
    },
  },
  {
    id: 'certificate',
    icon: '📜',
    color: 'bg-teal-500',
    name: {
      en: 'Certificate',
      hi: 'प्रमाणपत्र',
      mr: 'प्रमाणपत्र',
    },
    description: {
      en: 'Caste certificate, income certificate, domicile certificate',
      hi: 'जाति प्रमाण पत्र, आय प्रमाण पत्र, निवास प्रमाण पत्र',
      mr: 'जात प्रमाणपत्र, उत्पन्न प्रमाणपत्र, अधिवास प्रमाणपत्र',
    },
  },
  {
    id: 'other',
    icon: '📄',
    color: 'bg-gray-500',
    name: {
      en: 'Other Document',
      hi: 'अन्य दस्तावेज़',
      mr: 'इतर दस्तऐवज',
    },
    description: {
      en: 'Any other legal or government document',
      hi: 'कोई अन्य कानूनी या सरकारी दस्तावेज़',
      mr: 'इतर कोणताही कायदेशीर किंवा सरकारी दस्तऐवज',
    },
  },
];

// Translation object
const SELECTOR_TRANSLATIONS = {
  en: {
    title: 'What type of document do you have?',
    subtitle: 'Select the document type that matches your file',
    searchPlaceholder: 'Search document types...',
    popular: 'Most Common',
    all: 'All Document Types',
    select: 'Select',
  },
  hi: {
    title: 'आपके पास किस प्रकार का दस्तावेज़ है?',
    subtitle: 'अपनी फ़ाइल से मेल खाने वाले दस्तावेज़ प्रकार का चयन करें',
    searchPlaceholder: 'दस्तावेज़ प्रकार खोजें...',
    popular: 'सबसे आम',
    all: 'सभी दस्तावेज़ प्रकार',
    select: 'चुनें',
  },
  mr: {
    title: 'तुमच्याकडे कोणत्या प्रकारचा दस्तऐवज आहे?',
    subtitle: 'तुमच्या फाईलशी जुळणारा दस्तऐवज प्रकार निवडा',
    searchPlaceholder: 'दस्तऐवज प्रकार शोधा...',
    popular: 'सर्वात सामान्य',
    all: 'सर्व दस्तऐवज प्रकार',
    select: 'निवडा',
  },
};

const DocumentTypeCard = ({ docType, language, onSelect, isPopular }) => {
  return (
    <div
      onClick={() => onSelect(docType)}
      className="cursor-pointer transition-all duration-300 hover:scale-105 relative overflow-hidden group bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-blue-500/50 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 p-6"
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute z-50 top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          ⭐ Popular
        </div>
      )}

      <div className="flex flex-col items-center text-center gap-4">
        {/* Icon with glow effect */}
        <div className="relative">
          <div className={`absolute inset-0 ${docType.color} opacity-20 blur-2xl rounded-full`}></div>
          <div 
            className={`
              relative text-6xl p-6 rounded-2xl 
              ${docType.color} bg-opacity-20 
              transition-transform duration-300 
              group-hover:scale-110 group-hover:rotate-6
              border border-slate-600/30
            `}
          >
            {docType.icon}
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-bold text-lg text-white mb-2 group-hover:text-blue-300 transition-colors">
            {docType.name[language] || docType.name.en}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {docType.description[language] || docType.description.en}
          </p>
        </div>

        {/* Select Button */}
        <button
          className={`
            w-full mt-2 py-2.5 px-4 rounded-lg font-semibold 
            flex items-center justify-center gap-2
            bg-slate-700/50 border border-slate-600/50
            text-slate-200
            group-hover:bg-blue-600 group-hover:border-blue-500
            group-hover:text-white
            transition-all duration-300
          `}
        >
          <span className="group-hover:inline">
            {SELECTOR_TRANSLATIONS[language]?.select || SELECTOR_TRANSLATIONS.en.select}
          </span>
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const DocumentTypeSelector = ({ onSelect = () => {} }) => {
  const { language } = useLanguageStore();
  const [searchQuery, setSearchQuery] = useState('');
  const t = SELECTOR_TRANSLATIONS[language] || SELECTOR_TRANSLATIONS.en;

  // Filter document types based on search
  const filteredDocTypes = DOCUMENT_TYPES.filter((type) => {
    const name = type.name[language] || type.name.en;
    const description = type.description[language] || type.description.en;
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Popular document types
  const popularTypes = ['land', 'fir', 'ration', 'court'];
  const popularDocTypes = DOCUMENT_TYPES.filter((type) => popularTypes.includes(type.id));
  const otherDocTypes = DOCUMENT_TYPES.filter((type) => !popularTypes.includes(type.id));

  const displayTypes = searchQuery ? filteredDocTypes : null;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative group">
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
      </div>

      {/* Search Results */}
      {displayTypes ? (
        <div>
          {displayTypes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayTypes.map((docType) => (
                <DocumentTypeCard
                  key={docType.id}
                  docType={docType}
                  language={language}
                  onSelect={onSelect}
                  isPopular={popularTypes.includes(docType.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-full mb-4">
                <Search size={48} className="text-slate-500" />
              </div>
              <p className="text-xl text-slate-300">No document types found</p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Popular Document Types */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-bold text-white">{t.popular}</h3>
              <Info size={20} className="text-blue-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularDocTypes.map((docType) => (
                <DocumentTypeCard
                  key={docType.id}
                  docType={docType}
                  language={language}
                  onSelect={onSelect}
                  isPopular
                />
              ))}
            </div>
          </div>

          {/* All Document Types */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">{t.all}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherDocTypes.map((docType) => (
                <DocumentTypeCard
                  key={docType.id}
                  docType={docType}
                  language={language}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Help Text */}
      <div className="mt-12">
        <div className="max-w-2xl mx-auto bg-blue-900/30 backdrop-blur-sm border-2 border-blue-500/30 rounded-xl p-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
              <Info size={24} className="text-blue-400" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-blue-200 mb-2 text-lg">Not sure which type?</h4>
              <p className="text-sm text-blue-100/80 leading-relaxed">
                Don't worry! Select the closest match. Our AI will analyze your document and 
                provide accurate information regardless of the category you choose.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentTypeSelector;