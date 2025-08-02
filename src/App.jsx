import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Play, Mail, Phone, MapPin, Award, Users, Video, Star, Quote, Calendar, Clock, Eye, Heart, Share2, ArrowRight, ArrowLeft, ArrowDown, ExternalLink } from 'lucide-react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [likedProjects, setLikedProjects] = useState(new Set())

  const scrollToSection = (sectionId) => {
    // Close the mobile menu first
    setIsMenuOpen(false)
    
    // Small delay to allow the menu to close before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        // Get the current scroll position
        const currentPosition = window.pageYOffset || document.documentElement.scrollTop
        
        // Get the element's position relative to the document
        const elementRect = element.getBoundingClientRect()
        const elementTop = elementRect.top + currentPosition
        
        // Calculate the offset, considering the navbar height
        const navbarHeight = 80
        const offsetTop = elementTop - navbarHeight
        
        // Scroll to the element
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
        
        // Update the active section
        setActiveSection(sectionId)
      }
    }, 300) // 300ms matches the menu close animation duration
  }

  const toggleLike = (projectIndex) => {
    const newLikedProjects = new Set(likedProjects)
    if (newLikedProjects.has(projectIndex)) {
      newLikedProjects.delete(projectIndex)
    } else {
      newLikedProjects.add(projectIndex)
    }
    setLikedProjects(newLikedProjects)
  }

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length)
  }

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'testimonials', 'contact']
      const scrollPosition = window.scrollY + 200 // Increased threshold for smoother detection

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.pageYOffset
          const elementBottom = elementTop + element.offsetHeight

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    // Debounce scroll events for smoother performance
    let timeoutId
    const debouncedScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        handleScroll()
      }, 10) // Small delay for smoother detection
    }

    window.addEventListener('scroll', debouncedScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', debouncedScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  const featuredProjects = [
    {
      title: "Choti Sarrdaarni",
      type: "Colors TV",
      year: "2019-2022",
      description: "A courageous woman battles against societal norms and political conspiracies to protect her child and uphold justice.",
      episodes: [
        { title: "Episode 1: New Beginnings", link: "https://www.hotstar.com/in/tv/choti-sarrdaarni/1260021501" },
        { title: "Episode 2: Challenges Arise", link: "https://www.hotstar.com/in/tv/choti-sarrdaarni/1260021502" }
      ],
      image: "/images/CS.jpg",
    },
    {
      title: "Muskuraane Ki Vajah Tum Ho",
      type: "Colors TV",
      year: "2022",
      description: "A strong single mother's journey of resilience and love as she confronts betrayal and seeks dignity in a judgmental society",
      episodes: [
        { title: "Pilot: A New Chapter", link: "https://www.sonyliv.com/shows/muskuraane-ki-vajah-tum-ho-1900000561" },
        { title: "Facing the Storm", link: "https://www.sonyliv.com/shows/muskuraane-ki-vajah-tum-ho-1900000562" }
      ],
      image: "/images/MKWTH.jpg",
    },
    {
      title: "Teri Meri Doriyaan",
      type: "Star Plus",
      year: "2022-2024",
      description: "A modern romantic drama showcasing three intertwined love stories destined by fate, yet challenged by misunderstandings.",
      episodes: [
        { title: "Premiere: Threads of Fate", link: "https://www.voot.com/shows/teri-meri-doriyaan/1/1029376" },
        { title: "Crossed Paths", link: "https://www.voot.com/shows/teri-meri-doriyaan/1/1029377" }
      ],
      image: "/images/TMD.jpg",
    }
  ]

  const allProjects = [
    {
      title: "Choti Sarrdaarni",
      type: "Colors TV",
      year: "2019-2022",
      description: "A courageous woman battles against societal norms and political conspiracies to protect her child and uphold justice.",
      episodes: [
        { title: "Episode 1: New Beginnings", link: "https://www.hotstar.com/in/tv/choti-sarrdaarni/1260021501" },
        { title: "Episode 2: Challenges Arise", link: "https://www.hotstar.com/in/tv/choti-sarrdaarni/1260021502" }
      ],
      image: "/images/CS.jpg",
    },
    {
      title: "Muskuraane Ki Vajah Tum Ho",
      type: "Colors TV",
      year: "2022",
      description: "A strong single mother's journey of resilience and love as she confronts betrayal and seeks dignity in a judgmental society",
      episodes: [
        { title: "Pilot: A New Chapter", link: "https://www.sonyliv.com/shows/muskuraane-ki-vajah-tum-ho-1900000561" },
        { title: "Facing the Storm", link: "https://www.sonyliv.com/shows/muskuraane-ki-vajah-tum-ho-1900000562" }
      ],
      image: "/images/MKWTH.jpg",
    },
    {
      title: "Teri Meri Doriyaan",
      type: "Star Plus",
      year: "2022-2024",
      description: "A modern romantic drama showcasing three intertwined love stories destined by fate, yet challenged by misunderstandings.",
      episodes: [
        { title: "Premiere: Threads of Fate", link: "https://www.voot.com/shows/teri-meri-doriyaan/1/1029376" },
        { title: "Crossed Paths", link: "https://www.voot.com/shows/teri-meri-doriyaan/1/1029377" }
      ],
      image: "/images/TMD.jpg",
    },
    {
      title: "Harphoul Mohini",
      type: "Colors TV",
      year: "2022",
      description: "A light-hearted cultural clash love story between a Haryanvi boy and a South Indian girl brought together by destiny.",
      episodes: [
        { title: "Pilot: City Lights", link: "#" },
        { title: "Midnight Confessions", link: "#" }
      ],
      image: "/images/HM.jpg",
    },
    {
      title: "Deewaniyat",
      type: "Star Plus",
      year: "2024-2025",
      description: "A passionate tale of love, obsession, and betrayal where emotions run deep and consequences are life-changing.",
      episodes: [
        { title: "Act 1: Opening Night", link: "#" },
        { title: "Act 2: Center Stage", link: "#" }
      ],
      image: "/images/DEE.jpg",
    },
    {
      title: "Kahani Pehle Pyaar ki",
      type: "Dangal TV",
      year: "2025",
      description: "A heartfelt story set in Bhopal, where Neha’s childhood love for Sanju is tested by time, destiny, and self-discovery.",
      episodes: [
        { title: "Episode 1: The Strategist's Mind", link: "#" },
        { title: "Episode 2: Battlefield Tactics", link: "#" }
      ],
      image: "/images/KPPK.jpg",
    }
  ]

  const testimonials = [
    {
      name: "Anita Raj",
      role: "Actress",
      content: "Prabhat's creative vision transformed our script into truly cinematic. His ability to capture emotion in every frame elevated the entire production.",
      avatar: "/images/Anita.jpg",
      rating: 5
    },
    {
      name: "Jaladh Sharma",
      role: "Director",
      content: "Working with Prabhat was a masterclass in direction. He brought clarity, intensity, and beauty to every scene, making our show a standout success.",
      avatar: "/images/Jaladh.jpg",
      rating: 5
    },
    {
      name: "Surendra Pal",
      role: "Actor",
      content: "From day one, Prabhat understood the soul of our story. His direction not only enhanced the narrative but created moments that viewers will remember forever.",
      avatar: "/images/Surendra.jpg",
      rating: 5
    },
    {
      name: "Surendra Pal",
      role: "Actor",
      content: "From day one, Prabhat understood the soul of our story. His direction not only enhanced the narrative but created moments that viewers will remember forever.",
      avatar: "/images/Surendra.jpg",
      rating: 5
    },
    {
      name: "Surendra Pal",
      role: "Actor",
      content: "From day one, Prabhat understood the soul of our story. His direction not only enhanced the narrative but created moments that viewers will remember forever.",
      avatar: "/images/Surendra.jpg",
      rating: 5
    },
    {
      name: "Surendra Pal",
      role: "Actor",
      content: "From day one, Prabhat understood the soul of our story. His direction not only enhanced the narrative but created moments that viewers will remember forever.",
      avatar: "/images/Surendra.jpg",
      rating: 5
    }
  ]

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <motion.div 
          className="nav-container"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="nav-links desktop-nav">
            {['home', 'about', 'projects', 'testimonials', 'contact'].map((section) => (
              <button
                key={section}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={() => scrollToSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </motion.div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {['home', 'about', 'projects', 'testimonials', 'contact'].map((section) => (
                <button
                  key={section}
                  className={`mobile-nav-link ${activeSection === section ? 'active' : ''}`}
                  onClick={() => scrollToSection(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="hero-bg-image" style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop)`
          }}></div>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hero-text"
          >
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Prabhat Rawat
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Director & Creative Visionary
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Bringing compelling stories to life through innovative direction and cinematic excellence
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="hero-buttons"
            >
            <motion.button 
                className="cta-button primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
            >
              <Play className="play-icon" />
              View My Work
            </motion.button>
              <motion.button 
                className="cta-button secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
              >
                <Mail className="mail-icon" />
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-stats"
          >
            <motion.div 
              className="stat"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3>10+</h3>
              <p>Years Experience</p>
            </motion.div>
            <motion.div 
              className="stat"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3>6+</h3>
              <p>Shows Directed</p>
            </motion.div>
            <motion.div 
              className="stat"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3>25+</h3>
              <p>Years in Industry</p>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onClick={() => scrollToSection('about')}
        >
          <ArrowDown className="scroll-arrow" />
        </motion.div>
      </section>

      {/* Featured Project Carousel */}
      <section className="featured-project">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Featured Project</h2>
            <p>Latest work that made waves in the industry</p>
          </motion.div>

          <div className="featured-carousel">
            <motion.div
              key={currentProjectIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="featured-content"
            >
              <div className="featured-image">
                <img src={featuredProjects[currentProjectIndex].image} alt={featuredProjects[currentProjectIndex].title} />
              </div>
              <div className="featured-info">
                <h3>{featuredProjects[currentProjectIndex].title}</h3>
                <p className="featured-type">{featuredProjects[currentProjectIndex].type} • {featuredProjects[currentProjectIndex].year}</p>
                <p className="featured-description">{featuredProjects[currentProjectIndex].description}</p>
                <div className="episode-links">
                  <h4>Featured Episodes:</h4>
                  <div className="episode-list">
                    {featuredProjects[currentProjectIndex].episodes.map((episode, index) => (
                      <a 
                        key={index} 
                        href={episode.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="episode-link"
                      >
                        <ExternalLink size={14} />
                        {episode.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="carousel-controls">
              <button className="carousel-btn" onClick={prevProject}>
                <ArrowLeft />
              </button>
              <div className="carousel-dots">
                {featuredProjects.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${index === currentProjectIndex ? 'active' : ''}`}
                    onClick={() => setCurrentProjectIndex(index)}
                  />
                ))}
              </div>
              <button className="carousel-btn" onClick={nextProject}>
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>About Me</h2>
            <p>Passionate storyteller with a unique vision for television</p>
          </motion.div>

          <div className="about-content">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="about-text"
            >
              <p>
              With over a decade in the Indian television industry, I've had the privilege of directing 
              and setting up some of the most talked-about shows across Colors and StarPlus. My directorial 
              vision blends emotionally grounded storytelling with high production value to create engaging 
              narratives that resonate with diverse audiences.
              </p>
              <p>
              I specialize in primetime drama series, handling everything from show setup to daily episode 
              execution with precision. Collaborating with leading production houses like Cockrow & Shaika 
              Entertainment, my work has consistently delivered strong TRPs and audience loyalty, earning 
              critical acclaim and recognition in industry circles.
              </p>
              
              <div className="skills">
                <h3>Expertise</h3>
                <div className="skill-tags">
                  <span>Drama Series</span>
                  <span>Post-Production</span>
                  <span>Creative Direction</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="about-image"
            >
              <img 
                src="/images/Prabhat.jpg"
                alt="Prabhat Rawat - TV Director"
                className="director-portrait"
              />
              <div className="experience-badge">
                <Calendar className="calendar-icon" />
                <span>10+ Years</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Featured Projects</h2>
            <p>A showcase of my recent projects</p>
          </motion.div>

          <div className="projects-grid">
            {allProjects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}

              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-info">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <div className="project-meta">
                      <span className="project-type">{project.type}</span>
                      <span className="project-year">{project.year}</span>
                    </div>
                  </div>
                  <p>{project.description}</p>
                  <div className="episode-links">
                    <h4>Featured Episodes:</h4>
                    <div className="episode-list">
                      {project.episodes.slice(0, 2).map((episode, index) => (
                        <a 
                          key={index} 
                          href={episode.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="episode-link"
                        >
                          <ExternalLink size={12} />
                          {episode.title}
                        </a>
                      ))}
                      {project.episodes.length > 2 && (
                        <span className="more-episodes">+{project.episodes.length - 2} more episodes</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>What People Say</h2>
            <p>Testimonials from industry professionals and collaborators</p>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="testimonial-content">
                  <Quote className="quote-icon" />
                  <p>{testimonial.content}</p>
                </div>
                <div className="testimonial-author">
                  <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                    <div className="rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="star-icon" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Get In Touch</h2>
            <p>Let's discuss your next project</p>
          </motion.div>

          <div className="contact-content">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="contact-info"
            >
              <h3>Contact Information</h3>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <div>
                  <h4>Email</h4>
                  <p>prabhatrawat75@gmail.com</p>
                </div>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <div>
                  <h4>Phone</h4>
                  <p>+91 7718018881</p>
                </div>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div>
                  <h4>Location</h4>
                  <p>Mumbai, Maharashtra</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="social-section"
            >
              <h3>Follow My Work</h3>
              <div className="social-links">
                <div className="social-icons">
                  <a href="#" className="social-link">IMDb</a>
                  <a href="#" className="social-link">LinkedIn</a>
                  <a href="https://www.instagram.com/prabhatrawat75?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="social-link">Instagram</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <Video className="logo-icon" />
              <span>Prabhat Rawat</span>
            </div>
            <p>&copy; 2024 Prabhat Rawat. All rights reserved. | Developed by Deepak Rana</p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            className="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              className="video-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setIsVideoPlaying(false)}>
                <X />
              </button>
              <video controls autoPlay>
                <source src={featuredProjects[currentProjectIndex].video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
