import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { getBus, postBus, putBus, deleteBus } from "../api";
import { tableIcons } from "./tableIcons";

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

const List = (props) => {
  useEffect(() => {
    loadBuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const classes = useStyles();
  const [data, setData] = useState([]);
  const loadBuses = async () => {
    try {
      const result = await getBus();
      setData(result);
    } catch (error) {
      catchError(error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState([
    { title: "지역(회사)", field: "location" },
    { title: "노선", field: "route" },
    { title: "차번", field: "number" },
    { title: "차종", field: "type" },
    { title: "연식", field: "year" },
  ]);
  const editable = {
    onRowAdd: (d) =>
      new Promise(async (resolve) => {
        try {
          const location = d.location || "-";
          const route = d.route || "-";
          const number = d.number || "-";
          const type = d.type || "-";
          const year = d.year || "-";
          await postBus(location, route, number, type, year);
          await loadBuses();
          props.makeSnackbar("등록되었습니다.", { variant: "success" });
          resolve();
        } catch (error) {
          catchError(error);
          resolve();
        }
      }),
    onRowUpdate: (n, o) =>
      new Promise(async (resolve) => {
        try {
          const location = n.location || "-";
          const route = n.route || "-";
          const number = n.number || "-";
          const type = n.type || "-";
          const year = n.year || "-";
          await putBus(n._id, location, route, number, type, year);
          await loadBuses();
          props.makeSnackbar("수정되었습니다.", { variant: "success" });
          resolve();
        } catch (error) {
          catchError(error);
          resolve();
        }
      }),
    onRowDelete: (d) =>
      new Promise(async (resolve) => {
        try {
          await deleteBus(d._id);
          await loadBuses();
          props.makeSnackbar("삭제되었습니다.", { variant: "success" });
          resolve();
        } catch (error) {
          catchError(error);
          resolve();
        }
      }),
  };

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MaterialTable
              title="내 버스 목록"
              icons={tableIcons}
              columns={columns}
              data={data}
              editable={editable}
              options={{
                emptyRowsWhenPaging: false,
                pageSize: 50,
                pageSizeOptions: [10, 50, 100, 1000],
                actionsColumnIndex: 5,
                draggable: false,
              }}
              localization={{
                header: {
                  actions: "",
                },
                toolbar: {
                  searchPlaceholder: "검색",
                  searchTooltip: "검색",
                },
                pagination: {
                  labelRowsSelect: "개",
                  previousTooltip: "이전",
                  nextTooltip: "다음",
                  firstTooltip: "처음으로",
                  lastTooltip: "마지막으로",
                },
                body: {
                  deleteTooltip: "삭제",
                  addTooltip: "등록",
                  editTooltip: "수정",
                  emptyDataSourceMessage: "표시할 정보가 없습니다.",
                  editRow: {
                    deleteText: "정말 삭제하시겠습니까?",
                    cancelTooltip: "취소",
                    saveTooltip: "확인",
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default List;
