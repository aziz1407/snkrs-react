import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface EventItem {
  id: number;
  title: string;
  desc: string;
  img: string;
}

const eventData: EventItem[] = [
  {
    id: 1,
    title: "Sneaker Drop",
    desc: "Limited edition release, don't miss out.",
    img: "/img/idea6.jpg",
  },
  {
    id: 2,
    title: "Summer Collection",
    desc: "Bright, bold, and breathable styles.",
    img: "/img/puma.jpg",
  },
  {
    id: 3,
    title: "Urban Classics",
    desc: "Sleek silhouettes for city moves.",
    img: "/img/for-nike.jpg",
  },
  {
    id: 4,
    title: "Retro Revival",
    desc: "Back from the 90s with fresh vibes.",
    img: "/img/jordan.jpg",
  },
  {
    id: 5,
    title: "Cool Drop",
    desc: "Holy-Cow drop",
    img: "/img/airdrop.jpg",
  },
];

// Duplicate data for infinite loop effect
const loopedData = [...eventData, ...eventData];

export default function Events() {
  return (
    <Box className="events-section">
      <Typography className="events-title">Explore More Benefits</Typography>

      <motion.div
        className="event-cards"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {loopedData.map((event) => (
          <div className="event-card" key={`${event.id}-${Math.random()}`}>
            <div
              className="event-img"
              style={{
                backgroundImage: `url(${event.img})`,
              }}
            />
            <div className="event-info">
              <Typography className="event-name">{event.title}</Typography>
              <Button className="event-btn">More</Button>
            </div>
          </div>
        ))}
      </motion.div>
    </Box>
  );
}
