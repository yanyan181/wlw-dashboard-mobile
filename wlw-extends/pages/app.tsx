import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";

import { CastData, UserData, createUserData } from "../scripts/util";
import { DashboardSummary } from "./dashboardSummary";
import { UseRateChart } from "./useRateChart";
import { CastTable } from "./castTable";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useWindowDimensions } from "./customhooks";

type Order = "asc" | "desc";
interface AppProps {
  isStrage: boolean;
}

export const App: React.FC<AppProps> = (props: AppProps) => {
  const { isStrage } = props;

  if (isStrage) {
    const castDataStr = localStorage.castDataList;
    const [userData, setUserData] = React.useState<UserData>(
      createUserData(JSON.parse(castDataStr))
    );
    const [rows, setRows] = React.useState<CastData[]>(JSON.parse(castDataStr));

    const [order, setOrder] = React.useState<Order>("desc");
    const [orderBy, setOrderBy] = React.useState<keyof CastData>("rank");
    const { width, height } = useWindowDimensions();

    const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof CastData
    ) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "asc" : "desc");
      setOrderBy(property);
    };

    return (
      <div>
        <h2 id="page_title">戦績</h2>
        <Grid container>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              全体戦績
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <DashboardSummary userData={userData} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              ロール使用率
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <UseRateChart
                castDataList={JSON.parse(castDataStr)}
                width={width}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
        <Grid container spacing={1}>
          <Grid item>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                キャスト戦績一覧
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <CastTable
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rows={rows}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return <div></div>;
  }
};
