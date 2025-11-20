import React from 'react';
import { FileText, CheckCircle, XCircle, AlertTriangle, Scale, Shield, Users, Gavel } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import Card from '../components/common/Card';

const TERMS_TRANSLATIONS = {
  en: {
    title: 'Terms of Service',
    lastUpdated: 'Last Updated: November 21, 2024',
    intro: 'Welcome to Legal Aid Assistant. By accessing or using our service, you agree to be bound by these Terms of Service. Please read them carefully.',
    sections: [
      {
        icon: FileText,
        title: 'Acceptance of Terms',
        content: [
          'By creating an account or using our service, you accept these terms',
          'You must be at least 18 years old to use this service',
          'You agree to provide accurate and complete information',
          'You are responsible for maintaining the confidentiality of your account',
          'You agree to notify us immediately of any unauthorized access',
        ],
      },
      {
        icon: CheckCircle,
        title: 'Service Description',
        content: [
          'We provide AI-powered legal document analysis and interpretation',
          'Our service offers simplified explanations of legal documents',
          'We provide guidance on next steps for legal matters',
          'The service is available in multiple Indian languages',
          'We support various types of legal documents including land records, FIRs, court notices, etc.',
        ],
      },
      {
        icon: AlertTriangle,
        title: 'Disclaimer of Legal Advice',
        content: [
          'THIS SERVICE DOES NOT PROVIDE LEGAL ADVICE',
          'Our AI analysis is for informational purposes only',
          'We do not replace professional legal consultation',
          'For specific legal matters, always consult a qualified lawyer',
          'We are not responsible for decisions made based on our analysis',
          'Analysis results may contain errors or inaccuracies',
        ],
      },
      {
        icon: Users,
        title: 'User Responsibilities',
        content: [
          'Upload only documents you have the legal right to share',
          'Do not upload documents containing illegal content',
          'Maintain the security and confidentiality of your account',
          'Use the service only for lawful purposes',
          'Do not attempt to circumvent security measures',
          'Do not abuse, harass, or harm other users',
        ],
      },
      {
        icon: Shield,
        title: 'Intellectual Property',
        content: [
          'All content, features, and functionality are owned by Legal Aid Assistant',
          'Our trademarks, logos, and service marks are protected',
          'You retain ownership of documents you upload',
          'You grant us a license to process your documents for analysis',
          'You may not copy, modify, or distribute our software or content',
        ],
      },
      {
        icon: XCircle,
        title: 'Prohibited Activities',
        content: [
          'Violating any applicable laws or regulations',
          'Infringing on intellectual property rights',
          'Uploading malicious code or viruses',
          'Attempting to gain unauthorized access to our systems',
          'Using the service for any commercial purpose without authorization',
          'Reverse engineering or decompiling our software',
        ],
      },
      {
        icon: Gavel,
        title: 'Limitation of Liability',
        content: [
          'We provide the service "AS IS" without warranties of any kind',
          'We are not liable for any damages arising from use of the service',
          'We do not guarantee accuracy, completeness, or reliability of analysis',
          'Our total liability is limited to the amount you paid (if any)',
          'We are not responsible for third-party content or services',
        ],
      },
      {
        icon: Scale,
        title: 'Dispute Resolution',
        content: [
          'Any disputes will be governed by the laws of India',
          'You agree to first attempt to resolve disputes informally',
          'Disputes may be subject to binding arbitration',
          'Courts in Madhya Pradesh, India have exclusive jurisdiction',
          'You waive the right to participate in class action lawsuits',
        ],
      },
    ],
    termination: {
      title: 'Termination',
      content: 'We reserve the right to suspend or terminate your account at any time for violations of these terms. You may also terminate your account at any time. Upon termination, your right to use the service ceases immediately.',
    },
    modifications: {
      title: 'Modifications to Service',
      content: 'We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice. We may also update these terms periodically. Continued use of the service constitutes acceptance of modified terms.',
    },
    contact: {
      title: 'Contact Information',
      content: 'For questions about these Terms of Service, contact us at:',
      email: 'legal@legalaid.com',
      address: 'Legal Aid Assistant, Ashta, Madhya Pradesh, India',
    },
  },
  hi: {
    title: 'सेवा की शर्तें',
    lastUpdated: 'अंतिम अपडेट: 21 नवंबर, 2024',
    intro: 'कानूनी सहायता सहायक में आपका स्वागत है। हमारी सेवा का उपयोग या एक्सेस करके, आप इन सेवा की शर्तों से बंधे होने के लिए सहमत होते हैं। कृपया उन्हें ध्यान से पढ़ें।',
  },
};

