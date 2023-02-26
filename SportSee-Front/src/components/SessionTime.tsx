import USER_AVERAGE_SESSION from "../mocks/SessionTimeMock.js";
import * as d3 from "d3";
import { useState, useRef, useEffect } from "react";

// interface UserSession {
//   day: number;
//   sessionLength: number;
// }

export default function SessionTime() {
  const [data] = useState(USER_AVERAGE_SESSION[0]);
  const sessions: any = data.sessions;

  const lineChart: any = useRef(null);
  const infosLineChart: any = useRef(null);

  useEffect(() => {
    lineChart.current.innerHTML = "";

    const currentInfosLineChart = d3.select(infosLineChart.current);

    //Setting up svg
    const wChartWrapper: number = 258;
    const hChartWrapper: number = 263;
    const lineChartWrapper = d3
      .select(lineChart.current)
      .attr("width", wChartWrapper)
      .attr("height", hChartWrapper)
      .style("background", "#FF0000")
      .style("overflow", "hidden");

    // Draw curves from data
    const lineCurves = d3
      .line()
      .x((d, i) => (wChartWrapper / (sessions.length - 1)) * i)
      .y((d: any, i) => -d.sessionLength + 200)
      .curve(d3.curveNatural);

    // Create graph with curve
    lineChartWrapper
      .append("path")
      .attr("d", lineCurves(sessions))
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("class", "lines-curve")
      .style("stroke", "url(#line-gradient)");

    // Create the gradient for the curve
    var defs = lineChartWrapper.append("defs");
    var gradient = defs
      .append("linearGradient")
      .attr("id", "line-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    // Add the colors
    gradient
      .append("stop")
      .attr("class", "start")
      .attr("offset", "0%")
      .attr("stop-color", "#FFFFFF")
      .attr("stop-opacity", 0.45);

    gradient
      .append("stop")
      .attr("class", "end")
      .attr("offset", "100%")
      .attr("stop-color", "#FFFFFF")
      .attr("stop-opacity", 1);

    // Set Legend
    // X AXIS
    const xScale = lineChartWrapper
      .append("g")
      .classed("day", true)
      .selectAll("day")
      .data(["L", "M", "M", "J", "V", "S", "D"])
      .enter()
      .append("text")
      .classed("lineDays", true)
      .text((d, i) => d)
      .attr("x", (d, i) => i * (wChartWrapper / sessions.length) + 13)
      .attr("y", (d, i) => hChartWrapper - 30)
      .style("fill", "#FFFFFF")
      .style("opacity", "0.5")
      .style("font-size", "12px");

    // Create toggled circles on curve's hover
    const firstCircle = lineChartWrapper
      .append("circle")
      .attr("r", 4)
      .attr("fill", "#FFFFFF")
      .attr("class", "firstCicle")
      .style("display", "none");
    const secondCircle = lineChartWrapper
      .append("circle")
      .attr("r", 8)
      .attr("fill", "#FFFFFF")
      .attr("class", "secondCircle")
      .style("opacity", 0.2)
      .style("display", "none");

    // Create Background on the right when curve's hover
    const rightBackground = lineChartWrapper
      .append("rect")
      .classed("rightBackground", true)
      .attr("width", wChartWrapper)
      .attr("height", hChartWrapper)
      .style("fill", "#00000")
      .style("opacity", 0.1)
      .style("display", "none");

    // <---------- EVENTS ---------->
    // Find closest index of cursor position
    const bisect = d3.bisector((d: any) => d.day).left;

    const xScale2 = d3
      .scaleLinear()
      .domain([0, sessions.length - 1])
      .range([0, wChartWrapper]);

    const findHoverIndex = (xPos: number) => {
      const x0 = xScale2.invert(xPos);
      console.log(xPos)
      const index = bisect(sessions, x0, 0);
      if ( xPos > 240 ){
        return index + 1
      } else {
        return index
      }
    };

    // Mouse hover, move and out
    lineChartWrapper
      .on("mouseover", function () {
        rightBackground.style("display", "block");
        firstCircle.style("display", "block");
        secondCircle.style("display", "block");

        // Create infos span
        currentInfosLineChart.append("span").text("");
      })
      .on("mousemove", function (e) {
        const xPos = d3.pointer(e)[0];

        // Find the closest data point
        const index: any = findHoverIndex(xPos);

        // Translate background
        rightBackground.attr("x", xPos - 1 / wChartWrapper);

        // Translate Circles
        const { sessionLength, day } = sessions[index];
        firstCircle.attr("cx", xScale2(index)).attr("cy", -sessionLength + 200);
        secondCircle
          .attr("cx", xScale2(index))
          .attr("cy", -sessionLength + 200);

        // Translate infos
        currentInfosLineChart.select("span").text(sessionLength + " min").style("left", xScale2(index) + "px").style("top", (-sessionLength + 160) + "px");
      })
      .on("mouseout", function () {
        rightBackground.style("display", "none");
        firstCircle.style("display", "none");
        secondCircle.style("display", "none");

        // Remove infos
        currentInfosLineChart.select("span").remove();
      });
  }, [data]);

  return (
    <div className="session-time">
      <p>Durée moyenne des sessions</p>
      <svg ref={lineChart}></svg>
      <div className="infos-lineChart" ref={infosLineChart}></div>
    </div>
  );
}
