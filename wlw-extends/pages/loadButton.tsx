import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Typography, Grid, Card } from "@material-ui/core";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { getCastList } from "../scripts/actions";

import { State } from "../scripts/reducers";
import { App } from "./app";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      minWidth: "100%",
      marginTop: "10px",
    },
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    orange: {
      color: "white",
      backgroundColor: "red",
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

export const LoadButton: React.FC = () => {
  const classes = useStyles();
  const initialState: State = {
    isLoading: false,
    loadedCast: 0,
    castList: [],
    castDetailList: [],
    isStrage: localStorage.castDataList ? true : false,
  };
  const state = useSelector((state: State) => state || initialState);
  const dispatch = useDispatch();

  const handleClick = (): void => {
    dispatch(getCastList(state));
  };

  return (
    <div>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12}>
          <Card className={classes.root}>
            <Grid container alignItems="center" justify="center">
              <Grid item xs={12}>
                <Typography variant="h5">wlwダッシュボード</Typography>
                <Typography variant="caption">
                  wlwの戦績を詳細に見るための非公式ツールです。
                  <br />
                  非公式のため使用に関しては自己責任でお願いします。
                  <br />
                  バグなどの報告は
                  <a href="https://twitter.com/aRpuN85Qb8zX0HU">こちら</a>まで
                </Typography>
              </Grid>
              {/* <Grid item xs={12}>
              <Typography variant="button" display="block" gutterBottom>
                データ最終取得日：
                {lastDate ? lastDate : "まだ取得していません"}
              </Typography>
            </Grid> */}
              {/* <Grid item xs={12}>
              <RingLoader
                size="40px"
                loading={state.isLoading}
                color="#60ad5e"
              />
            </Grid> */}
              <Grid item xs={12}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  disabled={state.isLoading}
                  onClick={() => {
                    handleClick();
                  }}
                >
                  {state.isLoading
                    ? "読み込み中です。1分程度かかります(" +
                    state.loadedCast +
                    "/" +
                    state.castList.length +
                    ")"
                    : "キャストデータを取得する"}
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      {/* <App isStrage={state.isStrage} /> */}
    </div>
  );
};
