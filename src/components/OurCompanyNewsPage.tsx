import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import { CompanyNewsArticle } from '../types/lms';
import {
  Newspaper,
  Calendar,
  Clock,
  ArrowRight,
  X,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface OurCompanyNewsPageProps {
  onBackToOverview?: () => void;
}

export const OurCompanyNewsPage: React.FC<OurCompanyNewsPageProps> = () => {
  const { getPublishedNews } = useLms();
  const publishedNews = getPublishedNews();

  const [selectedArticle, setSelectedArticle] = useState<CompanyNewsArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Derive unique categories from live published news
  const dynamicCategories = [
    'All',
    ...Array.from(new Set(publishedNews.map((n) => n.category))).filter(Boolean),
  ];

  const filteredNews =
    activeCategory === 'All'
      ? publishedNews
      : publishedNews.filter((n) => n.category === activeCategory);

  const featuredArticle =
    publishedNews.find((n) => n.is_featured) || publishedNews[0];
  const secondaryArticles = filteredNews.filter((n) => n.id !== featuredArticle?.id);

  return (
    <div className="py-12 lg:py-16 bg-light-blue-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newspaper Style Masthead Header */}
        <div className="border-b-2 border-[#003366] pb-6 mb-8 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#00529B] uppercase tracking-wider mb-1">
                <Newspaper className="w-4 h-4" />
                <span>Internal Corporate Gazette</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003366] tracking-tight">
                Our Company News
              </h1>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
              <span>KBZLife Internal Edition</span>
              <span className="text-slate-300">·</span>
              <span>Updated in Real-Time</span>
            </div>
          </div>

          {/* Editorial Category Bar */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Categories:
            </span>
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#003366] text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State Check */}
        {filteredNews.length === 0 ? (
          <div className="p-16 text-center bg-white rounded-2xl border border-slate-200 max-w-lg mx-auto">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No company news has been published yet.</h3>
            <p className="text-xs text-slate-500 mt-2">
              Official corporate articles will appear here once approved by Internal Communications.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* FEATURED STORY (Large Editorial Layout) */}
            {featuredArticle && activeCategory === 'All' && (
              <article
                onClick={() => setSelectedArticle(featuredArticle)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#00529B]/30 hover:shadow-md transition-all cursor-pointer group text-left"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  <div className="lg:col-span-7 aspect-16/10 lg:aspect-auto relative overflow-hidden bg-slate-100 min-h-[260px]">
                    <img
                      src={
                        featuredArticle.cover_image_url ||
                        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
                      }
                      alt={featuredArticle.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded bg-[#003366] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                        Featured Story
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="font-semibold text-[#00529B]">{featuredArticle.category}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {featuredArticle.published_at
                            ? new Date(featuredArticle.published_at).toLocaleDateString()
                            : new Date(featuredArticle.created_at).toLocaleDateString()}
                        </span>
                        {featuredArticle.read_time_minutes && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {featuredArticle.read_time_minutes} min read
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="text-xl sm:text-2xl font-extrabold text-[#003366] group-hover:text-[#00529B] transition-colors leading-snug">
                        {featuredArticle.title}
                      </h2>

                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {featuredArticle.summary}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">
                        By {featuredArticle.author_name || 'Corporate Desk'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00529B] group-hover:translate-x-0.5 transition-transform">
                        <span>Read Full Story</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* SECONDARY EDITORIAL ARTICLES GRID */}
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h3 className="text-base font-bold text-[#003366] uppercase tracking-wider">
                  Latest Announcements & Stories
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {secondaryArticles.length} Articles
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {secondaryArticles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-sm hover:border-[#00529B]/30 transition-all flex flex-col justify-between cursor-pointer group text-left"
                  >
                    <div>
                      <div className="aspect-16/10 relative overflow-hidden bg-slate-100">
                        <img
                          src={
                            article.cover_image_url ||
                            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
                          }
                          alt={article.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-0.5 rounded bg-white/90 backdrop-blur-xs text-[#003366] text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {article.published_at
                              ? new Date(article.published_at).toLocaleDateString()
                              : new Date(article.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-slate-900 group-hover:text-[#00529B] transition-colors leading-snug">
                          {article.title}
                        </h4>

                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {article.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 mt-2 flex items-center justify-between text-xs border-t border-slate-100 pt-3">
                      <span className="text-slate-500 text-[11px]">
                        {article.author_name || 'Internal Desk'}
                      </span>
                      <span className="text-[#00529B] font-bold inline-flex items-center gap-1 group-hover:underline">
                        <span>Read</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ARTICLE DETAIL MODAL / READER VIEW */}
        {selectedArticle && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 text-left">
              {/* Modal Top Bar */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#003366] to-[#00529B] text-white flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-sky-200">
                  <Newspaper className="w-4 h-4" />
                  <span>KBZLife Employee Gazette</span>
                  <span>·</span>
                  <span className="font-semibold text-white">{selectedArticle.category}</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Article Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
                <div className="space-y-3">
                  <h1
                    id="article-modal-title"
                    className="text-2xl sm:text-3xl font-extrabold text-[#003366] leading-tight"
                  >
                    {selectedArticle.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1 border-b border-slate-100 pb-4">
                    <span className="font-semibold text-[#00529B] bg-sky-50 px-2.5 py-0.5 rounded-full">
                      {selectedArticle.category}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedArticle.published_at
                        ? new Date(selectedArticle.published_at).toLocaleDateString()
                        : new Date(selectedArticle.created_at).toLocaleDateString()}
                    </span>
                    <span>·</span>
                    <span>By {selectedArticle.author_name || 'Corporate Editorial Board'}</span>
                    {selectedArticle.read_time_minutes && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {selectedArticle.read_time_minutes} min read
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {selectedArticle.cover_image_url && (
                  <div className="rounded-xl overflow-hidden aspect-16/9 bg-slate-100">
                    <img
                      src={selectedArticle.cover_image_url}
                      alt={selectedArticle.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm space-y-4">
                  <p className="font-semibold text-base text-slate-900 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {selectedArticle.summary}
                  </p>

                  {Array.isArray(selectedArticle.content) ? (
                    selectedArticle.content.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{String(selectedArticle.content)}</p>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    KBZLife Insurance · Internal Employee Document
                  </span>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-4 py-2 rounded-xl bg-[#003366] text-white text-xs font-bold hover:bg-[#00529B] transition-colors cursor-pointer"
                  >
                    Close Gazette Reader
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
