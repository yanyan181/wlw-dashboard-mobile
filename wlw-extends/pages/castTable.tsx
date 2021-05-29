import * as React from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  IconButton,
} from "@material-ui/core";

import { CastData } from "../scripts/util";
import { CastTableHead } from "./castTableHead";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 600,
    marginBottom: "50px",
  },
  typography: {
    fontSize: 8,
  },
  small: {
    width: 30,
    height: 30,
  },
});

type Order = "asc" | "desc";
interface Column {
  id: string;
  label: string;
  minWidth: number;
  format: Function;
}
interface CastTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof CastData
  ) => void;
  order: Order;
  orderBy: keyof CastData;
  rows: CastData[];
}

const columns: Column[] = [
  {
    id: "image",
    label: "",
    minWidth: 30,
    format: (value: string) => {
      return "common/img_cast/" + value;
    },
  },
  {
    id: "name",
    label: "キャスト名",
    minWidth: 30,
    format: (value: string) => {
      return value;
    },
  },
  {
    id: "rank",
    label: "CR",
    minWidth: 30,
    format: (value: number) => {
      return value >= 100 ? "EX" + String(value - 100) : value;
    },
  },
  {
    id: "useRate",
    label: "使用率",
    minWidth: 30,
    format: (value: number) => {
      return String(value) + "％";
    },
  },
  {
    id: "winCount",
    label: "勝利数",
    minWidth: 30,
    format: (value: any) => {
      return value;
    },
  },
  {
    id: "loseCount",
    label: "敗北数",
    minWidth: 30,
    format: (value: any) => {
      return value;
    },
  },
  {
    id: "winRate",
    label: "勝率",
    minWidth: 30,
    format: (value: number) => {
      return String(value) + "％";
    },
  },
  {
    id: "killRate",
    label: "キルレシオ",
    minWidth: 30,
    format: (value: any) => {
      return value;
    },
  },
];

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export const CastTable: React.FC<CastTableProps> = (props: CastTableProps) => {
  const { order, orderBy, onRequestSort, rows } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          aria-label="sticky table"
          size="small"
          padding="none"
        >
          <CastTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            columns={columns}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map(
              (castData: any) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={castData.name}
                  >
                    {columns.map((column) => {
                      const value = castData[column.id];
                      return (
                        <TableCell key={column.id}>
                          {column.id === "image" ? (
                            <IconButton
                              className={classes.small}
                              onClick={() => {
                                location.href =
                                  "https://wonderland-wars.net/castdetail.html?cast=" +
                                  castData.id;
                              }}
                            >
                              <Avatar
                                alt={castData.name}
                                src={column.format(value)}
                                className={classes.small}
                              />
                            </IconButton>
                          ) : (
                            <Typography className={classes.typography}>
                              {column.format(value)}
                            </Typography>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
