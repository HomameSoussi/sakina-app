import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import './App.css'

// Components
import Header from './components/Header'
import Footer from './components/Footer'

// Pages
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import ScienceFaithPage from './pages/ScienceFaithPage'
import PricingPage from './pages/PricingPage'
import CrisisPage from './pages/CrisisPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/science-faith" element={<ScienceFaithPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/crisis" element={<CrisisPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
