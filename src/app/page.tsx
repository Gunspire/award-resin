import React from "react";

import { Reveal } from "../components/Reveal";
import { BeforeAfterSection } from "../sections/BeforeAfterSection";
import { BottomCtaSection } from "../sections/BottomCtaSection";
import { ChatWidget } from "../sections/ChatWidget";
import { CtaBand } from "../sections/CtaBand";
import { FaqSection } from "../sections/FaqSection";
import { Footer } from "../sections/Footer";
import { GallerySection } from "../sections/GallerySection";
import { Header } from "../sections/Header";
import { HeroSection } from "../sections/HeroSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { ReviewsSection } from "../sections/ReviewsSection";
import { ServiceAreaSection } from "../sections/ServiceAreaSection";
import { ServicesSection } from "../sections/ServicesSection";
import { TrustStrip } from "../sections/TrustStrip";
import { WhyChooseUs } from "../sections/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <HeroSection />
      <Reveal>
        <TrustStrip />
      </Reveal>
      <Reveal>
        <WhyChooseUs />
      </Reveal>
      <Reveal>
        <ServicesSection />
      </Reveal>
      <Reveal>
        <BeforeAfterSection />
      </Reveal>
      <Reveal>
        <ProjectsSection />
      </Reveal>
      <Reveal>
        <ReviewsSection />
      </Reveal>
      <Reveal>
        <GallerySection />
      </Reveal>
      <Reveal>
        <FaqSection />
      </Reveal>
      <Reveal>
        <CtaBand />
      </Reveal>
      <Reveal>
        <ServiceAreaSection />
      </Reveal>
      <Reveal>
        <BottomCtaSection />
      </Reveal>
      <Reveal>
        <Footer />
      </Reveal>
      <ChatWidget />
    </div>
  );
}
