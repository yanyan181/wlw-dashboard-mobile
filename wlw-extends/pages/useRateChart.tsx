import * as React from "react";

import { PieChart, Pie, Sector, Cell } from "recharts";

import { CastData, createUserData } from "../scripts/util";

interface UseRateChartProps {
  castDataList: CastData[];
  width: number;
}

function renderActiveShape(props: any) {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;
  return (
    <g>
      <text x={cx} y={cy} dy={0} textAnchor="middle" fill="#000000">
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy}
        dy={20}
        fontSize={11}
        textAnchor="middle"
        fill="#000000"
      >
        {`使用率： ${(percent * 100).toFixed(2)}%`}
      </text>
      <text
        x={cx}
        y={cy}
        dy={32}
        fontSize={11}
        textAnchor="middle"
        fill="#000000"
      >
        {`勝率： ${(100 * payload.winRate).toFixed(2)}%`}
      </text>
      <text
        x={cx}
        y={cy}
        dy={44}
        fontSize={11}
        textAnchor="middle"
        fill="#000000"
      >
        {`キルレシオ： ${payload.killRate.toFixed(2)}`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
}

export const UseRateChart: React.FC<UseRateChartProps> = (
  props: UseRateChartProps
) => {
  const { castDataList, width } = props;
  const fList: CastData[] = [];
  const aList: CastData[] = [];
  const sList: CastData[] = [];

  castDataList.forEach((castData) => {
    if (castData.roll === 0) fList.push(castData);
    else if (castData.roll === 1) aList.push(castData);
    else if (castData.roll === 2) sList.push(castData);
  });
  const fUserData = createUserData(fList);
  const aUserData = createUserData(aList);
  const sUserData = createUserData(sList);
  const rollData = [
    { roll: 0, name: "ファイター", ...fUserData },
    { roll: 1, name: "アタッカー", ...aUserData },
    { roll: 2, name: "サポーター", ...sUserData },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  return (
    <PieChart width={320} height={280}>
      <Pie
        dataKey="gameCount"
        nameKey="name"
        data={rollData}
        cx="50%"
        cy="50%"
        outerRadius={110}
        innerRadius={70}
        startAngle={-270}
        endAngle={-630}
        label={false}
        isAnimationActive={true}
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        onMouseEnter={(props, index) => {
          setActiveIndex(index);
        }}
      >
        {rollData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};
