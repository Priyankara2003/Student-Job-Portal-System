import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function JobDetails() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    apiRequest(`/jobs/${id}`)
      .then(setJob)
      .catch((err) => setError(err.message || 'Failed to load job'));
  }, [id]);

  const handleApply = async () => {
    setError('');
    setSuccess('');
    try {
      await apiRequest(`/jobs/${id}/apply`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess('Application submitted successfully.');
    } catch (err) {
      setError(err.message || 'Failed to apply');
    }
  };

  if (!job) {
    return (
      <div className="py-10 text-center text-muted">Loading job details...</div>
    );
  }

  const role = user?.role?.toLowerCase();

  return (
    <div className="py-10">
      <div className="mb-6">
        <Link to="/" className="text-sm text-primary2">← Back to Jobs</Link>
      </div>
      <div className="bg-card border border-border_color rounded-2xl p-8">
        <div className="text-sm text-primary2 mb-2">{job.category || 'Part-Time'}</div>
        <h1 className="text-[1.8rem] font-bold text-text_color mb-2">{job.title}</h1>
        <div className="text-muted text-sm mb-4">{job.location} · {job.salary}</div>
        <p className="text-[0.95rem] text-muted leading-[1.7] mb-6">{job.description}</p>
        <div className="bg-bg2 border border-border_color rounded-xl p-4 mb-6">
          <div className="text-sm font-semibold text-text_color">Broker Contact</div>
          <div className="text-sm text-muted">{job.broker_name || 'Unknown'}</div>
          <div className="text-sm text-muted">{job.broker_email || 'Not provided'}</div>
        </div>
        {error && <div className="text-danger text-sm mb-4">{error}</div>}
        {success && <div className="text-accent text-sm mb-4">{success}</div>}
        {role === 'student' ? (
          <button
            type="button"
            onClick={handleApply}
            className="bg-gradient-to-br from-primary to-[#5a52e0] text-white border-none rounded-xl px-6 py-3 font-poppins font-semibold text-[0.9rem] cursor-pointer transition-all hover:opacity-90"
          >
            Apply Now
          </button>
        ) : (
          <Link
            to="/auth"
            className="inline-block bg-transparent text-primary2 border border-border_color rounded-xl px-6 py-3 font-semibold text-[0.9rem] transition-all hover:border-primary"
          >
            Login as Student to Apply
          </Link>
        )}
      </div>
    </div>
  );
}
