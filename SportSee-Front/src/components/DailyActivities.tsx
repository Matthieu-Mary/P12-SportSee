import { USER_ACTIVITY } from "../mocks/DailyActivityMock";
import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

type Props = {};

function DailyActivities({}: Props) {
  const [data] = useState(USER_ACTIVITY[0]);
  const sessions = data.sessions;
//   const num: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const days: string[] = sessions.map((session) => session.day);
  const weight: number[] = sessions.map((session) => session.kilogram);
  const minWeight: number =
    Math.min(...weight) > 1 ? Math.min(...weight) - 1 : 0;
  const maxWeight: number = Math.max(...weight) + 1;
  // CI-DESSOUS A REVOIR ...
  const cal: number[] = sessions.map((session) => session.calories);
  const minCal: number = Math.min(...cal);
  const maxCal: number = Math.max(...cal);

  const svgRef: any = useRef();

  useEffect(() => {
    // Setting up Svg container

    // WRAPPER OF THE CHART
    const wWrapper: number = 835;
    const hWrapper: number = 320;
    const barChartWrapper = d3
      .select(svgRef.current)
      .attr("width", wWrapper)
      .attr("height", hWrapper)
      .style("background", "#FBFBFB")
      .style("overflow", "visible");

    // THE GLOBAL CHART
    const wGlobalChart: number = 700;
    const hGlobalChart: number = 145;
    const globalChart = barChartWrapper        
      .append("svg")
      .attr("width", wGlobalChart)
      .attr("height", hGlobalChart)
      .attr("x", 43)
      .attr("y", 112)

    // SINGLE CHART 
    const wSingleChart: number = 56;
    const hSingleChart: number = hGlobalChart;



    globalChart.append("rect").attr("x", 10).attr("y", 0).attr("width", wSingleChart).attr("height", hGlobalChart).style("background", "#C4C4C4")






    //Setting the scaling

    // Setting the axes

    //Setting up the svg data
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default DailyActivities;
