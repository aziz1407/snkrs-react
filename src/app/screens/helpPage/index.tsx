import React from "react";
import {
  Box,
  Container,
  Stack,
  Tabs,
  Tab,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  TextareaAutosize,
  Paper,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

export default function HelpPage() {
  const [value, setValue] = React.useState("1");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        py: 12,
        px: 2,
        backgroundImage:
          "radial-gradient(circle at 20% 20%, #f0f8ff 0%, #ffffff 80%)",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            borderRadius: 8,
            p: 6,
            background: "#fff",
            boxShadow: "0 30px 60px rgba(0, 0, 0, 0.12)",
            border: "1px solid #e0e0e0",
          }}
        >
          <TabContext value={value}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 6,
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                sx={{
                  background: "#f1f5f9",
                  borderRadius: 6,
                  boxShadow: "inset 0 0 8px rgba(0,0,0,0.05)",
                }}
              >
                <Tab label="Terms" value="1" sx={{ fontWeight: 700 }} />
                <Tab label="FAQ" value="2" sx={{ fontWeight: 700 }} />
                <Tab label="Contact" value="3" sx={{ fontWeight: 700 }} />
              </Tabs>
            </Box>

            <TabPanel value="1">
              <Stack
                spacing={4}
                divider={<Divider sx={{ borderColor: "#eee" }} />}
              >
                {terms.map((text, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    sx={{
                      color: "#2e2e2e",
                      fontSize: "1.1rem",
                      lineHeight: 1.9,
                    }}
                  >
                    {text}
                  </Typography>
                ))}
              </Stack>
            </TabPanel>

            <TabPanel value="2">
              <Stack spacing={3}>
                {faq.map((item, index) => (
                  <Accordion
                    key={index}
                    elevation={2}
                    sx={{
                      borderRadius: 4,
                      background: "#ffffff",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`faq-${index}-content`}
                      id={`faq-${index}-header`}
                    >
                      <Typography fontWeight={700} sx={{ color: "#000" }}>
                        {item.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ color: "#000" }}>
                        {item.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </TabPanel>

            <TabPanel value="3">
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{ color: "#1e88e5" }}
                  gutterBottom
                >
                  Reach Out To Us 💬
                </Typography>
                <Typography variant="body1" color="text" gutterBottom sx={{ color: "#000" }}> 
                  We'd love to hear from you — whether it's a question, feedback
                  or just a hello.
                </Typography>

                <Stack spacing={3} mt={5}>
                  <TextField
                    label="Your Name"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#000" } }}
                  />
                  <TextField
                    label="Your Email"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#000" } }}
                  />
                  <TextareaAutosize
                    minRows={6}
                    placeholder="Your message..."
                    style={{
                      width: "100%",
                      borderRadius: 16,
                      padding: 20,
                      border: "1px solid #ddd",
                      fontFamily: "inherit",
                      fontSize: "1rem",
                      backgroundColor: "#fcfcfc",
                    }}
                  />
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        px: 5,
                        py: 1.5,
                        borderRadius: 4,
                        backgroundColor: "#1e88e5",
                        boxShadow: "0 4px 12px rgba(30, 136, 229, 0.3)",
                        textTransform: "none",
                        fontWeight: "bold",
                        color: "#ffffff",
                        "&:hover": {
                          backgroundColor: "#1565c0",
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </TabPanel>
          </TabContext>
        </Paper>
      </Container>
    </Box>
  );
}
