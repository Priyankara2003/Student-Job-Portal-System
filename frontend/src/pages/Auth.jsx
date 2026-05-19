export default function Auth() {
  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] w-full">
        {/* Login Card */}
        <div className="bg-card border border-border_color rounded-2xl p-8">
          <div className="text-[1.3rem] font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">🔑</span> Login
          </div>
          <form className="flex flex-col gap-5">
            <div>
              <label className="block text-[0.85rem] text-muted font-medium mb-1.5">Email Address</label>
              <input type="email" className="w-full bg-bg2 border border-border_color rounded-xl px-4 py-3 text-text_color font-poppins text-[0.9rem] transition-colors focus:outline-none focus:border-primary" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-[0.85rem] text-muted font-medium mb-1.5">Password</label>
              <input type="password" className="w-full bg-bg2 border border-border_color rounded-xl px-4 py-3 text-text_color font-poppins text-[0.9rem] transition-colors focus:outline-none focus:border-primary" placeholder="••••••••" required />
            </div>
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
          <form className="flex flex-col gap-5">
            <div>
              <label className="block text-[0.85rem] text-muted font-medium mb-1.5">Full Name / Company Name</label>
              <input type="text" className="w-full bg-bg2 border border-border_color rounded-xl px-4 py-3 text-text_color font-poppins text-[0.9rem] transition-colors focus:outline-none focus:border-primary" placeholder="Your name" required />
            </div>
            <div>
              <label className="block text-[0.85rem] text-muted font-medium mb-1.5">Email Address</label>
              <input type="email" className="w-full bg-bg2 border border-border_color rounded-xl px-4 py-3 text-text_color font-poppins text-[0.9rem] transition-colors focus:outline-none focus:border-primary" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-[0.85rem] text-muted font-medium mb-1.5">Password</label>
              <input type="password" className="w-full bg-bg2 border border-border_color rounded-xl px-4 py-3 text-text_color font-poppins text-[0.9rem] transition-colors focus:outline-none focus:border-primary" placeholder="Min 6 characters" required />
            </div>
            <div>
              <label className="block text-[0.85rem] text-muted font-medium mb-1.5">I am a...</label>
              <select className="w-full bg-bg2 border border-border_color rounded-xl px-4 py-3 text-text_color font-poppins text-[0.9rem] focus:outline-none focus:border-primary">
                <option value="student">🎓 Student (Looking for a job)</option>
                <option value="employer">🏢 Employer (Posting jobs)</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-gradient-to-br from-accent to-[#059669] text-white border-none rounded-xl p-3.5 font-poppins font-bold text-[0.95rem] cursor-pointer mt-2 transition-all hover:opacity-90 hover:-translate-y-[1px]">
              Create Account →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
