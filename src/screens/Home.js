import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Link } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { check } from "../api";
import home1 from "../images/home1.PNG";
import home2 from "../images/home2.PNG";
import home3 from "../images/home3.PNG";
import home4 from "../images/home4.PNG";

const useStyles = makeStyles((theme) => ({
  box_top: {
    // backgroundColor: "yellow",
    // backgroundColor: "primary",
    margin: 20,
  },
  box_middle: {
    // backgroundColor: "green",
    marginTop: 150,
  },
  text_title: {
    margin: 10,
  },
  text_login: {
    marginRight: 20,
  },
  text_register: {
    marginRight: 20,
  },
  box_fixed: {
    width: 800,
    height: 550,
  },
}));

const Home = () => {
  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();

  const history = useHistory();

  const checkToken = async () => {
    try {
      await check();
      history.push("/dashboard");
    } catch (error) {}
  };

  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" alignItems="center" className={classes.box_top}>
        <Box width="100%">
          <Typography variant="h2" className={classes.text_title}>
            BUS MASTER
          </Typography>
        </Box>

        <Box flexShrink={1}>
          <Link href="/login" underline="none" color="inherit">
            <Typography noWrap variant="h5" className={classes.text_login}>
              Login
            </Typography>
          </Link>
        </Box>
        <Box flexShrink={0}>
          <Link href="/register" underline="none" color="inherit">
            <Typography noWrap variant="h5" className={classes.text_login}>
              Register
            </Typography>
          </Link>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        className={classes.box_middle}
      >
        <Typography variant="h5">세계 1위 버스DB</Typography>
        <Typography variant="h2">Bus Master</Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        className={classes.box_middle}
        alignItems="center"
      >
        <Box display="flex" flexDirection="row">
          <img src={home1} alt={"dashboard"} width="900" height="550" />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="right"
            className={classes.box_fixed}
          >
            <Typography variant="h2" align="right">
              버스가 필요합니까?
            </Typography>
            <Typography variant="h2" align="right">
              버스를 원합니까?
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" className={classes.box_middle}>
          <Box
            display="flex"
            flexDirection="column"
            className={classes.box_fixed}
          >
            <Typography variant="h2">버스를 기록해놓고 싶습니까?</Typography>
            <Typography variant="h2">마음껏 할 수 있습니다.</Typography>
          </Box>
          <img src={home2} alt={"update"} width="900" height="550" />
        </Box>
        <Box display="flex" flexDirection="row" className={classes.box_middle}>
          <img src={home3} alt={"users"} width="900" height="550" />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="right"
            className={classes.box_fixed}
          >
            <Typography variant="h2" align="right">
              다른 사람들과 경쟁하고 싶습니까?
            </Typography>
            <Typography variant="h2" align="right">
              마음껏 할 수 있습니다.
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" className={classes.box_middle}>
          <Box
            display="flex"
            flexDirection="column"
            className={classes.box_fixed}
          >
            <Typography variant="h2">마음에 들지 않습니까?</Typography>
            <Typography variant="h2">탈퇴할 수 있습니다.</Typography>
          </Box>
          <img src={home4} alt={"resign"} width="900" height="550" />
        </Box>

        <Box style={{ marginBottom: 200 }}>
          <Typography variant="h1">지금 당장 가입하십시오.</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
