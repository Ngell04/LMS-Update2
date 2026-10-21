import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Shield,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  Newspaper,
  Film,
  Award,
  Building2,
  Check,
  User,
  LogOut,
} from 'lucide-react';

import { useLms } from '../context/LmsContext';
import { LearnerProfileModal } from './learner/LearnerProfileModal';

export type NavTabId = 'our-company' | 'product-knowledge' | 'learning-dev' | 'hr-hub';
export type OurCompanySubpage = 'overview' | 'news' | 'videos' | 'top-performers';

export interface NavItem {
  id: NavTabId;
  label: string;
  isReady: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'our-company', label: 'Our Company', isReady: true },
  { id: 'learning-dev', label: 'Learning & Development Hub', isReady: true },
  { id: 'product-knowledge', label: 'Product Knowledge Hub', isReady: true },
  { id: 'hr-hub', label: 'HR Hub', isReady: false },
];

export const OUR_COMPANY_DROPDOWN_ITEMS: {
  id: OurCompanySubpage;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    id: 'overview',
    label: 'Our Company (Overview)',
    description: 'Vision, Mission, Purpose, Core Values & CEO Motto',
    icon: Building2,
  },
  {
    id: 'news',
    label: 'Our Company News',
    description: 'Internal gazette, milestones, and operational updates',
    icon: Newspaper,
  },
  {
    id: 'videos',
    label: 'Company Update Video',
    description: 'Leadership briefings and training videos on YouTube',
    icon: Film,
  },
  {
    id: 'top-performers',
    label: 'Top Performer',
    description: '12-month recognition across Alliance, Bancassurance & Corporate',
    icon: Award,
  },
];

