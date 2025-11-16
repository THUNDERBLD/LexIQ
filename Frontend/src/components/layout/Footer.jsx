import { Scale, Mail, Phone, MapPin, Heart, ExternalLink } from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';

// Translation object for footer
const FOOTER_TRANSLATIONS = {
  en: {
    tagline: 'Making legal help accessible to everyone',
    quickLinks: 'Quick Links',
    home: 'Home',
    upload: 'Upload Document',
    history: 'My Documents',
    help: 'Help & Support',
    contact: 'Contact Us',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    addressText: 'Ashta, Madhya Pradesh, India',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    disclaimer: 'Disclaimer',
    social: 'Follow Us',
    madeWith: 'Made with',
    forPeople: 'for rural India',
    copyright: '© 2024 Legal Aid Assistant. All rights reserved.',
    disclaimerText: 'This tool provides general legal information only and should not be considered as legal advice. Please consult a qualified lawyer for specific legal matters.',
  },
  hi: {
    tagline: 'सभी के लिए कानूनी मदद सुलभ बनाना',
    quickLinks: 'त्वरित लिंक',
    home: 'होम',
    upload: 'दस्तावेज़ अपलोड करें',
    history: 'मेरे दस्तावेज़',
    help: 'सहायता और समर्थन',
    contact: 'संपर्क करें',
    email: 'ईमेल',
    phone: 'फ़ोन',
    address: 'पता',
    addressText: 'आष्टा, मध्य प्रदेश, भारत',
    legal: 'कानूनी',
    privacy: 'गोपनीयता नीति',
    terms: 'सेवा की शर्तें',
    disclaimer: 'अस्वीकरण',
    social: 'हमें फॉलो करें',
    madeWith: 'बनाया गया',
    forPeople: 'ग्रामीण भारत के लिए',
    copyright: '© 2024 कानूनी सहायता सहायक। सर्वाधिकार सुरक्षित।',
    disclaimerText: 'यह उपकरण केवल सामान्य कानूनी जानकारी प्रदान करता है और इसे कानूनी सलाह नहीं माना जाना चाहिए। विशिष्ट कानूनी मामलों के लिए कृपया एक योग्य वकील से परामर्श लें।',
  },
  mr: {
    tagline: 'प्रत्येकासाठी कायदेशीर मदत सुलभ करणे',
    quickLinks: 'द्रुत दुवे',
    home: 'होम',
    upload: 'दस्तऐवज अपलोड करा',
    history: 'माझे दस्तऐवज',
    help: 'मदत आणि समर्थन',
    contact: 'संपर्क करा',
    email: 'ईमेल',
    phone: 'फोन',
    address: 'पत्ता',
    addressText: 'आष्टा, मध्य प्रदेश, भारत',
    legal: 'कायदेशीर',
    privacy: 'गोपनीयता धोरण',
    terms: 'सेवा अटी',
    disclaimer: 'अस्वीकरण',
    social: 'आम्हाला फॉलो करा',
    madeWith: 'बनवले',
    forPeople: 'ग्रामीण भारतासाठी',
    copyright: '© 2024 कायदेशीर मदत सहाय्यक। सर्व हक्क राखीव।',
    disclaimerText: 'हे साधन फक्त सामान्य कायदेशीर माहिती प्रदान करते आणि याला कायदेशीर सल्ला मानू नये। विशिष्ट कायदेशीर बाबींसाठी कृपया पात्र वकीलाचा सल्ला घ्या।',
  },
};

const Footer = () => {
  const { language } = useLanguageStore();
  const t = FOOTER_TRANSLATIONS[language] || FOOTER_TRANSLATIONS.en;

  const quickLinks = [
    { label: t.home, href: '#home' },
    { label: t.upload, href: '#upload' },
    { label: t.history, href: '#history' },
    { label: t.help, href: '#help' },
  ];

  const legalLinks = [
    { label: t.privacy, href: '#privacy' },
    { label: t.terms, href: '#terms' },
    { label: t.disclaimer, href: '#disclaimer' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Scale size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Legal Aid</h3>
                <p className="text-xs text-gray-400">Assistant</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{t.tagline}</p>
            <div className="flex items-center gap-2 text-sm">
              <span>{t.madeWith}</span>
              <Heart size={16} className="text-red-500 fill-red-500" />
              <span>{t.forPeople}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">{t.quickLinks}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">{t.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">{t.email}</p>
                  <a href="mailto:support@legalaid.com" className="text-sm hover:text-blue-400 transition-colors">
                    support@legalaid.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">{t.phone}</p>
                  <a href="tel:+911234567890" className="text-sm hover:text-blue-400 transition-colors">
                    +91 123 456 7890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">{t.address}</p>
                  <p className="text-sm">{t.addressText}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">{t.legal}</h4>
            <ul className="space-y-2 mb-6">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links - Placeholder */}
            <div>
              <h5 className="text-white font-semibold mb-3 text-sm">{t.social}</h5>
              <div className="flex gap-3">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                    aria-label={social}
                  >
                    <span className="text-xs font-bold uppercase">
                      {social[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="bg-yellow-900 bg-opacity-20 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-sm text-yellow-200 leading-relaxed">
              <strong className="font-semibold">{t.disclaimer}:</strong> {t.disclaimerText}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>{t.copyright}</p>
            <p className="flex items-center gap-2">
              <span>Powered by</span>
              <span className="text-blue-400 font-semibold">AI Technology</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;