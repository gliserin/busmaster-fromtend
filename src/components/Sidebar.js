import React, { useEffect, useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
  List,
  Box,
  Typography,
} from "@material-ui/core";
import {
  Create,
  People,
  Dashboard,
  ViewList,
  ExitToApp,
} from "@material-ui/icons";
import { useLocation } from "react-router-dom";

const Sidebar = (props) => {
  const [dashboardColor, setDashboardColor] = useState("inherit");
  const [listColor, setListColor] = useState("inherit");
  const [createColor, setCreateColor] = useState("inherit");
  const [userColor, setUserColor] = useState("inherit");
  const [resignColor, setResignColor] = useState("inherit");

  const currentPath = useLocation().pathname;

  useEffect(() => {
    setDashboardColor("inherit");
    setListColor("inherit");
    setCreateColor("inherit");
    setUserColor("inherit");
    setResignColor("inherit");
    switch (currentPath) {
      case "/dashboard":
      case "/dashboard/":
        setDashboardColor("#0000FF");
        break;
      case "/dashboard/list":
      case "/dashboard/list/":
        setListColor("#0000FF");
        break;
      case "/dashboard/create":
      case "/dashboard/create/":
        setCreateColor("#0000FF");
        break;
      case "/dashboard/user":
      case "/dashboard/user/":
        setUserColor("#0000FF");
        break;
      case "/dashboard/resign":
      case "/dashboard/resign/":
        setResignColor("#0000FF");
        break;
      default:
        break;
    }
  }, [currentPath]);

  return (
    <Box>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            props.onListItemsClick("");
          }}
        >
          <ListItemIcon>
            <Dashboard style={{ color: dashboardColor }} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography style={{ color: dashboardColor }}>
                대시보드
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            props.onListItemsClick("/list");
          }}
        >
          <ListItemIcon>
            <ViewList style={{ color: listColor }} />
          </ListItemIcon>
          <ListItemText primary="버스 목록" style={{ color: listColor }} />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            props.onListItemsClick("/create");
          }}
        >
          <ListItemIcon>
            <Create style={{ color: createColor }} />
          </ListItemIcon>
          <ListItemText primary="버스 등록" style={{ color: createColor }} />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            props.onListItemsClick("/user");
          }}
        >
          <ListItemIcon>
            <People style={{ color: userColor }} />
          </ListItemIcon>
          <ListItemText primary="사용자 랭킹" style={{ color: userColor }} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListSubheader inset></ListSubheader>
        <ListItem
          button
          onClick={() => {
            props.onListItemsClick("/resign");
          }}
        >
          <ListItemIcon>
            <ExitToApp style={{ color: resignColor }} />
          </ListItemIcon>
          <ListItemText primary="회원탈퇴" style={{ color: resignColor }} />
        </ListItem>
        {/* <ListItem button>
          <ListItemIcon>
            <Assignment />
          </ListItemIcon>
          <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Assignment />
          </ListItemIcon>
          <ListItemText primary="Year-end sale" />
        </ListItem> */}
      </List>
    </Box>
  );
};

export default Sidebar;
