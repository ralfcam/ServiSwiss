import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServiceSelection from '../features/services/components/ServiceSelection';
import BookingProcess from '../components/BookingProcess';
import ValueProposition from '../components/ValueProposition';
import TrustSection from '../components/TrustSection';
import BookingWorkflow from '../components/BookingWorkflow';
import ContactSupport from '../components/ContactSupport';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import BookingDashboard from '../features/bookings/components/BookingDashboard';

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
      <div id="bookings">
        <BookingDashboard />
      </div>
      <Footer />
    </div>
  );
}

export default App;


