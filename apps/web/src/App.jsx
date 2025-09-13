import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Contexts
import { LanguageProvider } from './contexts/LanguageContext'

// Components
import Header from './components/Header'
import Footer from './components/Footer'

// Pages
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import ScienceFaithPage from './pages/ScienceFaithPage'
import PricingPage from './pages/PricingPage'
import CrisisPage from './pages/CrisisPage'
import PrayerTimesPage from './pages/PrayerTimesPage'
import ToolsPage from './pages/ToolsPage'
import DonatePage from './pages/DonatePage'

function App() {
  return (
    <LanguageProvider>
      <div className="App">
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
                <Route path="/prayer-times" element={<PrayerTimesPage />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/donate" element={<DonatePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </div>
    </LanguageProvider>
  )
}

export default App
