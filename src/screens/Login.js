import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Avatar,
  CssBaseline,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LockOutlined } from "@material-ui/icons";
import { login as apiLogin } from "../api";
import { Redirect, useHistory } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Bus Master "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorText: {
    marginTop: theme.spacing(2),
  },
}));

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [redirect, setRedirect] = useState(false);

  const history = useHistory();

  const doLogin = async () => {
    try {
      await apiLogin(id, password);
      setRedirect(true);
    } catch (error) {
      if (!error.response) {
        setErrorText("서버와의 통신에 실패했습니다.");
        return;
      }
      setErrorText(
        error.response.data
          ? error.response.data.error
          : "서버와의 통신에 실패했습니다. 00"
      );
    }
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      doLogin();
    }
  };

  const register = () => {
    history.push("/register");
  };

  const classes = useStyles();

  if (redirect) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="아이디"
              autoFocus
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              autoComplete="current-password"
              onKeyPress={onKeyPress}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <Box
              display="flex"
              width="100%"
              alignItems="center"
              flexDirection="column"
              className={classes.errorText}
            >
              <Typography color="secondary">{errorText}</Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                doLogin();
              }}
            >
              로그인
            </Button>
            <Box
              display="flex"
              width="100%"
              alignItems="center"
              flexDirection="column"
            >
              <Button
                onClick={() => {
                  register();
                }}
              >
                또는 회원가입
              </Button>
            </Box>
          </form>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Container>
    );
  }
};

export default Login;
