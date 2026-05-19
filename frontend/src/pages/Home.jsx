import { Link, useSearchParams } from 'react-router-dom';

export default function Home() {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const currentSearch = searchParams.get('search') || '';

  // Mock data based on the HTML templates
  const stats = { jobs: 150, students: 500, companies: 50 };
  const jobs = [
    { id: 1, company_name: "Tech Corp", title: "Frontend Developer", category: "IT", description: "Looking for a skilled developer...", location: "Remote", salary: "$20/hr" },
    { id: 2, company_name: "Market Pro", title: "Social Media Manager", category: "Marketing", description: "Manage our social accounts...", location: "New York", salary: "$18/hr" },
  ];
  const role = null; // Mock role

  return (
    <>
      <section className="text-center pt-20 px-4 md:px-8 pb-12">
        <div className="inline-block bg-[#6c63ff]/15 border border-[#6c63ff]/40 text-primary2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          🚀 #1 Part-Time Job Platform for Students
        </div>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.2] mb-4 text-text_color">
          Find Your Perfect<br/>
          <span className="gradient-text">Part-Time Job</span>
        </h1>
        <p className="text-muted text-lg mb-10 max-w-2xl mx-auto">
          Connect with top employers. Browse opportunities that fit your college schedule.
        </p>
        
        <form className="flex max-w-[600px] mx-auto mb-10 bg-card border border-border_color rounded-xl p-2 gap-2">
          <input 
            type="text" 
            name="search" 
            className="flex-1 bg-transparent border-none outline-none text-text_color font-poppins text-[0.95rem] p-2 placeholder-muted min-w-0" 
            placeholder="🔍 Search jobs, companies..." 
            defaultValue={currentSearch} 
          />
          <button type="submit" className="bg-primary text-white border-none rounded-lg px-4 md:px-6 py-2.5 font-poppins font-semibold cursor-pointer hover:bg-[#5a52e0] transition-colors whitespace-nowrap">
            Search Jobs
          </button>
        </form>
        
        <div className="flex justify-center items-center gap-8 flex-wrap">
          <div className="flex flex-col items-center">
            <strong className="text-[1.6rem] font-bold text-text_color">{stats.jobs}+</strong>
            <span className="text-[0.8rem] text-muted">Jobs Posted</span>
          </div>
          <div className="w-[1px] h-[40px] bg-border_color hidden sm:block"></div>
          <div className="flex flex-col items-center">
            <strong className="text-[1.6rem] font-bold text-text_color">{stats.students}+</strong>
            <span className="text-[0.8rem] text-muted">Students</span>
          </div>
          <div className="w-[1px] h-[40px] bg-border_color hidden sm:block"></div>
          <div className="flex flex-col items-center">
            <strong className="text-[1.6rem] font-bold text-text_color">{stats.companies}+</strong>
            <span className="text-[0.8rem] text-muted">Companies</span>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto mb-8 px-4 md:px-8">
        <h2 className="text-[1.4rem] font-bold mb-5 text-text_color">Browse by Category</h2>
        <div className="flex flex-wrap gap-2">
          <Link to="/" className={`bg-card border border-border_color text-muted px-5 py-2 rounded-full text-[0.85rem] font-medium transition-colors hover:bg-primary hover:border-primary hover:text-white ${!currentCategory ? 'bg-primary border-primary !text-white' : ''}`}>All Jobs</Link>
          <Link to="/?category=IT" className={`bg-card border border-border_color text-muted px-5 py-2 rounded-full text-[0.85rem] font-medium transition-colors hover:bg-primary hover:border-primary hover:text-white ${currentCategory === 'IT' ? 'bg-primary border-primary !text-white' : ''}`}>💻 IT & Software</Link>
          <Link to="/?category=Marketing" className={`bg-card border border-border_color text-muted px-5 py-2 rounded-full text-[0.85rem] font-medium transition-colors hover:bg-primary hover:border-primary hover:text-white ${currentCategory === 'Marketing' ? 'bg-primary border-primary !text-white' : ''}`}>📣 Marketing</Link>
          <Link to="/?category=Retail" className={`bg-card border border-border_color text-muted px-5 py-2 rounded-full text-[0.85rem] font-medium transition-colors hover:bg-primary hover:border-primary hover:text-white ${currentCategory === 'Retail' ? 'bg-primary border-primary !text-white' : ''}`}>🛒 Retail</Link>
          <Link to="/?category=Tutoring" className={`bg-card border border-border_color text-muted px-5 py-2 rounded-full text-[0.85rem] font-medium transition-colors hover:bg-primary hover:border-primary hover:text-white ${currentCategory === 'Tutoring' ? 'bg-primary border-primary !text-white' : ''}`}>📚 Tutoring</Link>
          <Link to="/?category=Other" className={`bg-card border border-border_color text-muted px-5 py-2 rounded-full text-[0.85rem] font-medium transition-colors hover:bg-primary hover:border-primary hover:text-white ${currentCategory === 'Other' ? 'bg-primary border-primary !text-white' : ''}`}>🌐 Other</Link>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2 className="text-[1.4rem] font-bold mb-5 text-text_color">{jobs.length} Jobs Available</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 mt-4">
          {jobs.length > 0 ? jobs.map(job => (
            <div key={job.id} className="bg-card border border-border_color rounded-2xl p-6 transition-all duration-300 flex flex-col gap-3 hover:border-primary hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(108,99,255,0.15)]">
              <div className="flex items-center gap-3">
                <div className="w-[44px] h-[44px] bg-gradient-to-br from-primary to-primary2 rounded-xl flex items-center justify-center font-bold text-[1.1rem] text-white shrink-0">
                  {job.company_name[0].toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-[0.9rem] text-text_color">{job.company_name}</div>
                  <div className="text-[0.72rem] text-primary2 bg-[#6c63ff]/10 border border-[#6c63ff]/20 rounded px-2 py-0.5 inline-block mt-1">
                    {job.category || 'Part-Time'}
                  </div>
                </div>
              </div>
              <h3 className="text-[1.05rem] font-bold text-text_color">{job.title}</h3>
              <p className="text-[0.85rem] text-muted leading-[1.6] grow">
                {job.description.length > 100 ? `${job.description.substring(0, 100)}...` : job.description}
              </p>
              <div className="flex gap-4 flex-wrap mt-2">
                <span className="text-[0.8rem] text-muted">📍 {job.location || 'On-site'}</span>
                <span className="text-[0.8rem] text-muted">💰 {job.salary || 'Negotiable'}</span>
              </div>
              <div className="mt-2">
                {role === 'student' ? (
                  <form action={`/apply/${job.id}`} method="POST">
                    <button type="submit" className="block w-full bg-gradient-to-br from-primary to-[#5a52e0] text-white border-none rounded-xl p-3 font-poppins font-semibold text-[0.9rem] cursor-pointer transition-all hover:opacity-90 hover:-translate-y-[1px]">
                      Apply Now →
                    </button>
                  </form>
                ) : (
                  <Link to="/auth" className="block w-full bg-transparent text-primary2 border border-border_color rounded-xl p-3 font-semibold text-[0.9rem] text-center transition-all hover:border-primary">
                    Login to Apply
                  </Link>
                )}
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-20 px-8">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-[1.2rem] font-semibold mb-2 text-text_color">No jobs found</h3>
              <p className="text-[0.9rem] text-muted">Try a different search keyword or category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
