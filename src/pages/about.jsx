import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Shield, Sparkles, Beaker, MapPin, Award } from 'lucide-react';

// --- Custom Scroll Animation Component (Same as Landing) ---
const Reveal = ({ children, direction = "up", delay = 0, duration = 1000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  let hiddenClasses = "opacity-0 ";
  if (direction === "up") hiddenClasses += "translate-y-16";
  if (direction === "down") hiddenClasses += "-translate-y-16";
  if (direction === "left") hiddenClasses += "-translate-x-16";
  if (direction === "right") hiddenClasses += "translate-x-16";
  if (direction === "bubble") hiddenClasses += "scale-75 translate-y-10";

  const visibleClasses = "opacity-100 translate-y-0 translate-x-0 scale-100";

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${isVisible ? visibleClasses : hiddenClasses}`}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
// -----------------------------------------

const About = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <Beaker className="w-8 h-8 text-orange-500" />,
      title: "The Lab Philosophy",
      desc: "We don't just wash cars; we engineer perfection. Every vehicle undergoes a systematic, scientifically-backed detailing process to ensure flawless results without compromising the paint's integrity."
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      title: "Premium Protection",
      desc: "From advanced Graphene and Ceramic coatings to self-healing PPF, we use industry-leading materials to shield your vehicle against harsh Indian weather, UV rays, and road debris."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-orange-500" />,
      title: "Meticulous Restoration",
      desc: "Our paint correction and deep interior vacuuming services remove years of wear, swirl marks, and stains, bringing your car or bike back to its ultimate showroom shine."
    },
    {
      icon: <Award className="w-8 h-8 text-orange-500" />,
      title: "Expert Craftsmanship",
      desc: "Our detailing technicians are highly trained perfectionists. Whether it's a routine ₹399 wash or a complete restoration, we treat every vehicle like a masterpiece."
    }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans selection:bg-orange-500 selection:text-white pb-20 overflow-hidden">
      
      {/* Simple Navigation */}
      <nav className="w-full bg-zinc-950/80 backdrop-blur-md py-6 fixed top-0 z-50 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link 
            to="/" 
            className="group flex items-center gap-2 text-zinc-400 hover:text-orange-500 transition-colors font-medium text-sm"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="text-right">
            <h2 className="text-xl font-bold tracking-tighter">
              THE <span className="text-orange-500">VAAHAN</span> LAB
            </h2>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal direction="down" delay={100}>
            <p className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4">Our Story</p>
          </Reveal>
          
          <Reveal direction="up" delay={300}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              Detailing, <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">The Lab Way.</span>
            </h1>
          </Reveal>
          
          <Reveal direction="up" delay={500}>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto">
              Located in the heart of Aligarh, The Vaahan Lab was born out of a pure passion for automotive excellence. We recognized that traditional car washes were doing more harm than good to vehicle paint. That's why we created a "Lab" — a controlled, premium environment where advanced detailing meets unmatched precision.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Image Break */}
      <section className="max-w-6xl mx-auto px-4 mb-24">
        <Reveal direction="bubble" delay={200}>
          <div className="relative rounded-3xl overflow-hidden h-[400px] border border-zinc-800 shadow-[0_0_40px_rgba(234,88,12,0.1)]">
            <img 
              src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop" 
              alt="The Vaahan Lab Detailing Process" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
          </div>
        </Reveal>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Reveal 
              key={index} 
              direction={index % 2 === 0 ? "left" : "right"} 
              delay={index * 150}
            >
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-orange-500/30 transition-colors h-full">
                <div className="bg-zinc-950 border border-zinc-800 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Location / Visit Us Section */}
      <section className="max-w-5xl mx-auto px-4">
        <Reveal direction="up" delay={200}>
          <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="text-orange-500 w-8 h-8" />
                  <h2 className="text-3xl font-bold">Visit The Studio</h2>
                </div>
                <p className="text-zinc-300 text-lg mb-6 leading-relaxed">
                  Bring your vehicle to our state-of-the-art facility in Aligarh to experience the introductory offers and premium services firsthand.
                </p>
                <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
                  <p className="text-zinc-400 leading-relaxed font-medium">
                    2/334, Niranjanpuri,<br />
                    Behind Shanti Nursing Home,<br />
                    Opp. Paul Nursing Home, Ramghat Road,<br />
                    Aligarh, Uttar Pradesh 202001
                  </p>
                </div>
              </div>
              
              <div className="flex-1 w-full flex flex-col gap-4">
                <a 
                  href="https://maps.google.com/?q=The+Vaahan+Lab+Aligarh+Ramghat+Road" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full text-center bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl font-bold transition-colors border border-zinc-700"
                >
                  Get Directions
                </a>
                <Link 
                  to="/" 
                  className="w-full text-center bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.2)] transform hover:-translate-y-1"
                >
                  Book an Appointment
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default About;