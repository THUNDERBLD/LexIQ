/**
 * Document Types Configuration
 * Defines all supported legal document types with metadata
 */

export const DOCUMENT_TYPES = {
  LAND: {
    id: 'land',
    icon: '🏡',
    color: 'bg-green-500',
    name: {
      en: 'Land Records',
      hi: 'भूमि रिकॉर्ड',
      mr: 'जमीन नोंदी',
      gu: 'જમીન રેકોર્ડ',
      ta: 'நில பதிவுகள்',
      te: 'భూమి రికార్డులు',
      kn: 'ಭೂಮಿ ದಾಖಲೆಗಳು',
      bn: 'ভূমি রেকর্ড',
    },
    description: {
      en: 'Property documents, land ownership papers, patta, 7/12 extract, revenue records',
      hi: 'संपत्ति दस्तावेज़, भूमि स्वामित्व पत्र, पट्टा, 7/12 उद्धरण, राजस्व रिकॉर्ड',
      mr: 'मालमत्ता दस्तऐवज, जमीन मालकी कागदपत्रे, पट्टा, 7/12 उतारा, महसूल नोंदी',
    },
    keywords: ['land', 'property', 'patta', '7/12', 'khata', 'ownership', 'revenue'],
    commonIssues: ['ownership disputes', 'boundary issues', 'inheritance', 'registration'],
  },

  FIR: {
    id: 'fir',
    icon: '👮',
    color: 'bg-red-500',
    name: {
      en: 'FIR / Police Report',
      hi: 'एफआईआर / पुलिस रिपोर्ट',
      mr: 'एफआयआर / पोलीस अहवाल',
      gu: 'એફઆઈઆર / પોલીસ રિપોર્ટ',
      ta: 'எஃப்ஐஆர் / காவல்துறை அறிக்கை',
      te: 'ఎఫ్‌ఐఆర్ / పోలీస్ నివేదిక',
      kn: 'ಎಫ್‌ಐಆರ್ / ಪೊಲೀಸ್ ವರದಿ',
      bn: 'এফআইআর / পুলিশ রিপোর্ট',
    },
    description: {
      en: 'First Information Report, police complaints, chargesheet, investigation reports',
      hi: 'प्रथम सूचना रिपोर्ट, पुलिस शिकायत, आरोप पत्र, जांच रिपोर्ट',
      mr: 'प्रथम माहिती अहवाल, पोलीस तक्रार, आरोपपत्र, तपास अहवाल',
    },
    keywords: ['FIR', 'police', 'complaint', 'crime', 'chargesheet', 'investigation'],
    commonIssues: ['case status', 'legal rights', 'bail', 'court proceedings'],
  },

  RATION: {
    id: 'ration',
    icon: '🍚',
    color: 'bg-orange-500',
    name: {
      en: 'Ration Card',
      hi: 'राशन कार्ड',
      mr: 'शिधापत्रिका',
      gu: 'રાશન કાર્ડ',
      ta: 'ரேஷன் அட்டை',
      te: 'రేషన్ కార్డు',
      kn: 'ರೇಷನ್ ಕಾರ್ಡ್',
      bn: 'রেশন কার্ড',
    },
    description: {
      en: 'Food security card, APL/BPL card, PDS documents, entitlement card',
      hi: 'खाद्य सुरक्षा कार्ड, एपीएल/बीपीएल कार्ड, पीडीएस दस्तावेज, पात्रता कार्ड',
      mr: 'अन्न सुरक्षा कार्ड, एपीएल/बीपीएल कार्ड, पीडीएस दस्तऐवज, पात्रता कार्ड',
    },
    keywords: ['ration', 'food', 'APL', 'BPL', 'PDS', 'entitlement'],
    commonIssues: ['card renewal', 'name addition', 'address change', 'eligibility'],
  },

  COURT: {
    id: 'court',
    icon: '⚖️',
    color: 'bg-blue-500',
    name: {
      en: 'Court Notice',
      hi: 'न्यायालय नोटिस',
      mr: 'न्यायालयीन नोटीस',
      gu: 'કોર્ટ નોટિસ',
      ta: 'நீதிமன்ற அறிவிப்பு',
      te: 'కోర్టు నోటీసు',
      kn: 'ನ್ಯಾಯಾಲಯ ನೋಟೀಸ್',
      bn: 'আদালত নোটিশ',
    },
    description: {
      en: 'Court summons, legal notices, judgments, orders, hearing dates',
      hi: 'अदालती सम्मन, कानूनी नोटिस, निर्णय, आदेश, सुनवाई की तारीखें',
      mr: 'न्यायालयीन समन्स, कायदेशीर नोटीस, निर्णय, आदेश, सुनावणी तारखा',
    },
    keywords: ['court', 'summons', 'notice', 'judgment', 'hearing', 'order'],
    commonIssues: ['appearance date', 'legal response', 'case status', 'lawyer consultation'],
  },

  MESSAGE: {
    id: 'message',
    icon: '✉️',
    color: 'bg-purple-500',
    name: {
      en: 'Legal Message',
      hi: 'कानूनी संदेश',
      mr: 'कायदेशीर संदेश',
      gu: 'કાનૂની સંદેશ',
      ta: 'சட்ட செய்தி',
      te: 'న్యాయ సందేశం',
      kn: 'ಕಾನೂನು ಸಂದೇಶ',
      bn: 'আইনি বার্তা',
    },
    description: {
      en: 'Legal letters, demand notices, threatening messages, warning letters',
      hi: 'कानूनी पत्र, मांग नोटिस, धमकी भरे संदेश, चेतावनी पत्र',
      mr: 'कायदेशीर पत्रे, मागणी नोटीस, धमकीचे संदेश, चेतावणी पत्रे',
    },
    keywords: ['letter', 'notice', 'demand', 'warning', 'legal communication'],
    commonIssues: ['response requirement', 'legal validity', 'action needed'],
  },

  AGREEMENT: {
    id: 'agreement',
    icon: '📝',
    color: 'bg-indigo-500',
    name: {
      en: 'Agreement / Contract',
      hi: 'समझौता / अनुबंध',
      mr: 'करार / संविदा',
      gu: 'કરાર / કોન્ટ્રાક્ટ',
      ta: 'ஒப்பந்தம் / ஒப்பந்தம்',
      te: 'ఒప్పందం / ఒప్పందం',
      kn: 'ಒಪ್ಪಂದ / ಒಪ್ಪಂದ',
      bn: 'চুক্তি / চুক্তি',
    },
    description: {
      en: 'Rent agreements, work contracts, lease documents, sale agreements',
      hi: 'किराया समझौते, काम के अनुबंध, पट्टा दस्तावेज़, बिक्री समझौते',
      mr: 'भाडे करार, काम करार, भाडेपट्टा दस्तऐवज, विक्री करार',
    },
    keywords: ['agreement', 'contract', 'lease', 'rent', 'sale', 'terms'],
    commonIssues: ['breach', 'termination', 'renewal', 'dispute resolution'],
  },

  CERTIFICATE: {
    id: 'certificate',
    icon: '📜',
    color: 'bg-teal-500',
    name: {
      en: 'Certificate',
      hi: 'प्रमाणपत्र',
      mr: 'प्रमाणपत्र',
      gu: 'પ્રમાણપત્ર',
      ta: 'சான்றிதழ்',
      te: 'ప్రమాణపత్రం',
      kn: 'ಪ್ರಮಾಣಪತ್ರ',
      bn: 'সার্টিফিকেট',
    },
    description: {
      en: 'Caste certificate, income certificate, domicile certificate, residence proof',
      hi: 'जाति प्रमाण पत्र, आय प्रमाण पत्र, निवास प्रमाण पत्र, निवास प्रमाण',
      mr: 'जात प्रमाणपत्र, उत्पन्न प्रमाणपत्र, अधिवास प्रमाणपत्र, निवास पुरावा',
    },
    keywords: ['certificate', 'caste', 'income', 'domicile', 'residence', 'proof'],
    commonIssues: ['application', 'renewal', 'correction', 'verification'],
  },

  WILL: {
    id: 'will',
    icon: '📋',
    color: 'bg-pink-500',
    name: {
      en: 'Will / Testament',
      hi: 'वसीयत',
      mr: 'मृत्युपत्र',
      gu: 'વસિયતનામું',
      ta: 'உயில்',
      te: 'వీలునామా',
      kn: 'ಉಯಿಲು',
      bn: 'উইল',
    },
    description: {
      en: 'Last will, testament, inheritance documents, succession certificates',
      hi: 'अंतिम वसीयत, उत्तराधिकार दस्तावेज, उत्तराधिकार प्रमाण पत्र',
      mr: 'शेवटचे मृत्युपत्र, वारसा दस्तऐवज, वारसा प्रमाणपत्र',
    },
    keywords: ['will', 'testament', 'inheritance', 'succession', 'property'],
    commonIssues: ['validity', 'execution', 'probate', 'disputes'],
  },

  OTHER: {
    id: 'other',
    icon: '📄',
    color: 'bg-gray-500',
    name: {
      en: 'Other Document',
      hi: 'अन्य दस्तावेज़',
      mr: 'इतर दस्तऐवज',
      gu: 'અન્ય દસ્તાવેજ',
      ta: 'பிற ஆவணம்',
      te: 'ఇతర పత్రం',
      kn: 'ಇತರ ದಾಖಲೆ',
      bn: 'অন্যান্য নথি',
    },
    description: {
      en: 'Any other legal or government document not listed above',
      hi: 'ऊपर सूचीबद्ध नहीं कोई अन्य कानूनी या सरकारी दस्तावेज़',
      mr: 'वर सूचीबद्ध नसलेले इतर कोणतेही कायदेशीर किंवा सरकारी दस्तऐवज',
    },
    keywords: ['document', 'legal', 'government', 'official'],
    commonIssues: ['general inquiry', 'document verification'],
  },
};