const TermsOfService = () => {
  const { language } = useLanguageStore();
  const t = TERMS_TRANSLATIONS[language] || TERMS_TRANSLATIONS.en;

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 rounded-full mb-6">
            <Scale size={40} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-slate-400 text-lg">{t.lastUpdated}</p>
        </div>

        {/* Introduction */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <p className="text-slate-300 text-lg leading-relaxed">{t.intro}</p>
        </Card>

        {/* Important Notice */}
        <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-red-600 p-3 rounded-lg flex-shrink-0">
              <AlertTriangle size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Important Legal Notice</h2>
              <p className="text-red-100 leading-relaxed text-lg">
                This service provides AI-generated document analysis for informational purposes only. 
                <strong className="block mt-2">WE DO NOT PROVIDE LEGAL ADVICE.</strong> 
                Always consult with a qualified lawyer for legal matters affecting your rights.
              </p>
            </div>
          </div>
        </Card>

        {/* Main Sections */}
        <div className="space-y-6">
          {t.sections.map((section, index) => {
            const Icon = section.icon;
            const isWarning = section.icon === AlertTriangle;
            
            return (
              <Card 
                key={index} 
                className={`border-slate-700 hover:bg-slate-750 transition-colors ${
                  isWarning 
                    ? 'bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30' 
                    : 'bg-slate-800'
                }`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-lg flex-shrink-0 ${
                    isWarning ? 'bg-yellow-600' : 'bg-purple-600'
                  }`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white pt-2">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li 
                      key={idx} 
                      className={`flex items-start gap-3 ${
                        isWarning ? 'text-yellow-100' : 'text-slate-300'
                      } ${item.includes('NOT') || item.includes('DO NOT') ? 'font-semibold' : ''}`}
                    >
                      <span className={`font-bold text-xl mt-1 ${
                        isWarning ? 'text-yellow-400' : 'text-purple-400'
                      }`}>
                        {isWarning ? '⚠' : '•'}
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        {/* Additional Sections */}
        <div className="space-y-6 mt-6">
          {/* Termination */}
          <Card className="bg-slate-800 border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">{t.termination.title}</h2>
            <p className="text-slate-300 leading-relaxed">{t.termination.content}</p>
          </Card>

          {/* Modifications */}
          <Card className="bg-slate-800 border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">{t.modifications.title}</h2>
            <p className="text-slate-300 leading-relaxed">{t.modifications.content}</p>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-purple-600 p-3 rounded-lg flex-shrink-0">
                <FileText size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white pt-2">{t.contact.title}</h2>
            </div>
            <p className="text-slate-300 mb-4 leading-relaxed">{t.contact.content}</p>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-center gap-2">
                <span className="text-purple-400">Email:</span>
                <a href={`mailto:${t.contact.email}`} className="text-purple-400 hover:text-purple-300">
                  {t.contact.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-purple-400">Address:</span>
                {t.contact.address}
              </p>
            </div>
          </Card>
        </div>

        {/* Footer Agreement */}
        <div className="mt-10">
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle size={32} className="text-green-400" />
              <h3 className="text-2xl font-bold text-white">Agreement</h3>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed">
              By using Legal Aid Assistant, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms of Service and our Privacy Policy.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;