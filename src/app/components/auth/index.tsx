import React, { ChangeEvent, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Box,
  Button,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/data/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/data/types/member";
import MemberService from "../../../app/services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../../app/hooks/useGlobals";
import UploadIcon from "@mui/icons-material/Upload";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/

  const handleUserName = (e: T) => {
    setMemberNick(e.target.value);
  };

  const handleUserPhone = (e: T) => {
    setMemberPhone(e.target.value);
  };

  const handleUserPassword = (e: T) => {
    setMemberPassword(e.target.value);
  };

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("/img/auth.webp");

  const handleSignupRequest = async () => {
    try {
      const isFulfill = !!memberNick && !!memberPhone && !!memberPassword;
      if (!isFulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);
      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);
      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log(err);
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 400 }}
      >
        <Fade in={signupOpen}>
          <Box
            sx={{
              width: 600,
              maxWidth: "95vw",
              mx: "auto",
              my: "10vh",
              bgcolor: "rgba(255, 255, 255, 0.95)",
              borderRadius: 4,
              boxShadow: 12,
              backdropFilter: "blur(10px)",
              display: "flex",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: 'url("/img/try.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px 0 0 10px",
                padding: "20px",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
              }}
            />

            <Box
              sx={{
                flex: 1,
                px: 4,
                py: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Stack spacing={3} alignItems="center">
                <Typography variant="h5" fontWeight={700}>
                  Let's Get You In 👟
                </Typography>

                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  onChange={handleUserName}
                  InputProps={{
                    sx: {
                      color: "#000",
                      borderRadius: "50px",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
                      paddingX: "12px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00BFFF",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00A6D6",
                        borderWidth: "2px",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "#888",
                      "&.Mui-focused": {
                        color: "#00A6D6",
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  onChange={handleUserPhone}
                  InputProps={{
                    sx: {
                      color: "#000",
                      borderRadius: "50px",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
                      paddingX: "12px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00BFFF",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00A6D6",
                        borderWidth: "2px",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "#888",
                      "&.Mui-focused": {
                        color: "#00A6D6",
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  onChange={handleUserPassword}
                  InputProps={{
                    sx: {
                      color: "#000",
                      borderRadius: "50px",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
                      paddingX: "12px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00BFFF",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00A6D6",
                        borderWidth: "2px",
                      },
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <span style={{ fontSize: "20px" }}>
                            {showPassword ? "🙈" : "👁️"}
                          </span>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "#888",
                      "&.Mui-focused": {
                        color: "#00A6D6",
                      },
                    },
                  }}
                />

                <Fab
                  variant="extended"
                  onClick={handleSignupRequest}
                  sx={{
                    mt: 2,
                    px: 3,
                    height: 40,
                    minHeight: 0,
                    minWidth: 0,
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    backgroundColor: "#00BFFF", // sky blue
                    color: "#fff",
                    boxShadow: "0px 4px 12px rgba(0, 191, 255, 0.4)",
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#00A6D6",
                      boxShadow: "0px 6px 16px rgba(0, 166, 214, 0.5)",
                    },
                  }}
                >
                  🔓 Lace Up
                </Fab>
              </Stack>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 400 }}
      >
        <Fade in={loginOpen}>
          <Box
            sx={{
              width: 600,
              maxWidth: "95vw",
              mx: "auto",
              my: "10vh",
              bgcolor: "rgba(255, 255, 255, 0.95)",
              borderRadius: 4,
              boxShadow: 12,
              backdropFilter: "blur(10px)",
              display: "flex",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: 'url("/img/try.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px 0 0 10px",
                padding: "20px",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
              }}
            />

            <Box
              sx={{
                flex: 1,
                px: 4,
                py: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Stack spacing={3} alignItems="center">
                <Typography variant="h5" fontWeight={700}>
                  Welcome Home
                </Typography>

                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  onChange={handleUserName}
                  InputProps={{
                    sx: {
                      color: "#000",
                      borderRadius: "50px",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
                      paddingX: "12px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00BFFF",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00A6D6",
                        borderWidth: "2px",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "#888",
                      "&.Mui-focused": {
                        color: "#00A6D6",
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  onChange={handleUserPassword}
                  InputProps={{
                    sx: {
                      color: "#000",
                      borderRadius: "50px",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
                      paddingX: "12px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00BFFF",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00A6D6",
                        borderWidth: "2px",
                      },
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <span style={{ fontSize: "20px" }}>
                            {showPassword ? "🙈" : "👁️"}
                          </span>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "#888",
                      "&.Mui-focused": {
                        color: "#00A6D6",
                      },
                    },
                  }}
                />

                <Fab
                  variant="extended"
                  onClick={handleLoginRequest}
                  sx={{
                    mt: 2,
                    px: 3,
                    height: 40,
                    minHeight: 0,
                    minWidth: 0,
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    backgroundColor: "#00BFFF", // sky blue
                    color: "#fff",
                    boxShadow: "0px 4px 12px rgba(0, 191, 255, 0.4)",
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#00A6D6",
                      boxShadow: "0px 6px 16px rgba(0, 166, 214, 0.5)",
                    },
                  }}
                >
                  🔒 Log In
                </Fab>
              </Stack>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
