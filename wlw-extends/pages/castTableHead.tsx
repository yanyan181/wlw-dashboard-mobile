import * as React from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Typography,
} from "@material-ui/core";

import { CastData } from "../scripts/util";

import { makeStyles } from "@material-ui/core/styles";

type Order = "asc" | "desc";
interface CastTableHeadProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof CastData
  ) => void;
  order: Order;
  orderBy: keyof CastData;
  columns: Column[];
}
interface Column {
  id: string;
  label: string;
  minWidth: number;
  format: Function;
}

const useStyles = makeStyles({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  typography: {
    fontSize: 8,
  },
});

export const CastTableHead: React.FC<CastTableHeadProps> = (
  props: CastTableHeadProps
) => {
  const { order, orderBy, onRequestSort, columns } = props;
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            style={{ minWidth: column.minWidth }}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={createSortHandler(column.id)}
            >
              <Typography className={classes.typography}>
                {column.label}
              </Typography>
            </TableSortLabel>
            {orderBy === column.id ? (
              <span className={classes.visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </span>
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
