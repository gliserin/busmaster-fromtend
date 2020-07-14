import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Paper,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import { ranking } from "../api";

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
}));

const User = (props) => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

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
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUsers = async () => {
    try {
      const result = await ranking();
      setUsers(result);
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
              <Title>사용자 랭킹</Title>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">아이디</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">이름</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">등록한 버스</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">등수</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.userid}>
                      <TableCell>
                        <Typography
                          variant={user.place <= 5 ? `h${user.place + 1}` : ""}
                        >
                          {user.userid}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant={user.place <= 5 ? `h${user.place + 1}` : ""}
                        >
                          {user.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant={user.place <= 5 ? `h${user.place + 1}` : ""}
                        >
                          {`${user.count}대`}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant={user.place <= 5 ? `h${user.place + 1}` : ""}
                        >
                          {`${user.place}등`}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default User;
