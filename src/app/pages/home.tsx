import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import BrochureSection from "@/components/BrochureSection";
import ContactSection from "@/components/ContactSection";
import PartnersSection from "@/components/PartnersSection";
import TeamModal from "@/components/TeamModal";
import EventsModal from "@/components/EventsModal";
import Footer from "@/components/Footer";
import { revealOnScroll } from "@/lib/utils";
import "@/app/globals.css";
export default function Home() {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  
  // Function to open team modal, can be triggered from anywhere
  const openTeamModal = () => {
    setIsTeamModalOpen(true);
  };
  
  // Function to open events modal, can be triggered from anywhere
  const openEventsModal = () => {
    setIsEventsModalOpen(true);
  };
  
  // Add global window properties to allow opening of modals from other components
  useEffect(() => {
    
    window.openTeamModal = openTeamModal;
        window.openEventsModal = openEventsModal;
    
    return () => {
    
      delete window.openTeamModal;
          delete window.openEventsModal;
    };
  }, []);

  useEffect(() => {
    // Initialize reveal on scroll
    revealOnScroll();
    
    // Add scroll event listener
    window.addEventListener("scroll", revealOnScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", revealOnScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <PartnersSection />
      <BrochureSection />
      <ContactSection />
      <Footer />
      
      {/* Team Modal - only renders in DOM when open */}
      <TeamModal 
        isOpen={isTeamModalOpen} 
        onClose={() => setIsTeamModalOpen(false)} 
      />
      
      {/* Events Modal - only renders in DOM when open */}
      <EventsModal 
        isOpen={isEventsModalOpen} 
        onClose={() => setIsEventsModalOpen(false)} 
      />
    </div>
  );
}
