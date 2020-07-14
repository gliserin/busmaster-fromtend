import React, { useState } from "react";
import {
  Container,
  Paper,
  Grid,
  TextField,
  Box,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import { resign } from "../api";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeight: {
    height: 160,
  },
  inputContainer: {
    padding: theme.spacing(3),
  },
  onemoreButton: {
    marginRight: theme.spacing(2),
  },
  gridItem: {
    marginTop: theme.spacing(1),
  },
}));

const Resign = (props) => {
  const classes = useStyles();

  const [id, setId] = useState("");

  const history = useHistory();

  const catchError = (error) => {
    let message = "";
    if (!error.response) {
      message = "서버와의 통신에 실패했습니다.";
    }
    message = error.response.data
      ? error.response.data.error
      : "서버와의 통신에 실패했습니다. 00";
    props.makeSnackbar(message, { variant: "error" });
  };

  const button = async () => {
    try {
      await resign(id);
      props.makeSnackbar("탈퇴되었습니다.", { variant: "success" });
      history.push("/");
    } catch (error) {
      catchError(error);
    }
  };

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Title>회원탈퇴</Title>
              <Box className={classes.inputContainer}>
                <Typography>
                  탈퇴하시려면 아이디를 입력하고 탈퇴 버튼을 누르세요.
                </Typography>
                <Box>
                  <TextField
                    label="아이디"
                    value={id}
                    onChange={(event) => {
                      setId(event.target.value);
                    }}
                  />
                </Box>
              </Box>
              <Box
                width="100%"
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
              >
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => {
                      button();
                    }}
                  >
                    탈퇴
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default Resign;
