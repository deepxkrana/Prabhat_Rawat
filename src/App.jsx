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
      title: "Breaking Boundaries",
      type: "Drama Series",
      year: "2023",
      description: "Award-winning drama series exploring complex human relationships",
      awards: ["Emmy Nomination", "Golden Globe"],
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      rating: 4.8,
      views: "2.3M",
      duration: "45 min"
    },
    {
      title: "Real Lives",
      type: "Reality Series",
      year: "2022",
      description: "Groundbreaking reality show that redefined the genre",
      awards: ["Critics Choice", "Peabody Award"],
      image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&h=600&fit=crop",
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      rating: 4.6,
    },
    {
      title: "The Last Frontier",
      type: "Documentary",
      year: "2021",
      description: "Cinematic documentary about environmental conservation",
      awards: ["Oscar Shortlist", "Sundance"],
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      rating: 4.9,
      views: "3.1M",
      duration: "90 min"
    }
  ]

  const allProjects = [
    {
      title: "Breaking Boundaries",
      type: "Drama Series",
      year: "2023",
      description: "Award-winning drama series exploring complex human relationships",
      awards: ["Emmy Nomination", "Golden Globe"],
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
      rating: 4.8,
      views: "2.3M",
      duration: "45 min"
    },
    {
      title: "Real Lives",
      type: "Reality Series",
      year: "2022",
      description: "Groundbreaking reality show that redefined the genre",
      awards: ["Critics Choice", "Peabody Award"],
      image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&h=600&fit=crop",
      rating: 4.6,
      views: "1.8M",
      duration: "60 min"
    },
    {
      title: "The Last Frontier",
      type: "Documentary",
      year: "2021",
      description: "Cinematic documentary about environmental conservation",
      awards: ["Oscar Shortlist", "Sundance"],
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      rating: 4.9,
      views: "3.1M",
      duration: "90 min"
    },
    {
      title: "City Nights",
      type: "Drama Series",
      year: "2020",
      description: "Urban drama that captured the essence of modern city life",
      awards: ["Screen Actors Guild", "Directors Guild"],
      image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",
      rating: 4.7,
      views: "1.9M",
      duration: "50 min"
    },
    {
      title: "Live from Broadway",
      type: "Live Special",
      year: "2019",
      description: "Historic live television event celebrating theater",
      awards: ["Primetime Emmy", "Tony Award"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      rating: 4.5,
      views: "1.2M",
      duration: "120 min"
    },
    {
      title: "The Art of War",
      type: "Documentary Series",
      year: "2018",
      description: "Epic documentary series on military strategy and history",
      awards: ["Peabody Award", "Emmy Award"],
      image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&h=600&fit=crop",
      rating: 4.8,
      views: "2.7M",
      duration: "75 min"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Executive Producer, Netflix",
      content: "Alex has an incredible eye for storytelling. His direction brought our series to life in ways we never imagined possible.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Studio Head, Warner Bros.",
      content: "Working with Alex was a game-changer for our production. His creative vision and technical expertise are unmatched.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Award-winning Actress",
      content: "Alex creates an environment where actors can truly shine. His direction is both challenging and inspiring.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
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
              Alex Chen
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              TV Show Director & Creative Visionary
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
              <h3>15+</h3>
              <p>Years Experience</p>
            </motion.div>
            <motion.div 
              className="stat"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3>50+</h3>
              <p>Shows Directed</p>
            </motion.div>
            <motion.div 
              className="stat"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3>25+</h3>
              <p>Awards Won</p>
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
            <p>Latest work that's making waves in the industry</p>
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
                <div className="featured-overlay">
                  <button className="play-button large" onClick={() => setIsVideoPlaying(true)}>
                    <Play />
                  </button>
                </div>

              </div>
              <div className="featured-info">
                <h3>{featuredProjects[currentProjectIndex].title}</h3>
                <p className="featured-type">{featuredProjects[currentProjectIndex].type} • {featuredProjects[currentProjectIndex].year}</p>
                <p className="featured-description">{featuredProjects[currentProjectIndex].description}</p>
                <div className="featured-awards">
                  {featuredProjects[currentProjectIndex].awards.map((award, index) => (
                    <span key={index} className="award-tag">
                      <Award className="award-icon" />
                      {award}
                    </span>
                  ))}
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
                With over 15 years in the television industry, I've had the privilege of directing 
                some of the most compelling shows on air. My approach combines traditional storytelling 
                techniques with cutting-edge technology to create unforgettable viewing experiences.
              </p>
              <p>
                I specialize in drama series, reality television, and documentary programming, 
                always pushing the boundaries of what's possible in the medium. My work has been 
                recognized with numerous industry awards and critical acclaim.
              </p>
              
              <div className="skills">
                <h3>Expertise</h3>
                <div className="skill-tags">
                  <span>Drama Series</span>
                  <span>Reality TV</span>
                  <span>Documentaries</span>
                  <span>Live Television</span>
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
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" 
                alt="Alex Chen - TV Director"
                className="director-portrait"
              />
              <div className="experience-badge">
                <Calendar className="calendar-icon" />
                <span>15+ Years</span>
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
            <p>A showcase of my most impactful work</p>
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
                  <div className="project-overlay">
                    <button className="play-button">
                      <Play />
                    </button>
                  </div>
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
                  <div className="project-awards">
                    {project.awards.map((award, awardIndex) => (
                      <span key={awardIndex} className="award-tag">
                        <Award className="award-icon" />
                        {award}
                      </span>
                    ))}
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
                        <Star key={i} className="star-icon" />
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
                  <p>alex.chen@example.com</p>
                </div>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div>
                  <h4>Location</h4>
                  <p>Los Angeles, CA</p>
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
                  <a href="#" className="social-link">Instagram</a>
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
              <span>Alex Chen</span>
            </div>
            <p>&copy; 2024 Alex Chen. All rights reserved.</p>
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
