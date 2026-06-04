import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function StudentDashboard() {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    apiRequest('/applications/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(setApplications)
      .catch((err) => setError(err.message || 'Failed to load applications'));
  }, [token]);

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <div className="text-[1.6rem] font-bold text-text_color">🎓 Student Dashboard</div>
          <div className="text-muted text-[0.9rem] mt-1">Track your job applications</div>
        </div>
      </div>

      <div className="bg-card border border-border_color rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border_color font-bold text-text_color flex items-center gap-2">
          📄 My Applications ({applications.length})
        </div>
        {error && <div className="text-danger text-sm px-5 pt-4">{error}</div>}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left text-[0.8rem] font-semibold text-muted uppercase tracking-wider border-b border-border_color">Job Title</th>
                <th className="p-4 text-left text-[0.8rem] font-semibold text-muted uppercase tracking-wider border-b border-border_color">Company</th>
                <th className="p-4 text-left text-[0.8rem] font-semibold text-muted uppercase tracking-wider border-b border-border_color">Applied Date</th>
                <th className="p-4 text-left text-[0.8rem] font-semibold text-muted uppercase tracking-wider border-b border-border_color">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? applications.map((app, i) => (
                <tr key={i} className="hover:bg-white/5">
                  <td className="p-4 text-[0.88rem] font-semibold border-b border-border_color">{app.job_title}</td>
                  <td className="p-4 text-[0.88rem] border-b border-border_color">{app.company_name}</td>
                  <td className="p-4 text-[0.88rem] text-muted border-b border-border_color">{app.applied_at}</td>
                  <td className="p-4 text-[0.88rem] border-b border-border_color">
                    <span className="bg-[#10b981]/15 text-accent border border-[#10b981]/30 px-3 py-1 rounded-full text-[0.75rem] font-semibold inline-block">
                      {app.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted p-8 border-b border-border_color">You haven't applied to any jobs yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
