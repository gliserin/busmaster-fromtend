import React, { useState, useEffect } from "react";
import { DirectionsBus, TrendingUp, Stars } from "@material-ui/icons";
import { Container, Grid, Paper, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Title from "./Title";
import RecentBuses from "./RecentBuses";
import { myBusCount, myPlace } from "../api";

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
}));

const Dashboard = (props) => {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [busCount, setBusCount] = useState(0);
  const [busPlace, setBusPlace] = useState(0);
  const [entireUser, setEntireUser] = useState(0);
  const [busTier, setBusTier] = useState("브론즈");

  const loadDashboard = async () => {
    try {
      const result = await myBusCount();
      setBusCount(result.count);

      if (result.count < 10) {
        setBusTier("브론즈");
      } else if (result.count < 100) {
        setBusTier("실버");
      } else if (result.count < 300) {
        setBusTier("골드");
      } else if (result.count < 1000) {
        setBusTier("플레티넘");
      } else if (result.count < 5000) {
        setBusTier("마스터");
      } else {
        setBusTier("그랜드마스터");
      }
    } catch (error) {
      catchError(error);
    }
    try {
      const result = await myPlace();
      setBusPlace(result.place);
      setEntireUser(result.entire);
    } catch (error) {
      catchError(error);
    }
  };

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

  useEffect(() => {
    loadDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper className={fixedHeightPaper}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box>
                  <Title variant="h5" color="primary">
                    등록한 버스
                  </Title>
                  <Typography component="p" variant="h4">
                    {`${busCount}대`}
                  </Typography>
                </Box>
                <DirectionsBus style={{ fontSize: 80 }} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={fixedHeightPaper}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box>
                  <Title variant="h5" color="primary">
                    티어
                  </Title>
                  <Typography component="p" variant="h4">
                    {busTier}
                  </Typography>
                </Box>
                <Stars style={{ fontSize: 80 }} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={fixedHeightPaper}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box>
                  <Title variant="h5" color="primary">
                    순위
                  </Title>
                  <Box display="flex" flexDirection="row">
                    <Typography component="p" variant="h4">
                      {`${busPlace}등`}
                    </Typography>
                    <Typography
                      component="p"
                      variant="h6"
                      style={{ marginLeft: 8 }}
                    >
                      {`/ ${entireUser}명`}
                    </Typography>
                  </Box>
                </Box>
                <TrendingUp style={{ fontSize: 80 }} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <RecentBuses />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default Dashboard;
