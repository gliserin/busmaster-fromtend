import React, { useState } from "react";
import {
  Container,
  Paper,
  Grid,
  TextField,
  Box,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import { postBus } from "../api";
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

const Create = (props) => {
  const classes = useStyles();

  const [location, setLocation] = useState("");
  const [route, setRoute] = useState("");
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");

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

  const doCreate = async (callback) => {
    try {
      await postBus(location, route, number, type, year);
      props.makeSnackbar("등록되었습니다.", { variant: "success" });
      callback();
    } catch (error) {
      catchError(error);
    }
  };

  const button = async () => {
    doCreate(() => {
      history.push("/dashboard/list");
    });
  };

  const onemore = async () => {
    doCreate(() => {
      setLocation("");
      setRoute("");
      setNumber("");
      setType("");
      setYear("");
    });
  };

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Title>버스 등록</Title>
              <Grid container spacing={4} className={classes.inputContainer}>
                <Grid xs={12}>
                  <TextField
                    label="지역(회사)"
                    fullWidth
                    value={location}
                    helperText="ex) 서울특별시"
                    onChange={(event) => {
                      setLocation(event.target.value);
                    }}
                  />
                </Grid>
                <Grid xs={12} className={classes.gridItem}>
                  <TextField
                    label="노선"
                    fullWidth
                    value={route}
                    helperText="ex) 7728"
                    onChange={(event) => {
                      setRoute(event.target.value);
                    }}
                  />
                </Grid>
                <Grid xs={12} className={classes.gridItem}>
                  <TextField
                    label="차번"
                    fullWidth
                    value={number}
                    helperText="ex) 74사7421"
                    onChange={(event) => {
                      setNumber(event.target.value);
                    }}
                  />
                </Grid>
                <Grid xs={12} className={classes.gridItem}>
                  <TextField
                    label="차종"
                    fullWidth
                    value={type}
                    helperText="ex) 뉴 슈퍼 에어로시티 F/L"
                    onChange={(event) => {
                      setType(event.target.value);
                    }}
                  />
                </Grid>
                <Grid xs={12} className={classes.gridItem}>
                  <TextField
                    label="연식"
                    fullWidth
                    value={year}
                    helperText="ex) 2012"
                    onChange={(event) => {
                      setYear(event.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Box
                width="100%"
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
              >
                <Box className={classes.onemoreButton}>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => {
                      onemore();
                    }}
                  >
                    등록하고 하나 더
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => {
                      button();
                    }}
                  >
                    등록
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

export default Create;
