import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  Info, 
  AlertCircle,
  Clock,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { LEGAL_GUIDES } from '../utils/resourcesData';

const GuideDetail = () => {
  const { id } = useParams();
  const { language } = useLanguageStore();
  const guide = LEGAL_GUIDES.find(g => g.id === parseInt(id));

  if (!guide) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-white mb-4">Guide Not Found</h1>
        <Link to="/resources" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
          <ArrowLeft size={20} />
          Back to Resources
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <Link 
          to="/resources" 
          className="inline-flex items-center gap-2 text-blue-300 hover:text-white mb-8 transition-colors group"
        >
          <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all">
            <ArrowLeft size={20} />
          </div>
          <span className="font-medium">Back to Resources</span>
        </Link>

        {/* Hero Section */}
        <div className="bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 md:p-12 mb-8 border border-slate-700/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <div className={`text-6xl md:text-7xl p-6 rounded-2xl ${guide.color} bg-opacity-20 border border-slate-600/30 flex-shrink-0`}>
              {guide.icon}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold border border-blue-500/30">
                  {guide.category.toUpperCase()}
                </span>
                <span className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm font-semibold border border-slate-600/30 flex items-center gap-1">
                  <Clock size={14} />
                  {guide.readTime}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {guide.title}
              </h1>
              
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl">
                {guide.fullDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Steps */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <BookOpen className="text-green-400" size={24} />
                </div>
                Step-by-Step Procedure
              </h2>
              
              <div className="space-y-6">
                {guide.steps.map((step, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center font-bold border border-blue-500/30 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      {index + 1}
                    </div>
                    <p className="text-slate-300 text-lg pt-0.5 leading-relaxed group-hover:text-white transition-colors">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expert Tips */}
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-3xl p-8 border border-blue-500/30">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-500/40 rounded-lg">
                  <Info className="text-white" size={24} />
                </div>
                Expert Tips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guide.expertTips.map((tip, index) => (
                  <div key={index} className="bg-black/20 rounded-xl p-4 border border-white/5 flex gap-3">
                    <ChevronRight className="text-blue-400 flex-shrink-0 mt-1" size={18} />
                    <p className="text-sm text-slate-200">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Documents & Actions */}
          <div className="space-y-8">
            {/* Required Documents */}
            <div className="bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-green-400" size={24} />
                Documents Required
              </h2>
              <ul className="space-y-4">
                {guide.requiredDocuments.map((doc, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-slate-900/40 rounded-xl border border-slate-700/50">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2.5"></div>
                    <span className="text-slate-300 text-sm leading-snug">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warning Section */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="text-red-400" size={20} />
                <h3 className="font-bold text-red-300 text-sm uppercase tracking-wider">Warning</h3>
              </div>
              <p className="text-red-100/70 text-sm italic">
                This guide provides general information only and does not constitute legal advice. Requirements may vary slightly between different states.
              </p>
            </div>

            {/* Download Action */}
            <div className="bg-blue-600 rounded-3xl p-8 shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
              <div className="relative text-center">
                <Download className="mx-auto mb-4 text-white animate-bounce" size={48} />
                <h2 className="text-xl font-bold text-white mb-2">Ready to Start?</h2>
                <p className="text-blue-100/80 mb-6 text-sm">
                  Download the complete PDF guide for offline reference.
                </p>
                <a 
                  href={guide.downloadUrl}
                  download
                  className="block w-full py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all hover:scale-[1.02] shadow-xl"
                >
                  Download Guide PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideDetail;
