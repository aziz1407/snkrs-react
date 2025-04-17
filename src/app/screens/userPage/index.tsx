import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Settings } from "./Settings";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../../app/hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/data/enums/member.enum";
import "../../../css/userPage.css";

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();

  if (!authMember) history.push("/");
  return (
    <div className={"user-page"}>
      <Container>
        <Stack className={"my-page-frame"}>
          <Stack className={"my-page-left"}>
            <Box display={"flex"} flexDirection={"column"}>
              <Box className={"menu-content"}>
                <Settings />
              </Box>
            </Box>
          </Stack>

          <Stack className={"my-page-right"}>
            <Box className={"order-info-box"}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <div className={"order-user-img"}>
                  <img
                    src={
                      authMember?.memberImage
                        ? `${serverApi}/${authMember.memberImage}`
                        : "/icons/default-user.svg"
                    }
                    className={"order-user-avatar"}
                  />
                </div>
                <span className={"order-user-name"} style={{fontFamily: "sans-serif", fontStyle: "bold"}}>
                  {authMember?.memberNick}
                </span>
                <span className={"order-user-prof"} style={{fontFamily: "sans-serif", fontStyle: "bold"}}>
                  {authMember?.memberType}
                </span>
                <span className={"order-user-prof"} style={{fontFamily: "sans-serif", fontStyle: "bold"}}>
                  {authMember?.memberAddress
                    ? authMember.memberAddress
                    : "No Address"}
                </span>
              </Box>
              <Box className="user-media-box">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon style={{ cursor: "pointer" }} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon style={{ cursor: "pointer" }} />
                </a>
                <a
                  href="https://t.me/your_channel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TelegramIcon style={{ cursor: "pointer" }} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YouTubeIcon style={{ cursor: "pointer" }} />
                </a>
              </Box>

              <p className={"user-desc"} style={{fontFamily: "sans-serif", fontStyle: "bold"}}>
                {authMember?.memberDesc
                  ? authMember.memberDesc
                  : "No Descripton"}
              </p>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
