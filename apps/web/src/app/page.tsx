import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Platforms from "@/components/Platforms";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <hr className="section-divider" />
        <HowItWorks />
        <hr className="section-divider" />
        <Features />
        <hr className="section-divider" />
        <Stats />
        <hr className="section-divider" />
        <Platforms />
        <hr className="section-divider" />
        <Pricing />
        <hr className="section-divider" />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
