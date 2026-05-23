import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, MapPin, MessageCircle, Calendar, ChevronRight } from 'lucide-react';

// --- Custom Scroll Animation Component ---
const Reveal = ({ children, direction = "up", delay = 0, duration = 1000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Remove observer if you only want it to animate once
          // observer.unobserve(entry.target); 
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15, // Triggers when 15% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  // Define starting states based on direction
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

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle navbar styling on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    { name: 'Premium Washes', desc: 'Detailed exterior and interior cleaning.' },
    { name: 'PPF (Paint Protection Film)', desc: 'Invisible shield against scratches and chips.' },
    { name: 'Graphene Coating', desc: 'Advanced heat dissipation and water resistance.' },
    { name: 'Ceramic Coating', desc: 'Long-lasting high-gloss protective layer.' },
    { name: 'Paint Correction', desc: 'Removal of swirl marks and deep scratches.' },
    { name: 'Restoration', desc: 'Bringing your vehicle back to showroom condition.' },
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans selection:bg-orange-500 selection:text-white overflow-hidden">
      
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/95 backdrop-blur-md py-4 shadow-lg shadow-orange-500/10' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <h1 className="text-2xl font-bold tracking-tighter">
                THE <span className="text-orange-500">VAAHAN</span> LAB
              </h1>
              <p className="text-[10px] tracking-widest text-zinc-400 uppercase">Detailing, the lab way</p>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-orange-500 transition-colors">Services</button>
              <button onClick={() => scrollToSection('gallery')} className="text-sm font-medium hover:text-orange-500 transition-colors">Gallery</button>
              <button onClick={() => scrollToSection('booking')} className="text-sm font-medium hover:text-orange-500 transition-colors">Book Now</button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:text-orange-500 transition-colors">Contact</button>
              
              <Link 
                to="/about" 
                className="group relative inline-flex items-center justify-center px-6 py-2 text-sm font-bold text-white bg-zinc-800 border border-zinc-700 rounded-full overflow-hidden transition-all duration-300 hover:bg-zinc-700 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
              >
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-orange-500"></span>
                <span className="relative flex items-center gap-2">
                  About Us <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-orange-500">
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-zinc-900 border-t border-zinc-800 shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              <button onClick={() => scrollToSection('services')} className="w-full text-left py-3 text-white hover:text-orange-500 border-b border-zinc-800">Services</button>
              <button onClick={() => scrollToSection('gallery')} className="w-full text-left py-3 text-white hover:text-orange-500 border-b border-zinc-800">Gallery</button>
              <button onClick={() => scrollToSection('booking')} className="w-full text-left py-3 text-white hover:text-orange-500 border-b border-zinc-800">Book Now</button>
              <button onClick={() => scrollToSection('contact')} className="w-full text-left py-3 text-white hover:text-orange-500 border-b border-zinc-800">Contact</button>
              <Link to="/about" className="w-full text-left py-3 text-orange-500 font-bold flex items-center justify-between">
                About Us <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
       <img 
  src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop" 
  alt="Premium SUV Detailing" 
  className="w-full h-full object-cover opacity-40"
/>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <Reveal direction="down" delay={200}>
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm">
              <span className="text-orange-400 text-sm font-semibold tracking-wide uppercase">Open Now</span>
            </div>
          </Reveal>
          
          <Reveal direction="up" delay={400}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Revive Your Ride's <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Ultimate Shine</span>
            </h1>
          </Reveal>
          
          <Reveal direction="up" delay={600}>
            <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
              Experience premium car & bike detailing with state-of-the-art protection. 
              We don't just wash; we restore, protect, and perfect.
            </p>
          </Reveal>
          
          <Reveal direction="bubble" delay={800}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('booking')}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-md font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(234,88,12,0.3)]"
              >
                Book an Appointment
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white px-8 py-4 rounded-md font-bold transition-all duration-300"
              >
                Explore Services
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Introductory Offers Banner */}
      <Reveal direction="up" delay={0}>
        <div className="bg-gradient-to-r from-orange-600 to-red-600 py-4 relative z-20 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 text-center">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Introductory Offers</h3>
            <div className="flex gap-6 font-semibold text-lg bg-black/20 px-6 py-2 rounded-full">
              <span>Car Wash @ ₹399</span>
              <span className="text-white/50">|</span>
              <span>Bike Wash @ ₹99</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Services Section */}
      <section id="services" className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="down">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Our <span className="text-orange-500">Services</span></h2>
              <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full mb-6"></div>
              <p className="text-zinc-400 max-w-2xl mx-auto">Comprehensive detailing solutions engineered to protect and enhance your vehicle's aesthetic appeal.</p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Reveal 
                key={index} 
                direction={index % 2 === 0 ? "left" : "right"} 
                delay={index * 150}
              >
                <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-orange-500/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/5 h-full">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <div className="w-6 h-6 bg-orange-500 rounded-sm rotate-45"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                  <p className="text-zinc-400 leading-relaxed">{service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-zinc-900 border-y border-zinc-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="left">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">The <span className="text-orange-500">Gallery</span></h2>
                <div className="h-1 w-20 bg-orange-500 rounded-full"></div>
              </div>
              <p className="text-zinc-400 mt-4 md:mt-0">Witness the transformation.</p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Reveal direction="bubble" delay={100}><img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop" alt="Ceramic Coating" className="w-full h-64 object-cover rounded-xl hover:opacity-75 transition-opacity cursor-pointer" /></Reveal>
            <Reveal direction="bubble" delay={200}><div className="h-full lg:col-span-2"><img src="https://images.unsplash.com/photo-1555006691-18cb9dce6c28?q=80&w=2070&auto=format&fit=crop" alt="Bike Detailing" className="w-full h-full object-cover rounded-xl hover:opacity-75 transition-opacity cursor-pointer" /></div></Reveal>
            <Reveal direction="bubble" delay={300}><img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" alt="Interior Cleaning" className="w-full h-64 object-cover rounded-xl hover:opacity-75 transition-opacity cursor-pointer" /></Reveal>
            <Reveal direction="bubble" delay={400}><div className="h-full lg:col-span-2"><img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop" alt="Car Wash" className="w-full h-full object-cover rounded-xl hover:opacity-75 transition-opacity cursor-pointer" /></div></Reveal>
            <Reveal direction="bubble" delay={500}><img src="https://images.unsplash.com/photo-1632823462943-41dc393f3b90?q=80&w=2070&auto=format&fit=crop" alt="Paint Correction" className="w-full h-64 object-cover rounded-xl hover:opacity-75 transition-opacity cursor-pointer" /></Reveal>
            <Reveal direction="bubble" delay={600}><img src="https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=2070&auto=format&fit=crop" alt="Wheel Detailing" className="w-full h-64 object-cover rounded-xl hover:opacity-75 transition-opacity cursor-pointer" /></Reveal>
          </div>
        </div>
      </section>

      {/* Free Booking Form Section */}
      <section id="booking" className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/5 blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="up">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Book Your <span className="text-orange-500">Session</span></h2>
                <p className="text-zinc-400">Fill out the form below to schedule your vehicle's spa day. No upfront payment required.</p>
              </div>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Full Name</label>
                    <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Phone Number</label>
                    <input type="tel" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors" placeholder="+91 00000 00000" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Select Service</label>
                    <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors appearance-none" defaultValue="">
                      <option value="" disabled>Choose a service</option>
                      <option>Intro Car Wash (₹399)</option>
                      <option>Intro Bike Wash (₹99)</option>
                      <option>Premium Wash</option>
                      <option>Ceramic/Graphene Coating</option>
                      <option>PPF Installation</option>
                      <option>Complete Restoration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Preferred Date</label>
                    <div className="relative">
                      <input type="date" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Vehicle Make & Model (Optional)</label>
                  <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors" placeholder="e.g., Kia Seltos, Royal Enfield Classic" />
                </div>

                <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-lg transition-all duration-300 mt-4 flex justify-center items-center gap-2 transform hover:-translate-y-1">
                  <Calendar size={20} />
                  Confirm Booking Request
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black pt-20 pb-10 border-t border-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            
            {/* Brand Info */}
            <Reveal direction="right">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter">
                    THE <span className="text-orange-500">VAAHAN</span> LAB
                  </h2>
                  <p className="text-xs tracking-widest text-zinc-500 uppercase mt-1">Detailing, the lab way</p>
                </div>
                <p className="text-zinc-400 leading-relaxed max-w-sm">
                  Aligarh's premier car detailing studio. We use scientifically backed methods and premium products to ensure your vehicle gets the ultimate care it deserves.
                </p>
              </div>
            </Reveal>

            {/* Quick Links */}
            <Reveal direction="up" delay={200}>
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
                <ul className="space-y-4 text-zinc-400">
                  <li><button onClick={() => scrollToSection('services')} className="hover:text-orange-500 transition-colors">Our Services</button></li>
                  <li><button onClick={() => scrollToSection('gallery')} className="hover:text-orange-500 transition-colors">Portfolio</button></li>
                  <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
                  <li><button onClick={() => scrollToSection('booking')} className="hover:text-orange-500 transition-colors">Book Appointment</button></li>
                </ul>
              </div>
            </Reveal>

            {/* Contact Info */}
            <Reveal direction="left" delay={400}>
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <MapPin className="text-orange-500 mt-1 flex-shrink-0" size={24} />
                    <span className="text-zinc-400 leading-relaxed">
                      2/334, Niranjanpuri, Behind Shanti Nursing Home,<br/>
                      Opp. Paul Nursing Home, Ramghat Road,<br/>
                      Aligarh, Uttar Pradesh 202001
                    </span>
                  </li>
                  <li className="flex items-center gap-4">
                    <Phone className="text-orange-500 flex-shrink-0" size={24} />
                    <div className="flex flex-col text-zinc-400">
                      <a href="tel:7500810200" className="hover:text-white transition-colors">7500-8102-00</a>
                      <a href="tel:8265927476" className="hover:text-white transition-colors">8265-9274-76</a>
                    </div>
                  </li>
                </ul>
                
                {/* Social Media */}
                <div className="flex gap-4 mt-8">
                  <a href="#" className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:bg-orange-600 hover:text-white transition-all duration-300 transform hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="https://wa.me/917500810200" target="_blank" rel="noreferrer" className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110">
                    <MessageCircle size={20} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal direction="up" delay={600}>
            <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-zinc-600 text-sm">
                &copy; {new Date().getFullYear()} The Vaahan Lab. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-zinc-600">
                <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
              </div>
            </div>
          </Reveal>
        </div>
      </footer>
    </div>
  );
};

export default Landing;