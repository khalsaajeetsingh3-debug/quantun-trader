import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Plans from './components/Plans';
import Earn from './components/Earn';
import Referral from './components/Referral';
import Dashboard from './components/Dashboard';
import Security from './components/Security';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { LoginPage, SignupPage } from './pages/auth';
import { UserDashboard } from './pages/dashboard';
import { DepositPage } from './pages/deposit';
import { WithdrawPage } from './pages/withdraw';
import { AdminPanel } from './pages/admin';

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Plans />
      <Earn />
      <Referral />
      <Dashboard />
      <Security />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/deposit" element={<DepositPage />} />
          <Route path="/withdraw" element={<WithdrawPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
