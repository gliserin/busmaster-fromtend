import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";
import Title from "./Title";
import { getRecentBus } from "../api";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const RecentBuses = (props) => {
  const [buses, setBuses] = useState([]);

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

  const loadBuses = async () => {
    try {
      const result = await getRecentBus();
      setBuses(result);
    } catch (error) {
      catchError(error);
    }
  };

  useEffect(() => {
    loadBuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onListButtonClick = () => {
    history.push("/dashboard/list");
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>최근 등록한 버스</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>지역(회사)</TableCell>
            <TableCell>노선</TableCell>
            <TableCell>차번</TableCell>
            <TableCell>차종</TableCell>
            <TableCell align="left">연식</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buses.map((bus) => (
            <TableRow key={bus._id}>
              <TableCell>{bus.location}</TableCell>
              <TableCell>{bus.route}</TableCell>
              <TableCell>{bus.number}</TableCell>
              <TableCell>{bus.type}</TableCell>
              <TableCell>{bus.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Button
          color="primary"
          onClick={() => {
            onListButtonClick();
          }}
        >
          더보기
        </Button>
      </div>
    </React.Fragment>
  );
};

export default RecentBuses;