/**
 * Get document type by ID
 * @param {string} id - Document type ID
 * @returns {object|null} Document type object
 */
export const getDocumentTypeById = (id) => {
  return Object.values(DOCUMENT_TYPES).find((type) => type.id === id) || null;
};

/**
 * Get all document types as array
 * @returns {array} Array of document types
 */
export const getAllDocumentTypes = () => {
  return Object.values(DOCUMENT_TYPES);
};

/**
 * Get document type name in specific language
 * @param {string} id - Document type ID
 * @param {string} language - Language code
 * @returns {string} Document type name
 */
export const getDocumentTypeName = (id, language = 'en') => {
  const docType = getDocumentTypeById(id);
  return docType?.name[language] || docType?.name.en || 'Unknown';
};

/**
 * Get document type description in specific language
 * @param {string} id - Document type ID
 * @param {string} language - Language code
 * @returns {string} Document type description
 */
export const getDocumentTypeDescription = (id, language = 'en') => {
  const docType = getDocumentTypeById(id);
  return docType?.description[language] || docType?.description.en || '';
};

/**
 * Search document types by keyword
 * @param {string} keyword - Search keyword
 * @param {string} language - Language code
 * @returns {array} Matching document types
 */
export const searchDocumentTypes = (keyword, language = 'en') => {
  const lowerKeyword = keyword.toLowerCase();
  return getAllDocumentTypes().filter((type) => {
    const name = type.name[language]?.toLowerCase() || '';
    const description = type.description[language]?.toLowerCase() || '';
    const keywords = type.keywords.join(' ').toLowerCase();
    
    return (
      name.includes(lowerKeyword) ||
      description.includes(lowerKeyword) ||
      keywords.includes(lowerKeyword)
    );
  });
};

/**
 * Get popular document types (commonly used)
 * @returns {array} Popular document types
 */
export const getPopularDocumentTypes = () => {
  const popularIds = ['land', 'fir', 'ration', 'court'];
  return popularIds.map((id) => getDocumentTypeById(id)).filter(Boolean);
};

/**
 * Get document type color class
 * @param {string} id - Document type ID
 * @returns {string} Tailwind color class
 */
export const getDocumentTypeColor = (id) => {
  const docType = getDocumentTypeById(id);
  return docType?.color || 'bg-gray-500';
};

/**
 * Get document type icon
 * @param {string} id - Document type ID
 * @returns {string} Document type icon emoji
 */
export const getDocumentTypeIcon = (id) => {
  const docType = getDocumentTypeById(id);
  return docType?.icon || '📄';
};

export default {
  DOCUMENT_TYPES,
  getDocumentTypeById,
  getAllDocumentTypes,
  getDocumentTypeName,
  getDocumentTypeDescription,
  searchDocumentTypes,
  getPopularDocumentTypes,
  getDocumentTypeColor,
  getDocumentTypeIcon,
};