interface PortalHeaderProps {
  activeTab: NavTabId;
  activeSubpage: OurCompanySubpage;
  onSelectTab: (tabId: NavTabId, subpage?: OurCompanySubpage) => void;
  isPlaceholderMode: boolean;
  onTogglePlaceholderMode: () => void;
  onOpenContentEditor: () => void;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  activeTab,
  activeSubpage,
  onSelectTab,
  isPlaceholderMode,
  onTogglePlaceholderMode,
  onOpenContentEditor,
}) => {
  const { currentUser, signOut } = useLms();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubpageClick = (subpage: OurCompanySubpage) => {
    onSelectTab('our-company', subpage);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro-bar for internal employee notice */}
      <div className="bg-[#003366] text-white py-1 px-4 text-xs font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide text-sky-200">INTERNAL PORTAL</span>
            <span className="text-white/40">|</span>
            <span className="text-slate-200 hidden sm:inline">KBZLIFE Insurance Employee Learning Hub</span>
            <span className="text-slate-200 sm:hidden">KBZLIFE Learning Hub</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onTogglePlaceholderMode}
              type="button"
              className="text-[11px] text-sky-200 hover:text-white underline underline-offset-2 flex items-center gap-1 transition-colors cursor-pointer"
              title="Switch between raw placeholder mode and sample preview mode"
            >
              <Sparkles className="w-3 h-3" />
              <span>{isPlaceholderMode ? 'Switch to Sample Preview' : 'Show Strict Placeholders'}</span>
            </button>
            <span className="text-white/30">·</span>
            <button
              onClick={onOpenContentEditor}
              type="button"
              className="text-[11px] text-sky-200 hover:text-white underline underline-offset-2 flex items-center gap-1 transition-colors cursor-pointer"
              title="Edit or supply official KBZLIFE copy and images"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Edit Content</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand Wordmark & Official Logo slot */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('our-company', 'overview')}
              className="flex items-center gap-3 text-left group focus-visible:ring-2 focus-visible:ring-[#00529B] rounded-lg p-1 transition-transform cursor-pointer"
              aria-label="KBZLIFE Employee Learning Portal Home"
            >
              <div className="w-10 h-10 rounded-lg bg-[#003366] text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-[#00529B] transition-colors">
                <Shield className="w-5 h-5 text-sky-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-[#003366] leading-none">
                  KBZLIFE
                </span>
                <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
                  Learning Portal
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) with Dropdown for Our Company */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2 h-full"
            aria-label="Main Navigation"
          >
            {/* Tab 1: Our Company with Interactive Dropdown */}
            <div
              ref={dropdownRef}
              className="relative h-full flex items-center"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-current={activeTab === 'our-company' ? 'page' : undefined}
                className={`relative px-3.5 py-2 text-sm font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#00529B] ${
                  activeTab === 'our-company'
                    ? 'text-[#003366] bg-[#F0F5FA]'
                    : 'text-slate-600 hover:text-[#003366] hover:bg-slate-50'
                }`}
              >
                <span>Our Company</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180 text-[#003366]' : ''
                  }`}
                />
                {activeTab === 'our-company' && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#00529B] rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>

              {/* Desktop Dropdown Menu Menu Popover */}
              {dropdownOpen && (
                <div
                  className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 text-left"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00529B]">
                      Our Company Sections
                    </span>
                  </div>

                  {OUR_COMPANY_DROPDOWN_ITEMS.map((item) => {
                    const isSubpageActive =
                      activeTab === 'our-company' && activeSubpage === item.id;
                    const IconComponent = item.icon;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSubpageClick(item.id)}
                        className={`w-full px-3.5 py-2.5 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                          isSubpageActive
                            ? 'bg-[#F0F5FA] text-[#003366]'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                        role="menuitem"
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            isSubpageActive
                              ? 'bg-[#003366] text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs font-bold truncate block ${
                                isSubpageActive ? 'text-[#003366]' : 'text-slate-900'
                              }`}
                            >
                              {item.label}
                            </span>
                            {isSubpageActive && (
                              <Check className="w-3.5 h-3.5 text-[#00529B] shrink-0" />
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 block">
                            {item.description}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Other 3 Navigation Tabs (Exact specified order) */}
            {NAV_ITEMS.slice(1).map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-3.5 py-2 text-sm font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#003366] bg-[#F0F5FA]'
                      : 'text-slate-600 hover:text-[#003366] hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {!item.isReady && (
                    <span className="text-[10px] font-medium text-slate-600 bg-slate-200/80 px-1.5 py-0.2 rounded">
                      Coming soon
                    </span>
                  )}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#00529B] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Profile Switcher */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Top Performers Link */}
            <button
              onClick={() => handleSubpageClick('top-performers')}
              className="px-3.5 py-2 text-xs font-semibold text-[#003366] bg-[#F0F5FA] border border-[#00529B]/20 rounded-lg hover:bg-[#00529B] hover:text-white transition-all whitespace-nowrap shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-[#00529B]" />
              <span>Top Performers</span>
            </button>

            {/* User Account Menu (Strict Regular User Session) */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer text-left"
                title="Account menu"
              >
                <img
                  src={
                    currentUser.avatar_url ||
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80'
                  }
                  alt={currentUser.full_name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                />
                <div className="hidden xl:block">
                  <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                    {currentUser.full_name}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate max-w-[120px]">
                    {currentUser.department || 'Employee'}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-slate-800 text-xs">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                    <img
                      src={
                        currentUser.avatar_url ||
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80'
                      }
                      alt={currentUser.full_name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900 truncate">{currentUser.full_name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-sky-50 text-[#00529B] border border-sky-200">
                        {currentUser.employee_id || 'Active Learner'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-1 mt-1 px-2 space-y-1">
                    <button
                      onClick={() => {
                        setIsProfileModalOpen(true);
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-[#00529B]" />
                      <span>My Employee Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full px-3 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg cursor-pointer flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-[#00529B]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation with Expandable Our Company Submenu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl transition-all text-left">
          <div className="space-y-1.5" role="menu">
            {/* Our Company Expandable Section */}
            <div className="rounded-lg border border-slate-200/80 overflow-hidden bg-slate-50/50">
              <button
                type="button"
                onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                className="w-full flex items-center justify-between p-3 text-sm font-bold text-[#003366] bg-white cursor-pointer"
              >
                <span>1. Our Company</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform ${
                    mobileSubmenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileSubmenuOpen && (
                <div className="p-2 space-y-1 bg-[#F8FAFC] border-t border-slate-100">
                  {OUR_COMPANY_DROPDOWN_ITEMS.map((item) => {
                    const isSubActive =
                      activeTab === 'our-company' && activeSubpage === item.id;
                    const IconComponent = item.icon;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSubpageClick(item.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                          isSubActive
                            ? 'bg-[#003366] text-white shadow-xs'
                            : 'text-slate-700 hover:bg-slate-200/60'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 shrink-0" />
                        <span className="flex-1 truncate">{item.label}</span>
                        {isSubActive && <Check className="w-3.5 h-3.5 text-sky-300 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Other 3 tabs */}
            {NAV_ITEMS.slice(1).map((item, idx) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#003366] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  role="menuitem"
                >
                  <span>
                    {idx + 2}. {item.label}
                  </span>
                  {!item.isReady && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      Coming soon
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">

            <button
              onClick={() => {
                onOpenContentEditor();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 px-4 text-xs font-semibold text-[#003366] bg-[#F0F5FA] rounded-lg border border-[#00529B]/20"
            >
              Edit Official Content
            </button>
          </div>
        </div>
      )}
      {/* Learner Personal Profile & Password Modal */}
      <LearnerProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </header>
  );
};
