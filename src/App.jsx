import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, CheckCircle, Star, BookOpen, Code, Zap, Users, Trophy, X } from "lucide-react";
import "./App.css";

function App() {
  const [dark, setDark] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
const courseData = [
    { 
      title: "MERN Stack", 
      icon: <Code size={24}/>, 
      desc: "Master MongoDB, Express, React, and Node.js by building full-stack clones.",
      duration: "12 Weeks",
      syllabus: ["Frontend UI with React", "Backend APIs with Node & Express", "Database Management with MongoDB", "Authentication & Deployment"]
    },
    { 
      title: "Data Structures", 
      icon: <Zap size={24}/>, 
      desc: "Crack top product-based companies with problem-solving mastery.",
      duration: "8 Weeks",
      syllabus: ["Arrays, Strings & Linked Lists", "Trees, Graphs & Tries", "Dynamic Programming", "Interview Mock Sessions"]
    },
    { 
      title: "Frontend Engineering", 
      icon: <Users size={24}/>, 
      desc: "Create stunning, modern UI/UX with React and standard CSS.",
      duration: "10 Weeks",
      syllabus: ["HTML, CSS & Advanced JavaScript", "React Hooks & State Management", "Framer Motion Animations", "Responsive Web Design"]
    }
  ];
  // Reusable animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  // --- NEW: Scroll function ---
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`app ${dark ? "dark-mode" : ""}`}>
      
      {/* NAVBAR */}
      <nav className="navbar glass">
        <div className="nav-container">
          <h2 className="logo">CodeMastery</h2>

          {/* NEW: Added onClick handlers to links */}
          <ul className="nav-links">
            <li onClick={() => scrollToSection("courses")}>Courses</li>
            <li onClick={() => scrollToSection("features")}>Features</li>
            <li onClick={() => scrollToSection("reviews")}>Reviews</li>
            <li onClick={() => scrollToSection("pricing")}>Pricing</li>
          </ul>

          <div className="nav-right">
            <button onClick={() => setDark(!dark)} className="toggle-btn">
              {dark ? <Sun size={20} color="#fbbf24" /> : <Moon size={20} color="#334155" />}
            </button>
            <button className="btn btn-primary nav-enroll">SignUp Now</button>
          </div>
        </div>
      </nav>

      {/* HERO (No ID needed, it's at the very top) */}
      <section className="hero">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>

        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="hero-title">
          Master the Art of <br />
          <span className="gradient-text">Full Stack Development</span>
        </motion.h1>
        
        <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="hero-subtitle">
          Go from beginner to pro. Learn MERN, master DSA, and build real-world applications that get you hired at top tech companies. 🚀
        </motion.p>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4 }} className="hero-buttons">
          <button className="btn btn-primary btn-large">Start Learning</button>
          <button className="btn btn-outline btn-large">Explore Courses</button>
        </motion.div>
      </section>

      {/* FEATURES - Added id="features" */}
      <section id="features" className="section bg-alt">
        <div className="section-container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="section-header">
            <h2>Why Choose Us</h2>
            <p>Everything you need to accelerate your tech career.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid-3">
            {[
              { icon: <BookOpen className="icon-blue" size={32}/>, title: "Structured Curriculum", desc: "No more tutorial hell. Follow a proven path from zero to mastery." },
              { icon: <Trophy className="icon-yellow" size={32}/>, title: "Placement Prep", desc: "Mock interviews, resume reviews, and direct referrals to our partners." },
              { icon: <Zap className="icon-purple" size={32}/>, title: "Live Projects", desc: "Build enterprise-grade applications that make your portfolio stand out." }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeUp} className="card feature-card">
                {feature.icon}
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* COURSES - Added id="courses" */}
{/* COURSES */}
      <section id="courses" className="section">
        <div className="section-container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="section-title">
            Popular Tracks
          </motion.h2>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid-3">
            {courseData.map((course, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp} 
                className="card course-card"
                onClick={() => setSelectedCourse(course)} // Opens the modal
              >
                <div className="course-header">
                  <div className="course-icon">{course.icon}</div>
                  <h3>{course.title}</h3>
                </div>
                <p>{course.desc}</p>
                <span className="course-link">View Details &rarr;</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MODAL OVERLAY */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCourse(null)} // Closes if you click outside the card
          >
            <motion.div
              className="modal-content card"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the card
            >
              <button className="close-btn" onClick={() => setSelectedCourse(null)}>
                <X size={24} />
              </button>
              
              <div className="course-header">
                <div className="course-icon">{selectedCourse.icon}</div>
                <h2>{selectedCourse.title}</h2>
              </div>
              
              <p className="modal-desc">{selectedCourse.desc}</p>
              
              <div className="modal-meta">
                <strong>Duration:</strong> {selectedCourse.duration}
              </div>
              
              <h4 className="syllabus-title">What you'll learn:</h4>
              <ul className="modal-syllabus">
                {selectedCourse.syllabus.map((item, i) => (
                  <li key={i}><CheckCircle size={16} className="check-icon" /> {item}</li>
                ))}
              </ul>
              
              <button className="btn btn-primary full-width">Enroll in this Track</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REVIEWS - Added id="reviews" */}
      <section id="reviews" className="section reviews-section">
        <div className="section-container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="section-title text-white">
            What Our Students Say
          </motion.h2>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid-3">
            {[
              { name: "Rahul S.", role: "SDE-1 at Amazon", review: "The DSA track completely changed my approach to problem-solving. I cracked my dream job within 4 months!" },
              { name: "Priya M.", role: "Frontend Developer", review: "I loved the focus on practical projects. The real-time chat app project taught me so much about React." },
              { name: "Amit K.", role: "Full Stack Engineer", review: "The MERN curriculum is top-notch. It bridges the gap between basic tutorials and actual production code." }
            ].map((testimonial, idx) => (
              <motion.div key={idx} variants={fadeUp} className="review-card">
                <div className="stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="review-text">"{testimonial.review}"</p>
                <div className="reviewer-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRICING - Added id="pricing" */}
      <section id="pricing" className="section">
        <div className="section-container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="section-title">
            Simple, Transparent Pricing
          </motion.h2>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid-3 pricing-grid">
            <motion.div variants={fadeUp} className="card pricing-card">
              <h4>Basic</h4>
              <h2>₹499<span>/mo</span></h2>
              <ul>
                <li><CheckCircle size={18} className="check-icon"/> Access to all basic courses</li>
                <li><CheckCircle size={18} className="check-icon"/> Community forum support</li>
              </ul>
              <button className="btn btn-outline full-width">Choose Basic</button>
            </motion.div>

            <motion.div variants={fadeUp} className="card pricing-card pro">
              <div className="popular-badge">Most Popular</div>
              <h4>Pro</h4>
              <h2>₹999<span>/mo</span></h2>
              <ul>
                <li><CheckCircle size={18} className="check-icon-pro"/> Everything in Basic</li>
                <li><CheckCircle size={18} className="check-icon-pro"/> Live doubt clearing</li>
                <li><CheckCircle size={18} className="check-icon-pro"/> Premium codebases</li>
              </ul>
              <button className="btn btn-white full-width">Get Pro Now</button>
            </motion.div>

            <motion.div variants={fadeUp} className="card pricing-card">
              <h4>Premium</h4>
              <h2>₹1999<span>/mo</span></h2>
              <ul>
                <li><CheckCircle size={18} className="check-icon"/> Everything in Pro</li>
                <li><CheckCircle size={18} className="check-icon"/> 1-on-1 Mentorship</li>
                <li><CheckCircle size={18} className="check-icon"/> Resume & Interview Prep</li>
              </ul>
              <button className="btn btn-outline full-width">Choose Premium</button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="cta-container">
          <h2>Ready to Level Up? 🚀</h2>
          <p>Join thousands of students who have already transformed their careers.</p>
          <button className="btn btn-primary btn-large cta-btn">Join CodeMastery Today</button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <p>© 2026 CodeMastery. All rights reserved.</p>
          
        </div>
      </footer>

    </div>
  );
}

export default App;