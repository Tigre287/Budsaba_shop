import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FlowerShowcase from './components/FlowerShowcase';
import AboutUs from './components/AboutUs';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';

function HomePage() {
  return (
    <>
      <Hero />
      <FlowerShowcase />
      <AboutUs />
      <OrderForm />
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#fffafb]">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/admin" 
              element={
                isAuthenticated ? (
                  <AdminDashboard />
                ) : (
                  <Login onLogin={setIsAuthenticated} />
                )
              } 
            />
            {/* Catch all to redirect to home or 404 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
