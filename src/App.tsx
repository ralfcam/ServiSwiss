import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceSelection from './components/ServiceSelection';
import BookingProcess from './components/BookingProcess';
import ValueProposition from './components/ValueProposition';
import TrustSection from './components/TrustSection';
import BookingWorkflow from './components/BookingWorkflow';
import ContactSupport from './components/ContactSupport';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <ServiceSelection />
      <BookingProcess />
      <ValueProposition />
      <TrustSection />
      <BookingWorkflow />
      <ContactSupport />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;