import { USER_ACTIVITY } from "../mocks/DailyActivityMock";
import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

/**
 * Performance BarChart component
 *
 * @param { number } only numbers are used
 * @return { ReactElement } Return a BarChart component, display user's weight and colories each days
 */

type Props = {
  userActivity: {
    sessions: {
      day: string,
      kilogram: number;
      calories: number;
    }[];
  };
};

function DailyActivities({ userActivity }: Props) {
  const data = userActivity ?? USER_ACTIVITY[0];
  const sessions = data.sessions;
  const days: string[] = sessions.map(
    (session) => session.day
  );
  const weight: number[] = sessions.map(
    (session: { kilogram: number }) => session.kilogram
  );
  const minWeight: number =
    Math.min(...weight) > 1 ? Math.min(...weight) - 1 : 0;
  const maxWeight: number = Math.max(...weight) + 1;
  const averageWeight: number = Math.round(
    (maxWeight - minWeight) / 2 + minWeight
  );
  const cal: number[] = sessions.map(
    (session: { calories: number }) => session.calories
  );
  const minCal: number = Math.min(...cal) > 50 ? Math.min(...cal) - 50 : 0;
  const maxCal: number = Math.max(...cal) + 50;

  const barChart: any = useRef(null);
  const infosChart: any = useRef(null);

  useEffect(() => {
    // Reset graph if data change
    barChart.current.innerHTML = "";

    // INFOS BAR
    const infosWrapper = infosChart.current;

    // Setting up Svg containers
    // WRAPPER OF THE CHART
    const wWrapper: number = 835;
    const hWrapper: number = 320;
    const barChartWrapper = d3
      .select(barChart.current)
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
      .classed("bar", true)
      .style("cursor", "pointer");

    //Setting the scaling
    // WEIGHT BAR CHART
    groupChart
      .append("rect")
      .attr("x", (d, i) => i * (13 + wGlobalChart / sessions.length))
      .attr(
        "y",
        (d: any, i) =>
          hGlobalChart -
          ((d.kilogram - minWeight) / (maxWeight - minWeight)) * hGlobalChart
      )
      .attr("width", 7)
      .attr(
        "height",
        (d: any, i) =>
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
        (d: any, i) =>
          hGlobalChart -
          ((d.calories - minCal) / (maxCal - minCal)) * hGlobalChart
      )
      .attr("width", 7)
      .attr(
        "height",
        (d: any, i) =>
          ((d.calories - minCal) / (maxCal - minCal)) * hGlobalChart
      )
      .attr("rx", 3)
      .attr("ry", 3)
      .style("fill", "#E60000");

    // SET BACKGROUND TO THE SELECTED GROUPE CHART
    groupChart
      .append("rect")
      .attr("x", (d, i) => i * (13 + wGlobalChart / sessions.length) - 16)
      .attr("y", 0)
      .attr("width", wGroupChart)
      .attr("height", hGroupChart)
      .style("background", "#C4C4C4")
      .attr("opacity", 0)
      .classed("backgroundChartGroup", true);

    // Setting the axes
    // X AXIS
    const xScale = barChartWrapper
      .append("g")
      .classed("dates", true)
      .selectAll("date")
      .data(days)
      .enter()
      .append("text")
      .classed("dates", true)
      .text((d, i) => Number(d.split("-").slice(-1)))
      .attr("x", (d, i) => i * (13 + wGlobalChart / sessions.length) + 50.5)
      .attr("y", 142 + hGlobalChart)
      .style("fill", "#9B9EAC");

    // Y AXIS
    const yScale = barChartWrapper
      .append("g")
      .classed("weights", true)
      .selectAll("weights")
      .data([maxWeight, averageWeight, minWeight])
      .enter()
      .append("text")
      .classed("weight", true)
      .text((d, i) => d)
      .attr("x", 789)
      .attr("y", (d, i) => 110 + (i * hGlobalChart) / 2)
      .style("fill", "#9B9EAC");

    //SET EVENTS FOR BACKGROUND AND INFOS BAR
    groupChart.on("mouseover", function (e: any, d: any): void {
      d3.select(e.currentTarget.querySelector(".backgroundChartGroup"))
        .transition()
        .duration(20)
        .attr("opacity", 0.15);

      // Create informations encart
      const infosBar = d3
        .select(infosWrapper)
        .append("div")
        .classed("infosBar", true)
        .style("width", "39px")
        .style("height", "63px")
        .style("background", "#E60000");

      infosBar.append("span").text(`${d.kilogram}kg`);

      infosBar.append("span").text(`${d.calories}Kcal`);
    });

    groupChart.on("mouseout", function (e: any): void {
      // Remove background
      d3.select(e.currentTarget.querySelector(".backgroundChartGroup"))
        .transition()
        .duration(100)
        .attr("opacity", 0);

      // Remove infos bar
      d3.selectAll(".infosBar").remove();
    });

    groupChart.on("mousemove", function (e: any): void {
      d3.select(".infosBar")
        .style("top", "70px")
        .style(
          "left",
          105 +
            e.currentTarget.querySelector(".backgroundChartGroup").x.animVal
              .value +
            "px"
        );
    });
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
      <svg className="barChart" ref={barChart}></svg>
      <div className="infosChart" ref={infosChart}></div>
    </div>
  );
}

export default DailyActivities;
