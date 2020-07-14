import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Link,
  CssBaseline,
} from "@material-ui/core";
import { Menu, ChevronLeft } from "@material-ui/icons";
import Sidebar from "../components/Sidebar";
import { logout } from "../api";
import { useHistory } from "react-router-dom";
import Dashboard from "../components/DashBoard";
import { Route } from "react-router-dom";
import { useSnackbar } from "notistack";
import Create from "../components/Create";
import List from "../components/List";
import User from "../components/User";
import Resign from "../components/Resign";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
}));

const Main = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const history = useHistory();

  const doLogout = async () => {
    try {
      await logout();
      history.push("/");
    } catch (error) {
      if (!error.response) {
        enqueueSnackbar("서버와의 통신에 실패했습니다.", { variant: "error" });
      } else {
        enqueueSnackbar(
          error.response.data
            ? error.response.data.error
            : "서버와의 통신에 실패했습니다. 00",
          { variant: "error" }
        );
      }
      history.push("/");
    }
  };

  const onListItemsClick = (url) => {
    history.push(`/dashboard${url}`);
  };

  const goDashboard = () => {
    history.push(`/dashboard`);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <Menu />
          </IconButton>
          <Link
            className={classes.title}
            color="inherit"
            underline="none"
            href="#"
            onClick={() => {
              goDashboard();
            }}
          >
            <Typography component="h1" variant="h6" noWrap>
              Bus Master
            </Typography>
          </Link>

          <Box display="flex" alignItems="flex-end">
            <Link
              underline="none"
              color="inherit"
              href="#"
              onClick={() => {
                doLogout();
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                noWrap
                className={classes.title}
              >
                Logout
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Sidebar onListItemsClick={onListItemsClick} />
      </Drawer>
      <Route
        path="/dashboard"
        render={() => <Dashboard makeSnackbar={enqueueSnackbar} />}
        exact
      />
      <Route
        path="/dashboard/create"
        render={() => <Create makeSnackbar={enqueueSnackbar} />}
        exact
      />
      <Route
        path="/dashboard/list"
        render={() => <List makeSnackbar={enqueueSnackbar} />}
        exact
      />
      <Route
        path="/dashboard/user"
        render={() => <User makeSnackbar={enqueueSnackbar} />}
        exaxt
      />
      <Route
        path="/dashboard/resign"
        render={() => <Resign makeSnackbar={enqueueSnackbar} />}
        exact
      />
    </div>
  );
};

export default Main;
