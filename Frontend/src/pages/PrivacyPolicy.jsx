import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, FileText, AlertCircle, Mail } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import Card from '../components/common/Card';

const PRIVACY_TRANSLATIONS = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated: November 21, 2024',
    intro: 'At Legal Aid Assistant, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.',
    sections: [
      {
        icon: Database,
        title: 'Information We Collect',
        content: [
          'Personal Information: Phone number, name, email address (if provided)',
          'Document Data: Legal documents you upload for analysis',
          'Usage Data: How you interact with our service, pages visited, features used',
          'Device Information: Browser type, operating system, IP address',
          'Analysis Results: AI-generated summaries and recommendations',
        ],
      },
      {
        icon: Lock,
        title: 'How We Use Your Information',
        content: [
          'To provide and maintain our document analysis service',
          'To authenticate and verify your identity',
          'To analyze and process your legal documents using AI',
          'To communicate with you about your account and services',
          'To improve our service and develop new features',
          'To ensure security and prevent fraudulent activity',
        ],
      },
      {
        icon: Shield,
        title: 'Data Security',
        content: [
          'All data is encrypted in transit using SSL/TLS protocols',
          'Documents are encrypted at rest using industry-standard encryption',
          'We implement strict access controls and authentication',
          'Regular security audits and vulnerability assessments',
          'Secure data centers with 24/7 monitoring',
          'Your documents are never shared with third parties without consent',
        ],
      },
      {
        icon: Eye,
        title: 'Data Retention',
        content: [
          'Documents are stored securely for the duration you use our service',
          'You can delete your documents at any time from your account',
          'Upon account deletion, all personal data is permanently removed within 30 days',
          'Backup copies are securely deleted within 90 days',
          'We retain minimal usage logs for security purposes for 12 months',
        ],
      },
      {
        icon: UserCheck,
        title: 'Your Rights',
        content: [
          'Access: Request a copy of your personal data',
          'Correction: Update or correct your information',
          'Deletion: Request deletion of your account and data',
          'Portability: Export your data in a machine-readable format',
          'Objection: Object to certain data processing activities',
          'Withdrawal: Withdraw consent at any time',
        ],
      },
      {
        icon: FileText,
        title: 'Cookies and Tracking',
        content: [
          'We use essential cookies for authentication and security',
          'Analytics cookies to understand how you use our service',
          'You can control cookies through your browser settings',
          'We do not use cookies for advertising purposes',
          'Third-party cookies are limited to essential service providers',
        ],
      },
    ],
    thirdParty: {
      title: 'Third-Party Services',
      content: 'We may use third-party services for AI processing, cloud storage, and analytics. These providers are contractually obligated to protect your data and use it only for specified purposes.',
    },
    children: {
      title: 'Children\'s Privacy',
      content: 'Our service is not intended for users under 18 years of age. We do not knowingly collect information from children.',
    },
    changes: {
      title: 'Changes to This Policy',
      content: 'We may update this Privacy Policy from time to time. We will notify you of any significant changes via email or through the service.',
    },
    contact: {
      title: 'Contact Us',
      content: 'If you have questions about this Privacy Policy, please contact us:',
      email: 'privacy@legalaid.com',
      phone: '+91 123 456 7890',
      address: 'Ashta, Madhya Pradesh, India',
    },
  },
  hi: {
    title: 'गोपनीयता नीति',
    lastUpdated: 'अंतिम अपडेट: 21 नवंबर, 2024',
    intro: 'कानूनी सहायता सहायक में, हम आपकी गोपनीयता को गंभीरता से लेते हैं। यह गोपनीयता नीति बताती है कि जब आप हमारी सेवा का उपयोग करते हैं तो हम आपकी जानकारी कैसे एकत्र करते हैं, उपयोग करते हैं, प्रकट करते हैं और सुरक्षित रखते हैं।',
  },
};

const PrivacyPolicy = () => {
  const { language } = useLanguageStore();
  const t = PRIVACY_TRANSLATIONS[language] || PRIVACY_TRANSLATIONS.en;

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-slate-400 text-lg">{t.lastUpdated}</p>
        </div>

        {/* Introduction */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <p className="text-slate-300 text-lg leading-relaxed">{t.intro}</p>
        </Card>

        {/* Main Sections */}
        <div className="space-y-6">
          {t.sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white pt-2">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <span className="text-blue-400 font-bold text-xl mt-1">•</span>
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
          {/* Third Party Services */}
          <Card className="bg-slate-800 border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">{t.thirdParty.title}</h2>
            <p className="text-slate-300 leading-relaxed">{t.thirdParty.content}</p>
          </Card>

          {/* Children's Privacy */}
          <Card className="bg-slate-800 border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">{t.children.title}</h2>
            <p className="text-slate-300 leading-relaxed">{t.children.content}</p>
          </Card>

          {/* Changes to Policy */}
          <Card className="bg-slate-800 border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">{t.changes.title}</h2>
            <p className="text-slate-300 leading-relaxed">{t.changes.content}</p>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
                <Mail size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white pt-2">{t.contact.title}</h2>
            </div>
            <p className="text-slate-300 mb-4 leading-relaxed">{t.contact.content}</p>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-center gap-2">
                <Mail size={18} className="text-blue-400" />
                <a href={`mailto:${t.contact.email}`} className="text-blue-400 hover:text-blue-300">
                  {t.contact.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <AlertCircle size={18} className="text-blue-400" />
                {t.contact.phone}
              </p>
              <p className="flex items-center gap-2">
                <FileText size={18} className="text-blue-400" />
                {t.contact.address}
              </p>
            </div>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm">
            By using Legal Aid Assistant, you agree to this Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;