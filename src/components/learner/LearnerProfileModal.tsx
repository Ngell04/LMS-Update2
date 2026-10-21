import React, { useState } from 'react';
import {
  User,
  Mail,
  Building,
  Calendar,
  Shield,
  Key,
  Camera,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
  Eye,
  EyeOff,
  IdCard,
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';

interface LearnerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LearnerProfileModal: React.FC<LearnerProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentUser, updateAdminProfile, changePassword, showToast } = useLms();

  const [activeTab, setActiveTab] = useState<'details' | 'security'>('details');

  // Profile Form States
  const [fullName, setFullName] = useState(currentUser.full_name);
  const [department, setDepartment] = useState(currentUser.department || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar_url || '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileFeedback, setProfileFeedback] = useState<string | null>(null);

  // Password Form States
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileFeedback(null);
    try {
      const ok = await updateAdminProfile({
        full_name: fullName.trim(),
        department: department.trim(),
        avatar_url: avatarUrl.trim() || undefined,
      });
      if (ok) {
        setProfileFeedback('Profile details successfully updated.');
        setTimeout(() => setProfileFeedback(null), 3000);
      } else {
        setProfileFeedback('Failed to save profile changes.');
      }
    } catch {
      setProfileFeedback('An error occurred while saving profile.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordFeedback(null);

    if (!newPassword || newPassword.length < 6) {
      setPasswordFeedback({
        type: 'error',
        text: 'New password must be at least 6 characters long.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordFeedback({
        type: 'error',
        text: 'New password and confirm password do not match.',
      });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const res = await changePassword(oldPassword, newPassword);
      if (res.success) {
        setPasswordFeedback({
          type: 'success',
          text: 'Password updated successfully! Next sign in will use your new credentials.',
        });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordFeedback({
          type: 'error',
          text: res.message || 'Could not update password.',
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setPasswordFeedback({
        type: 'error',
        text: msg || 'Password update failed.',
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn text-left font-sans">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="bg-[#003366] text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={
                    avatarUrl ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
                  }
                  alt={currentUser.full_name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white/30 shadow-md"
                />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">{currentUser.full_name}</h3>
                <p className="text-xs text-sky-200">
                  {currentUser.department || 'KBZLife Employee'} ·{' '}
                  <span className="font-bold uppercase text-emerald-300">
                    {currentUser.account_status}
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-sky-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 border-t border-sky-900/60 pt-3">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'details'
                  ? 'bg-white text-[#003366] shadow-xs'
                  : 'text-sky-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Personal Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'security'
                  ? 'bg-white text-[#003366] shadow-xs'
                  : 'text-sky-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>Change Password</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'details' ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {profileFeedback && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{profileFeedback}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00529B]"
                  />
                </div>

                {/* Username (Read Only) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Username <span className="text-[10px] text-slate-400 font-normal">(system unique)</span>
                  </label>
                  <input
                    type="text"
                    value={currentUser.username || currentUser.email.split('@')[0]}
                    disabled
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed font-mono"
                  />
                </div>
              </div>

              {/* Email (Read Only - requires auth verification to change) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Registered Email Address{' '}
                  <span className="text-[10px] text-slate-400 font-normal">
                    (contact admin to modify email)
                  </span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={currentUser.email}
                    disabled
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Department & Employee ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Underwriting & Policy Issue"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00529B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Employee ID{' '}
                    <span className="text-[10px] text-slate-400 font-normal">(assigned by HR)</span>
                  </label>
                  <input
                    type="text"
                    value={currentUser.employee_id || 'KBZ-EMP-102'}
                    disabled
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Avatar URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00529B]"
                />
              </div>

              {/* Read Only RBAC Security Safeguard Display */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Account Access Role:</span>
                  <span className="font-bold text-purple-700 uppercase">{currentUser.role}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Account Approval Status:</span>
                  <span className="font-bold text-emerald-700 uppercase">
                    {currentUser.account_status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Registration Date:</span>
                  <span className="text-slate-700 font-medium">
                    {new Date(currentUser.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="px-5 py-2 rounded-xl bg-[#003366] hover:bg-[#00529B] text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSavingProfile ? 'Saving...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              {passwordFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    passwordFeedback.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}
                >
                  {passwordFeedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{passwordFeedback.text}</span>
                </div>
              )}

              {/* Current Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                    className="w-full pl-9 pr-9 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00529B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  New Password (min 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new secure password"
                    required
                    className="w-full pl-9 pr-9 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00529B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00529B]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="px-5 py-2 rounded-xl bg-[#003366] hover:bg-[#00529B] text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
