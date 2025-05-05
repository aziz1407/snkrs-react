import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '@mui/material/styles'; // Assuming you're using MUI theme context
import { useHistory } from 'react-router-dom'; // Import useHistory

const eventData = [
  {
    id: 1,
    img: "/img/event5.png",
    title: "Sneaker Drop",
    desc: "Limited edition sneakers just arrived.",
  },
  {
    id: 2,
    img: "/img/event2.png",
    title: "Flash Sale",
    desc: "Up to 50% off on premium models.",
  },
  {
    id: 3,
    img: "/img/event4.png",
    title: "VIP Members",
    desc: "Exclusive styles for our top members.",
  },
  {
    id: 4,
    img: "/img/event3.png",
    title: "Brand Collab",
    desc: "Nike x Off-White – now in store.",
  },
  {
    id: 5,
    img: "/img/event1.png",
    title: "Fresh Arrivals",
    desc: "Explore this week's trending kicks.",
  },
];

export default function Events() {
  const controls = useAnimation();
  const wrapperRef = useRef(null);
  const theme = useTheme(); // Access the current theme
  const history = useHistory(); // Initialize useHistory hook

  useEffect(() => {
    const startAnimationLoop = () => {
      controls
        .start({
          x: "-25%",
          transition: { duration: 1.5, ease: "easeInOut" },
        })
        .then(() => {
          controls.start({
            x: "0%",
            transition: { duration: 1.5, ease: "easeInOut" },
          });
        });
    };

    if (wrapperRef.current) {
      const interval = setInterval(startAnimationLoop, 10000);
      return () => clearInterval(interval);
    }
  }, [controls]);

  const handleCardClick = () => {
    history.push('/products');
  };

  return (
    <div className="events-section">
      <div className="events-header">
        <h2>Explore More</h2>
      </div>

      <motion.div ref={wrapperRef} className="carousel-container">
        <motion.div className="carousel-track" animate={controls}>
          {eventData.map((event, index) => (
            <motion.div
              key={`${event.id}-${index}`}
              className="carousel-card"
              whileHover={{ 
                scale: 1.03,
                y: -10,
              }}
              onClick={handleCardClick}
            >
              <div
                className="card-image"
                style={{ backgroundImage: `url(${event.img})` }}
              >
                <div className="card-overlay" />
                <div className="card-content">
                  <div className="content-tag">Featured</div>
                  <h3>{event.title}</h3>
                  <p>{event.desc}</p>
                  <button className="explore-btn" onClick={handleCardClick}> 
                    <span>Explore</span>
                    <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      <div className="carousel-indicators">
        <div className="indicator active"></div>
        <div className="indicator"></div>
        <div className="indicator"></div>
      </div>
    </div>
  );
}
