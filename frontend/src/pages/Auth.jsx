import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    contact_no: '',
    role: 'Student',
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError('');
    try {
      const token = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginForm),
      });
      const user = await apiRequest('/users/me', {
        headers: { Authorization: `Bearer ${token.access_token}` },
      });
      setAuth(token.access_token, user);
      navigate(user.role === 'Broker' ? '/employer' : '/student');
    } catch (err) {
      setLoginError(err.message || 'Login failed');
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setRegisterError('');
    try {
      const payload = { ...registerForm };
      if (!payload.contact_no) delete payload.contact_no;
      await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const token = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: registerForm.email,
          password: registerForm.password,
        }),
      });
      const user = await apiRequest('/users/me', {
        headers: { Authorization: `Bearer ${token.access_token}` },
      });
      setAuth(token.access_token, user);
      navigate(user.role === 'Broker' ? '/employer' : '/student');
    } catch (err) {
      setRegisterError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] w-full">
        {/* Login Card */}
        <div className="bg-card border border-border_color rounded-2xl p-8">
          <div className="text-[1.3rem] font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">🔑</span> Login
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-[0.85rem] text-muted font-medium mb-1.5">Email Address</label>
              <input
                type="email"
                className="w-full bg-bg2 border border-border_color rounded-xl px-4 py-3 text-text_color font-poppins text-[0.9rem] transition-colors focus:outline-none focus:border-primary"
                placeholder="you@example.com"
                value={loginForm.email}
                onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-[0.85rem] text-muted font-medium mb-1.5">Password</label>
              <input
                type="password"
                className="w-full bg-bg2 border border-border_color rounded-xl px-4 py-3 text-text_color font-poppins text-[0.9rem] transition-colors focus:outline-none focus:border-primary"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                required
              />
            </div>
            {loginError && <div className="text-danger text-sm">{loginError}</div>}
            <button type="submit" className="w-full bg-gradient-to-br from-primary to-[#5a52e0] text-white border-none rounded-xl p-3.5 font-poppins font-bold text-[0.95rem] cursor-pointer mt-2 transition-all hover:opacity-90 hover:-translate-y-[1px]">
              Login →
            </button>
          </form>
        </div>

        {/* Register Card */}
        <div className="bg-card border border-border_color rounded-2xl p-8">
          <div className="text-[1.3rem] font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">✨</span> Create Account
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleRegister}>
            <div>
              <label className="block text-[0.85rem] text-muted font-medium mb-1.5">Full Name / Company Name</label>
              <input
                type="text"
                className="w-full bg-bg2 border border-border_color rounded-xl px-4 py-3 text-text_color font-poppins text-[0.9rem] transition-colors focus:outline-none focus:border-primary"
                placeholder="Your name"
                value={registerForm.name}
                onChange={(event) => setRegisterForm({ ...registerForm, name: event.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-[0.85rem] text-muted font-medium mb-1.5">Email Address</label>
              <input
                type="email"
                className="w-full bg-bg2 border border-border_color rounded-xl px-4 py-3 text-text_color font-poppins text-[0.9rem] transition-colors focus:outline-none focus:border-primary"
                placeholder="you@example.com"
                value={registerForm.email}
                onChange={(event) => setRegisterForm({ ...registerForm, email: event.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-[0.85rem] text-muted font-medium mb-1.5">Password</label>
              <input
                type="password"
                className="w-full bg-bg2 border border-border_color rounded-xl px-4 py-3 text-text_color font-poppins text-[0.9rem] transition-colors focus:outline-none focus:border-primary"
                placeholder="Min 6 characters"
                value={registerForm.password}
                onChange={(event) => setRegisterForm({ ...registerForm, password: event.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-[0.85rem] text-muted font-medium mb-1.5">Contact Number</label>
              <input
                type="tel"
                className="w-full bg-bg2 border border-border_color rounded-xl px-4 py-3 text-text_color font-poppins text-[0.9rem] transition-colors focus:outline-none focus:border-primary"
                placeholder="e.g. 0771234567"
                value={registerForm.contact_no}
                onChange={(event) => setRegisterForm({ ...registerForm, contact_no: event.target.value })}
              />
            </div>
            <div>
              <label className="block text-[0.85rem] text-muted font-medium mb-1.5">I am a...</label>
              <select
                className="w-full bg-bg2 border border-border_color rounded-xl px-4 py-3 text-text_color font-poppins text-[0.9rem] focus:outline-none focus:border-primary"
                value={registerForm.role}
                onChange={(event) => setRegisterForm({ ...registerForm, role: event.target.value })}
              >
                <option value="Student">🎓 Student (Looking for a job)</option>
                <option value="Broker">🏢 Employer (Posting jobs)</option>
              </select>
            </div>
            {registerError && <div className="text-danger text-sm">{registerError}</div>}
            <button type="submit" className="w-full bg-gradient-to-br from-accent to-[#059669] text-white border-none rounded-xl p-3.5 font-poppins font-bold text-[0.95rem] cursor-pointer mt-2 transition-all hover:opacity-90 hover:-translate-y-[1px]">
              Create Account →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
