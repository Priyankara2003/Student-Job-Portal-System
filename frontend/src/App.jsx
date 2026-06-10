import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import EmployerDashboard from './pages/EmployerDashboard';
import StudentDashboard from './pages/StudentDashboard';
import JobDetails from './pages/JobDetails';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
