import { Box, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const eventData = [
  { id: 1, img: "/img/event5.png" },
  { id: 2, img: "/img//event2.png" },
  { id: 3, img: "/img//event4.png" },
  { id: 4, img: "/img//event3.png" },
  { id: 5, img: "/img//event1.png" },
];

export default function Events() {
  const history = useHistory();
  const controls = useAnimation();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        x: "-25%",
        transition: { duration: 1.5, ease: "easeInOut" },
      }).then(() => {
        controls.start({
          x: "0%",
          transition: { duration: 1.5, ease: "easeInOut" },
        });
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <Box className="events-section">
      <h2 className="events-title">Explore More</h2>

      <motion.div ref={wrapperRef} className="carousel-outer">
        <motion.div
          className="event-cards"
          animate={controls}
        >
          {eventData.map((event, index) => (
            <motion.div
              key={`${event.id}-${index}`}
              className="event-img-only"
              style={{ backgroundImage: `url(${event.img})` }}
              onClick={() => history.push("/products")}
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </Box>
  );
}
