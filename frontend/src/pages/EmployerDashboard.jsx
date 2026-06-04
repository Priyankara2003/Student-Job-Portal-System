import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function EmployerDashboard() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState('');
  const [jobForm, setJobForm] = useState({
    title: '',
    category: 'Other',
    location: '',
    salary: '',
    description: '',
  });

  const loadData = async () => {
    setError('');
    try {
      const [jobsData, applicantsData] = await Promise.all([
        apiRequest('/jobs/mine', { headers: { Authorization: `Bearer ${token}` } }),
        apiRequest('/employer/applicants', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setJobs(jobsData);
      setApplicants(applicantsData);
    } catch (err) {
      setError(err.message || 'Failed to load employer data');
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const handleCreateJob = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await apiRequest('/jobs', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...jobForm,
          salary: Number(jobForm.salary),
        }),
      });
      setJobForm({ title: '', category: 'Other', location: '', salary: '', description: '' });
      loadData();
    } catch (err) {
      setError(err.message || 'Failed to post job');
    }
  };

  const handleDelete = async (jobId) => {
    setError('');
    try {
      await apiRequest(`/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      loadData();
    } catch (err) {
      setError(err.message || 'Failed to delete job');
    }
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <div className="text-[1.6rem] font-bold text-text_color">🏢 Employer Dashboard</div>
          <div className="text-muted text-[0.9rem] mt-1">Manage your job postings and view applicants</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-8">
        <div>
          <div className="bg-card border border-border_color rounded-2xl overflow-hidden mb-6">
            <div className="p-5 border-b border-border_color font-bold text-text_color flex items-center gap-2">
              📝 Post a New Job
            </div>
            <div className="p-6">
              <form className="flex flex-col gap-4" onSubmit={handleCreateJob}>
                <div>
                  <label className="block text-[0.85rem] text-muted font-medium mb-1">Job Title</label>
                  <input
                    type="text"
                    className="w-full bg-bg2 border border-border_color rounded-xl p-3 text-text_color font-poppins text-[0.9rem] focus:outline-none focus:border-primary"
                    placeholder="e.g. Cashier, Content Writer"
                    value={jobForm.title}
                    onChange={(event) => setJobForm({ ...jobForm, title: event.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] text-muted font-medium mb-1">Category</label>
                  <select
                    className="w-full bg-bg2 border border-border_color rounded-xl p-3 text-text_color font-poppins text-[0.9rem] focus:outline-none focus:border-primary"
                    value={jobForm.category}
                    onChange={(event) => setJobForm({ ...jobForm, category: event.target.value })}
                  >
                    <option value="Other">Select category...</option>
                    <option value="IT">💻 IT & Software</option>
                    <option value="Marketing">📣 Marketing</option>
                    <option value="Retail">🛒 Retail</option>
                    <option value="Tutoring">📚 Tutoring</option>
                    <option value="Other">🌐 Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[0.85rem] text-muted font-medium mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full bg-bg2 border border-border_color rounded-xl p-3 text-text_color font-poppins text-[0.9rem] focus:outline-none focus:border-primary"
                    placeholder="City or Remote"
                    value={jobForm.location}
                    onChange={(event) => setJobForm({ ...jobForm, location: event.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] text-muted font-medium mb-1">Pay / Salary</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-bg2 border border-border_color rounded-xl p-3 text-text_color font-poppins text-[0.9rem] focus:outline-none focus:border-primary"
                    placeholder="e.g. 15.00"
                    value={jobForm.salary}
                    onChange={(event) => setJobForm({ ...jobForm, salary: event.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] text-muted font-medium mb-1">Job Description</label>
                  <textarea
                    className="w-full bg-bg2 border border-border_color rounded-xl p-3 text-text_color font-poppins text-[0.9rem] min-h-[100px] resize-y focus:outline-none focus:border-primary"
                    placeholder="Describe the role and requirements..."
                    value={jobForm.description}
                    onChange={(event) => setJobForm({ ...jobForm, description: event.target.value })}
                    required
                  ></textarea>
                </div>
                {error && <div className="text-danger text-sm">{error}</div>}
                <button type="submit" className="w-full bg-gradient-to-br from-primary to-[#5a52e0] text-white border-none rounded-xl p-3 font-poppins font-bold text-[0.95rem] cursor-pointer mt-2 transition-all hover:opacity-90 hover:-translate-y-[1px]">
                  Post Job →
                </button>
              </form>
            </div>
          </div>

          <div className="bg-card border border-border_color rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border_color font-bold text-text_color flex items-center gap-2">
              💼 Your Posted Jobs ({jobs.length})
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 text-left text-[0.8rem] font-semibold text-muted uppercase tracking-wider border-b border-border_color">Title</th>
                    <th className="p-4 text-left text-[0.8rem] font-semibold text-muted uppercase tracking-wider border-b border-border_color">Category</th>
                    <th className="p-4 text-left text-[0.8rem] font-semibold text-muted uppercase tracking-wider border-b border-border_color">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.length > 0 ? jobs.map(job => (
                    <tr key={job.job_id} className="hover:bg-white/5">
                      <td className="p-4 text-[0.88rem] font-semibold border-b border-border_color">{job.title}</td>
                      <td className="p-4 text-[0.88rem] border-b border-border_color">
                        <span className="bg-[#6c63ff]/15 text-primary2 border border-[#6c63ff]/30 px-3 py-1 rounded-full text-[0.75rem] font-semibold inline-block">
                          {job.category || 'Other'}
                        </span>
                      </td>
                      <td className="p-4 text-[0.88rem] border-b border-border_color">
                        <button
                          type="button"
                          onClick={() => handleDelete(job.job_id)}
                          className="bg-danger/10 text-danger border border-danger/30 rounded-lg px-3 py-1 text-[0.8rem] font-poppins cursor-pointer"
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="3" className="text-center text-muted p-8 border-b border-border_color">No jobs posted yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border_color rounded-2xl overflow-hidden self-start">
          <div className="p-5 border-b border-border_color font-bold text-text_color flex items-center gap-2">
            👥 Applicants ({applicants.length})
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left text-[0.8rem] font-semibold text-muted uppercase tracking-wider border-b border-border_color">Student Name</th>
                  <th className="p-4 text-left text-[0.8rem] font-semibold text-muted uppercase tracking-wider border-b border-border_color">Email</th>
                  <th className="p-4 text-left text-[0.8rem] font-semibold text-muted uppercase tracking-wider border-b border-border_color">Applied For</th>
                  <th className="p-4 text-left text-[0.8rem] font-semibold text-muted uppercase tracking-wider border-b border-border_color">Status</th>
                </tr>
              </thead>
              <tbody>
                {applicants.length > 0 ? applicants.map((app, i) => (
                  <tr key={i} className="hover:bg-white/5">
                    <td className="p-4 text-[0.88rem] font-semibold border-b border-border_color">{app.student_name}</td>
                    <td className="p-4 text-[0.88rem] text-muted border-b border-border_color">{app.student_email}</td>
                    <td className="p-4 text-[0.88rem] border-b border-border_color">{app.job_title}</td>
                    <td className="p-4 text-[0.88rem] border-b border-border_color">
                      <span className="bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30 px-3 py-1 rounded-full text-[0.75rem] font-semibold inline-block">
                        {app.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted p-8 border-b border-border_color">No applicants yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
