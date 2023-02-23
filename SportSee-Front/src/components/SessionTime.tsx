import USER_AVERAGE_SESSION from "../mocks/SessionTimeMock.js";
import * as d3 from "d3";
import { useState, useRef, useEffect } from "react";

interface UserSession {
  day: number;
  sessionLength: number;
}

export default function SessionTime() {
  const [data] = useState(USER_AVERAGE_SESSION[0]);
  const sessions: UserSession[] = data.sessions;
  const sessionLengthArr: number[] = data.sessions.map(
    (session) => session.sessionLength
  );
  const sessionMax: number = Math.max(...sessionLengthArr);
  const sessionMin: number = Math.min(...sessionLengthArr);

  console.log(sessions);

  const lineChart: any = useRef();

  useEffect(() => {
    lineChart.current.innerHTML = "";

    //Setting up svg
    const wChartWrapper: number = 258;
    const hChartWrapper: number = 263;
    const lineChartWrapper = d3
      .select(lineChart.current)
      .attr("width", wChartWrapper)
      .attr("height", hChartWrapper)
      .style("background", "#FF0000")
      .style("overflow", "visible");

    // Draw curves from data
    const lineCurves = d3
      .line()
      .x((d, i) => (wChartWrapper / (sessions.length - 1)) * i)
      .y((d, i) => (i * 100) / d.length)
      .curve(d3.curveNatural);

    // Create graph with curve
    // lineChartWrapper
    //   .append("path")
    //   .attr("d", lineCurves(sessions))
    //   .attr("stroke", "url(#linGrad)")
    //   .attr("stroke-width", 2)
    //   .attr("fill", "none");


  }, [data]);

  return (
    <div className="session-time">
      <svg ref={lineChart}></svg>
    </div>
  );
}
