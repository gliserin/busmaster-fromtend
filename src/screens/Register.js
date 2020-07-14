import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../components/Copyright";
import { register } from "../api";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorText: {
    marginTop: theme.spacing(2),
  },
}));

const Register = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorText, setErrorText] = useState("");
  const [redirect, setRedirect] = useState(false);

  const doRegister = async () => {
    try {
      if (password !== password2) {
        setErrorText("비밀번호를 다시 확인하세요");
        return;
      }
      if (password === password2 && password.length <= 5) {
        setErrorText("비밀번호를 6자리 이상으로 정해주세요");
        return;
      }

      await register(name, id, password);

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

  const classes = useStyles();

  if (redirect) {
    return <Redirect to="/" />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="이름"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="아이디"
                  onChange={(event) => {
                    setId(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="비밀번호"
                  type="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="비밀번호 확인"
                  type="password"
                  onChange={(event) => {
                    setPassword2(event.target.value);
                  }}
                />
              </Grid>
            </Grid>
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
              color="secondary"
              className={classes.submit}
              onClick={() => {
                doRegister();
              }}
            >
              회원가입
            </Button>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
};

export default Register;
