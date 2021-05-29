import * as React from "react";

import { Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { UserData } from "../scripts/util";

const useStyles = makeStyles({
  boardGrid: {
    minHeight: "312px",
  },
  boardMargin: {
    marginTop: "20px",
  },
});

interface SummaryProps {
  userData: UserData;
}

export const DashboardSummary: React.FC<SummaryProps> = (
  props: SummaryProps
) => {
  const { userData } = props;
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6}>
      <Grid container>
        <Grid item xs={12}>
          対戦数：{userData.gameCount}
        </Grid>
        <Grid item xs={12}>
          勝利数：{userData.winCount}
        </Grid>
        <Grid item xs={12}>
          敗北数：{userData.loseCount}
        </Grid>
        <Grid item xs={12}>
          勝率：
          {userData.winRate !== 0 ? (userData.winRate * 100).toFixed(2) : 0}％
        </Grid>
        <Grid item xs={12}>
          キルレシオ：
          {userData.killRate !== 0 ? userData.killRate.toFixed(2) : 0}
        </Grid>
      </Grid>
    </Grid>
  );
};
