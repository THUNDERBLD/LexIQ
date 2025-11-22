import React, { useState } from "react";
import { 
  MessageCircle, 
  Send, 
  HelpCircle, 
  Mail, 
  Phone, 
  ChevronDown,
  ChevronUp,
  Search,
  Book,
  Settings,
  Shield,
  Bug,
  Lightbulb,
  Upload,
  FileText,
  Users
} from "lucide-react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const faqs = [
    {
      question: "How do I upload a legal document?",
      answer: "Click on 'Upload Document' in the sidebar or on the home page. Select your PDF, Word, or image file. Our AI will analyze it and provide a simple explanation in minutes."
    },
    {
      question: "What types of documents can I analyze?",
      answer: "You can upload contracts, agreements, court documents, legal notices, terms of service, and any other legal documents in PDF, DOCX, or image formats."
    },
    {
      question: "Is my document information secure?",
      answer: "Yes! All documents are encrypted end-to-end. We use bank-level security and never share your information with third parties."
    },
    {
      question: "How accurate is the AI analysis?",
      answer: "Our AI is trained on thousands of legal documents and provides accurate summaries. However, for critical decisions, we recommend consulting with a licensed attorney."
    },
    {
      question: "Can I save my analyzed documents?",
      answer: "Yes! All your analyzed documents are saved in your account. You can access them anytime from the 'Analysis' section."
    },
    {
      question: "What languages are supported?",
      answer: "Currently, we support English documents. We're working on adding more languages in future updates."
    },
    {
      question: "How long does analysis take?",
      answer: "Most documents are analyzed within 30-60 seconds. Complex or lengthy documents may take up to 2-3 minutes."
    },
    {
      question: "Do I need legal knowledge to use this?",
      answer: "Not at all! Our platform is designed for everyone. We break down complex legal jargon into simple, everyday language."
    }
  ];

  const categories = [
    {
      icon: Upload,
      title: "Uploading Documents",
      description: "Learn how to upload and manage your files",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FileText,
      title: "Document Analysis",
      description: "Understanding your AI-powered analysis",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "How we keep your data safe",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Users,
      title: "Account Management",
      description: "Manage your profile and settings",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support form submitted:", supportForm);
    setSupportForm({ name: "", email: "", subject: "", message: "" });
    alert("Thank you! We'll get back to you within 24 hours.");
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e293b] to-[#334155] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Help & Support</h1>
              <p className="text-blue-200 mt-1">Legal help for everyone</p>
            </div>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl">
            Find answers to common questions or reach out to our support team. We're here to help you understand your legal documents.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search Bar */}
        <div className="mb-16">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Quick Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${category.color} p-4 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                <p className="text-sm text-gray-400">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-medium text-lg pr-4">{faq.question}</span>
                  <div className="bg-white/10 p-2 rounded-lg flex-shrink-0">
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-white" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-white" />
                    )}
                  </div>
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/10">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {filteredFaqs.length === 0 && (
            <div className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <Search className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
              <p className="text-gray-500 text-sm mt-2">Try different keywords or browse categories above</p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Still Need Help?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={supportForm.name}
                    onChange={(e) => setSupportForm({...supportForm, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={supportForm.email}
                    onChange={(e) => setSupportForm({...supportForm, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={supportForm.subject}
                    onChange={(e) => setSupportForm({...supportForm, subject: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="What do you need help with?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={supportForm.message}
                    onChange={(e) => setSupportForm({...supportForm, message: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                    placeholder="Describe your issue in detail..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl inline-block mb-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Email Us</h4>
                <p className="text-sm text-gray-300 mb-1">support@legalaid.com</p>
                <p className="text-xs text-gray-400">Response within 24 hours</p>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl inline-block mb-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Call Us</h4>
                <p className="text-sm text-gray-300 mb-1">+1 (555) 123-4567</p>
                <p className="text-xs text-gray-400">Mon-Fri, 9AM-6PM EST</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl inline-block mb-4">
                  <Book className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Documentation</h4>
                <p className="text-sm text-gray-300 mb-2">Detailed guides and tutorials</p>
                <a href="#" className="text-sm text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
                  View Docs →
                </a>
              </div>

              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-6">
                <Lightbulb className="h-8 w-8 text-yellow-400 mb-3" />
                <h4 className="text-white font-semibold mb-2">Quick Tip</h4>
                <p className="text-sm text-gray-300">
                  Most questions can be answered by searching our FAQs above. Try that first for instant help!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help