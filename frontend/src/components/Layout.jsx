import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, clearAuth } = useAuth();
  const role = user?.role?.toLowerCase();

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between h-[70px] px-8 bg-bg/90 backdrop-blur-md border-b border-border_color">
        <Link to="/" className="text-2xl font-bold gradient-text">
          ⚡ JobPortal
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/" className="text-sm font-medium text-muted px-4 py-2 rounded-lg hover:text-text_color hover:bg-border_color transition-colors">
            Jobs
          </Link>
          {user?.name ? (
            <>
              {role === 'broker' ? (
                <Link to="/employer" className="text-sm font-medium text-muted px-4 py-2 rounded-lg hover:text-text_color hover:bg-border_color transition-colors">
                  Dashboard
                </Link>
              ) : (
                <Link to="/student" className="text-sm font-medium text-muted px-4 py-2 rounded-lg hover:text-text_color hover:bg-border_color transition-colors">
                  My Applications
                </Link>
              )}
              <Link to="/profile" className="text-sm font-medium text-muted px-4 py-2 rounded-lg hover:text-text_color hover:bg-border_color transition-colors">
                Profile
              </Link>
              <span className="text-xs text-muted bg-card px-3 py-1.5 rounded-full border border-border_color">
                👤 {user.name}
              </span>
              <button
                type="button"
                onClick={clearAuth}
                className="text-sm text-danger border border-border_color px-4 py-2 rounded-lg hover:bg-danger/10 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="text-sm font-semibold text-white bg-primary px-5 py-2 rounded-lg hover:bg-[#5a52e0] hover:-translate-y-[1px] transition-all">
              Login / Register →
            </Link>
          )}
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-8 pb-16">
        {children}
      </main>

      <footer className="text-center p-8 text-muted text-sm border-t border-border_color mt-16">
        <p>⚡ Mini Job Portal &nbsp;&bull;&nbsp; Built with React & Tailwind &nbsp;&bull;&nbsp; &copy; 2026</p>
      </footer>
    </>
  );
}
