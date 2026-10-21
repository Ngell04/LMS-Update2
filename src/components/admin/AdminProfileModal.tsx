import React, { useState } from 'react';
import {
  User,
  Shield,
  Key,
  Mail,
  Building,
  Image,
  Check,
  LogOut,
  AlertCircle,
  Lock,
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';

interface AdminProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminProfileModal: React.FC<AdminProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateAdminProfile, changePassword, signOut } = useLms();

  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

  // Profile fields state
  const [fullName, setFullName] = useState(currentUser.full_name);
  const [username, setUsername] = useState(currentUser.username || 'admin');
  const [email, setEmail] = useState(currentUser.email);
  const [department, setDepartment] = useState(currentUser.department || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar_url || '');

  // Password fields state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isOpen) return null;

  const handleSaveProfile = async () => {
    await updateAdminProfile({
      full_name: fullName,
      username,
      email,
      department,
      avatar_url: avatarUrl,
    });
    onClose();
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordStatus({ type: 'error', message: 'Password must be at least 6 characters.' });
      return;
    }

    const res = await changePassword(currentPassword, newPassword);
    if (res.success) {
      setPasswordStatus({ type: 'success', message: 'Password changed successfully.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordStatus({ type: 'error', message: res.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#003366] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={
                currentUser.avatar_url ||
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
              }
              alt={currentUser.full_name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
            />
            <div>
              <h2 className="text-lg font-bold leading-tight">{currentUser.full_name}</h2>
              <p className="text-xs text-sky-200">
                {currentUser.role.toUpperCase()} · {currentUser.department}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1 rounded-lg text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab switcher */}
        <div className="border-b border-slate-100 px-6 flex items-center gap-4 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 text-xs font-bold border-b-2 cursor-pointer transition-all ${
              activeTab === 'profile'
                ? 'border-[#003366] text-[#003366]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 text-xs font-bold border-b-2 cursor-pointer transition-all ${
              activeTab === 'security'
                ? 'border-[#003366] text-[#003366]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Security & Password
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
          {activeTab === 'profile' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Display Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#00529B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#00529B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#00529B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#00529B] focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Email updates will require confirmation through Supabase Auth verification.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Profile Picture URL (Supabase Storage)
                </label>
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#00529B] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 text-xs font-semibold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-4 py-2 rounded-lg bg-[#00529B] hover:bg-[#003366] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              {currentUser.must_change_password && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">First-Time Login Password Change Required</strong>
                    <span className="text-[11px] leading-relaxed">
                      You are using the temporary setup password (<code>admin123</code>). Please establish a new secure administrative password.
                    </span>
                  </div>
                </div>
              )}

              {passwordStatus && (
                <div
                  className={`p-3 rounded-lg text-xs ${
                    passwordStatus.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {passwordStatus.message}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Password (or temporary "admin123")
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#00529B] focus:outline-none"
                  placeholder="Enter current password..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#00529B] focus:outline-none"
                  placeholder="At least 6 characters..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#00529B] focus:outline-none"
                  placeholder="Re-enter new password..."
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#00529B] hover:bg-[#003366] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
