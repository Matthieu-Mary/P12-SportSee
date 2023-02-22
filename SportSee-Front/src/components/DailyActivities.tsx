import { USER_ACTIVITY } from "../mocks/DailyActivityMock";
import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

type Props = {};

function DailyActivities({}: Props) {
  const [data] = useState(USER_ACTIVITY[0]);
  const sessions = data.sessions;
  const days: string[] = sessions.map((session) => session.day);
  const weight: number[] = sessions.map((session) => session.kilogram);
  const minWeight: number =
    Math.min(...weight) > 1 ? Math.min(...weight) - 1 : 0;
  const maxWeight: number = Math.max(...weight) + 1;
  const averageWeight: number = Math.round(((maxWeight - minWeight )/ 2) + minWeight)
  // CI-DESSOUS A REVOIR ...
  const cal: number[] = sessions.map((session) => session.calories);
  const minCal: number = Math.min(...cal) > 50 ? Math.min(...cal) - 50 : 0;
  const maxCal: number = Math.max(...cal) + 50;

  const svgRef: any = useRef();

  useEffect(() => {
    // Reset graph if data change
    svgRef.current.innerHTML = "";

    // Setting up Svg containers
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
      .attr("y", 112);

    // SET THE 3 HORIZONTAL LINES ON THE GRAPH
    const baseLine = globalChart
      .append("line")
      .classed("line", true)
      .attr("x1", 0)
      .attr("y1", hGlobalChart)
      .attr("x2", wGlobalChart)
      .attr("y2", hGlobalChart)
      .attr("stroke", "#DEDEDE");
    const middleLine = globalChart
      .append("line")
      .classed("line", true)
      .attr("x1", 0)
      .attr("y1", hGlobalChart / 2)
      .attr("x2", wGlobalChart)
      .attr("y2", hGlobalChart / 2)
      .attr("stroke", "#DEDEDE")
      .attr("stroke-dasharray", 2);
    const lastLine = globalChart
      .append("line")
      .classed("line", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", wGlobalChart)
      .attr("y2", 0)
      .attr("stroke", "#DEDEDE")
      .attr("stroke-dasharray", 2);

    // GROUP CHART
    const wGroupChart: number = 56;
    const hGroupChart: number = hGlobalChart;
    const groupChart = globalChart
      .classed("graph", true)
      .selectAll(".bar")
      .data(sessions)
      .enter()
      .append("g")
      .classed("bar", true);

    // SET BACKGROUND TO THE SELECTED GROUPE CHART
    // groupChart
    //   .append("rect")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("width", wGroupChart)
    //   .attr("height", hGroupChart)
    //   .style("fill", "#C4C4C4")
    //   .attr("opacity", 0.5);

    //Setting the scaling
    // WEIGHT BAR CHART
    groupChart
      .append("rect")
      .attr("x", (d, i) => i * (13 + wGlobalChart / sessions.length))
      .attr(
        "y",
        (d, i) =>
          hGlobalChart -
          ((d.kilogram - minWeight) / (maxWeight - minWeight)) * hGlobalChart
      )
      .attr("width", 7)
      .attr(
        "height",
        (d, i) =>
          ((d.kilogram - minWeight) / (maxWeight - minWeight)) * hGlobalChart
      )
      .attr("rx", 3)
      .attr("ry", 3)
      .style("fill", "#282D30");

    // CALORIES BAR CHART
    groupChart
      .append("rect")
      .attr("x", (d, i) => i * (13 + wGlobalChart / sessions.length) + 16)
      .attr(
        "y",
        (d, i) =>
          hGlobalChart -
          ((d.calories - minCal) / (maxCal - minCal)) * hGlobalChart
      )
      .attr("width", 7)
      .attr(
        "height",
        (d, i) => ((d.calories - minCal) / (maxCal - minCal)) * hGlobalChart
      )
      .attr("rx", 3)
      .attr("ry", 3)
      .style("fill", "#E60000");

    // Setting the axes
    // const xScale = barChartWrapper
    //   .append("g")
    //   .classed("dates", true)
    //   .selectAll("date")
    //   .data(sessions)
    //   .enter()
    //   .append("text")
    //   .classed("dates", true)
    //   .text((d, i) => d.day)
    //   .attr("x", (d, i) => i *(13 + wGlobalChart / sessions.length) + 12 )
    //   .attr("y", 142 + hGlobalChart);

    const yScale = barChartWrapper
      .append("g")
      .classed("weights", true)
      .selectAll("weights")
      .data(sessions)
      .enter()
      .append("text")
      .classed("weight", true)
      .text((d, i) => d.kilogram)
      .attr("x", 789 )
      .attr("y", 142 + hGlobalChart);

    //Setting up the svg data
  }, [data]);

  return (
    <div className="barChart-container">
      <p className="activity-legend">Activité quotidienne</p>
      <p className="activity-weight">
        <div></div>Poids (kg)
      </p>
      <p className="activity-cal">
        <div></div>Calories brulées (kCal)
      </p>
      <svg className="barChart" ref={svgRef}></svg>
    </div>
  );
}

export default DailyActivities;
