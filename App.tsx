import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import ProjectsPage from './components/pages/ProjectsPage';
import ProjectDetailPage from './components/pages/ProjectDetailPage';
import AboutPage from './components/pages/AboutPage';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from './components/ThemeContext';
import { LightboxProvider } from './components/LightboxContext';

function App() {
  return (
    <ThemeProvider>
      <LightboxProvider>
        <HashRouter>
          <ScrollToTop />
          <div className="bg-brand-light dark:bg-brand-black transition-colors duration-300">
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </HashRouter>
      </LightboxProvider>
    </ThemeProvider>
  );
}

export default App;