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
    <div id="top" className="bg-white min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white px-3 py-2 rounded">
        Skip to content
      </a>
      <Navbar />
      <main id="main" role="main">
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
      </main>
      <Footer />
    </div>
  );
}

export default App;


