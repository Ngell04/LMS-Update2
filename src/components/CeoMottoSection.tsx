import React from 'react';
import { Quote, User, Sparkles } from 'lucide-react';
import { CompanyContentData } from '../data/companyContent';
import { ImagePlaceholder } from './ImagePlaceholder';

interface CeoMottoSectionProps {
  content: CompanyContentData['ceoMotto'];
}

export const CeoMottoSection: React.FC<CeoMottoSectionProps> = ({ content }) => {
  return (
    <section
      id="ceo-motto"
      aria-labelledby="ceo-motto-heading"
      className="py-16 lg:py-20 bg-light-blue-pattern border-b border-sky-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00529B] tracking-wider uppercase mb-2">
            <span>Leadership Guidance</span>
          </div>
          <h2
            id="ceo-motto-heading"
            className="text-2xl sm:text-3xl font-extrabold text-[#003366] tracking-tight"
          >
            CEO Motto
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {content.statementContext}
          </p>
        </div>

        {/* Dedicated CEO Motto Layout */}
        <div className="bg-white/95 backdrop-blur-xs rounded-3xl border border-sky-200/90 overflow-hidden shadow-card-elevated hover:shadow-card-hover transition-all">
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            {/* CEO Portrait Column (4 cols on md) */}
            <div className="md:col-span-4 bg-gradient-to-b from-[#E2EFFB] to-[#EDF4FA] flex flex-col justify-center p-6 sm:p-8 border-b md:border-b-0 md:border-r border-sky-200/70">
              <div className="w-full max-w-xs mx-auto">
                <ImagePlaceholder
                  src={content.photoUrl || '/assets/aistudio/CEO_38bdec3d.jpg'}
                  alt={content.ceoName || 'U Han Win Hlaing'}
                  placeholderText={content.photoCaption || 'U Han Win Hlaing, Chief Executive Officer'}
                  aspectRatioClass="aspect-4/5"
                  className="rounded-2xl shadow-sm border border-slate-200/60"
                />

                <div className="mt-4 text-center">
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    {content.ceoName}
                  </h3>
                  <p className="text-xs text-[#00529B] font-semibold mt-0.5">
                    {content.ceoTitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Quotation Panel Column (8 cols on md) */}
            <div className="md:col-span-8 p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative bg-gradient-to-br from-white via-[#FAFCFE] to-[#F4F9FD]">
              {/* Quote Icon watermark subtle accent */}
              <Quote
                className="w-20 h-20 text-[#00529B]/5 absolute top-6 right-6 pointer-events-none"
                aria-hidden="true"
              />

              <div className="space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#003366]/10 text-[#003366] text-xs font-bold shadow-2xs">
                  <Quote className="w-3.5 h-3.5 text-[#00529B]" />
                  <span>Empowering Your Daily Success</span>
                </div>

                <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium text-slate-800 leading-relaxed tracking-tight whitespace-pre-line text-left">
                  {content.motto}
                </blockquote>
              </div>

              {/* Attribution and note */}
              <div className="pt-8 mt-8 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">{content.ceoName}</span>
                  {content.ceoTitle && (
                    <>
                      <span className="text-slate-300">·</span>
                      <span>{content.ceoTitle}</span>
                    </>
                  )}
                </div>
                <div className="text-[11px] text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200">
                  Official Approved Statement
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
