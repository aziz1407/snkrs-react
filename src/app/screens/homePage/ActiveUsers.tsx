import { Box, Container, Stack } from "@mui/material";
import {
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/data/types/member";

/** REDUX SELECTOR **/
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const theme = useTheme();
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <Stack
      className="active-users-frame"
      sx={{
        width: "100%",
        height: 605,
        background: theme.palette.background.default,
        paddingTop: 6,
      }}
    >
      <Container>
        <Stack alignItems="center">
          <Typography
            className="category-title"
            sx={{
              fontSize: 36,
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 4,
            }}
          >
            Top Users
          </Typography>

          <Stack
            className="cards-frame"
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {topUsers.length !== 0 ? (
              topUsers.map((member: Member) => {
                const imagePath = `${serverApi}/${member.memberImage}`;
                return (
                  <Box
                    key={member._id}
                    sx={{
                      width: 250,
                      height: 250,
                      borderRadius: "50%",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      boxShadow: 6,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                      },
                      "&:hover .username": {
                        opacity: 1,
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={imagePath}
                      alt={member.memberNick}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                    <Box
                      className="username"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        textAlign: "center",
                        background: "rgba(0, 0, 0, 0.6)",
                        color: "#fff",
                        fontSize: 14,
                        fontWeight: 600,
                        padding: "6px 0",
                        opacity: 0,
                        transform: "translateY(20px)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {member.memberNick}
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Typography>No active users available</Typography>
            )}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
