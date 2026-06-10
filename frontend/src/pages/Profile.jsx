import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { token, user, setAuth } = useAuth();
  const [form, setForm] = useState({ name: '', contact_no: '', bio: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    apiRequest('/users/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((data) => {
        setForm({
          name: data.name || '',
          contact_no: data.contact_no || '',
          bio: data.bio || '',
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load profile');
        setLoading(false);
      });
  }, [token]);

  const handleSave = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      const updated = await apiRequest('/users/me', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      setAuth(token, updated);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (!token) {
    return (
      <div className="py-20 text-center text-muted">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-[1.2rem] font-semibold text-text_color mb-2">Please log in</h2>
        <p className="text-[0.9rem]">You need to be logged in to view your profile.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="py-20 text-center text-muted">Loading profile...</div>;
  }

  return (
    <div className="py-8 max-w-[700px] mx-auto">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <div className="text-[1.6rem] font-bold text-text_color">👤 My Profile</div>
          <div className="text-muted text-[0.9rem] mt-1">Manage your personal information</div>
        </div>
      </div>

      {/* Profile Info Card */}
      <div className="bg-card border border-border_color rounded-2xl p-8 mb-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border_color">
          <div className="w-[64px] h-[64px] bg-gradient-to-br from-primary to-primary2 rounded-2xl flex items-center justify-center font-bold text-[1.5rem] text-white shrink-0">
            {(user?.name || 'U')[0].toUpperCase()}
          </div>
          <div>
            <div className="text-[1.1rem] font-bold text-text_color">{user?.name}</div>
            <div className="text-[0.85rem] text-muted">{user?.email}</div>
            <span className="inline-block mt-1 text-[0.72rem] font-semibold text-primary2 bg-[#6c63ff]/10 border border-[#6c63ff]/20 rounded px-2 py-0.5">
              {user?.role === 'Broker' ? '🏢 Employer' : '🎓 Student'}
            </span>
          </div>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSave}>
          <div>
            <label className="block text-[0.85rem] text-muted font-medium mb-1.5">Full Name</label>
            <input
              type="text"
              className="w-full bg-bg2 border border-border_color rounded-xl px-4 py-3 text-text_color font-poppins text-[0.9rem] transition-colors focus:outline-none focus:border-primary"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-[0.85rem] text-muted font-medium mb-1.5">Contact Number</label>
            <input
              type="tel"
              className="w-full bg-bg2 border border-border_color rounded-xl px-4 py-3 text-text_color font-poppins text-[0.9rem] transition-colors focus:outline-none focus:border-primary"
              placeholder="e.g. 0771234567"
              value={form.contact_no}
              onChange={(e) => setForm({ ...form, contact_no: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-[0.85rem] text-muted font-medium mb-1.5">Bio</label>
            <textarea
              className="w-full bg-bg2 border border-border_color rounded-xl px-4 py-3 text-text_color font-poppins text-[0.9rem] min-h-[120px] resize-y transition-colors focus:outline-none focus:border-primary"
              placeholder="Tell us about yourself..."
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            ></textarea>
          </div>

          {error && <div className="text-danger text-sm">{error}</div>}
          {success && <div className="text-accent text-sm">{success}</div>}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-gradient-to-br from-primary to-[#5a52e0] text-white border-none rounded-xl p-3.5 font-poppins font-bold text-[0.95rem] cursor-pointer mt-2 transition-all hover:opacity-90 hover:-translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes →'}
          </button>
        </form>
      </div>

      {/* Account Details Card */}
      <div className="bg-card border border-border_color rounded-2xl p-8">
        <div className="text-[1rem] font-bold text-text_color mb-4 flex items-center gap-2">
          📋 Account Details
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-bg2 rounded-xl p-4">
            <div className="text-[0.75rem] text-muted font-medium uppercase tracking-wider mb-1">Email</div>
            <div className="text-[0.9rem] text-text_color">{user?.email}</div>
          </div>
          <div className="bg-bg2 rounded-xl p-4">
            <div className="text-[0.75rem] text-muted font-medium uppercase tracking-wider mb-1">Role</div>
            <div className="text-[0.9rem] text-text_color">{user?.role}</div>
          </div>
          <div className="bg-bg2 rounded-xl p-4">
            <div className="text-[0.75rem] text-muted font-medium uppercase tracking-wider mb-1">User ID</div>
            <div className="text-[0.9rem] text-text_color">#{user?.user_id}</div>
          </div>
          <div className="bg-bg2 rounded-xl p-4">
            <div className="text-[0.75rem] text-muted font-medium uppercase tracking-wider mb-1">Member Since</div>
            <div className="text-[0.9rem] text-text_color">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
