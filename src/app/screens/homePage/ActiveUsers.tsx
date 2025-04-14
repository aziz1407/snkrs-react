import { Box, Container, Stack, useTheme } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent/CardContent";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/data/types/member";

/** REDUX SLICE & SELECTOR **/
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark"; 
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <Stack
      className="active-users-frame"
      sx={{
        width: "100%",
        height: 605,
        display: "flex",
        background: theme.palette.background.default, 
      }}
    >
      <Container>
        <Stack className={"users"} sx={{ marginTop: 45, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box
            className={"category-title"}
            sx={{
              fontFamily: "sans-serif",
              fontSize: 36,
              fontWeight: 700,
              lineHeight: "43px",
              color: theme.palette.text.primary,
            }}
          >
            Active Users
          </Box>
          <Stack
            className={"cards-frame"}
            sx={{
              width: "100%",
              margin: "47px 2px 2px 2px",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  const imagePath = `${serverApi}/${member.memberImage}`;
                  return (
                    <Card
                      key={member._id}
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        boxShadow: 3,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: 6,
                        },
                        backgroundColor: isDark ? "#1e1e1e" : "#ffffff", // Dark mode support
                        color: isDark ? "#ffffff" : "#000000", // Text color based on mode
                      }}
                    >
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt={member.memberNick} />
                        </AspectRatio>
                      </CardOverflow>
                      <Stack className="title">
                        <CardContent>
                          <Typography sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                            {member.memberNick}
                          </Typography>
                        </CardContent>
                      </Stack>
                    </Card>
                  );
                })
              ) : (
                <Box
                  className="no-data"
                  sx={{
                    fontSize: "1rem",
                    color: theme.palette.text.secondary,
                    textAlign: "center",
                    marginTop: 3,
                  }}
                >
                  Active users are not available!
                </Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
