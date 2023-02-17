import USER_AVERAGE_SESSION from "../mocks/SessionTimeMock.js";
import * as d3 from "d3";
import { useState, useRef, useEffect } from "react";

interface UserSession {
  day: number;
  sessionLength: number;
}

// interface UserAverageSession {
//   userId: number;
//   sessions: UserSession[];
// }

export default function SessionTime() {
  const [data] = useState(USER_AVERAGE_SESSION[0]);
  const days: number[] = [];
  const sessionLength: number[] = [];

  data.sessions.forEach((session) => days.push(session.day));
  data.sessions.forEach((session) => sessionLength.push(session.sessionLength));

  const svgRef: any = useRef();

  useEffect(() => {

    //Setting up svg
    const w: number = 258;
    const h: number = 263;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("background", "#FF0000")
      .style("overflow", "visible");

    //Setting the scaling
    const xScale:any = d3
      .scaleLinear()
      .domain([0, days.length - 1])
      .range([0, w]);
    const yScale:any = d3.scaleLinear().domain([0, h]).range([h, 0]);
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

    //Setting the axes
    const xAxis = d3.axisBottom(xScale).ticks(days.length).tickFormat( (i:any) => i + 1);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(yAxis)

    //Setting up the data for the svg
    svg.selectAll(".line").data([sessionLength]).join("path").attr("d", (d:any) => generateScaledLine(d)).attr("fill", "none").attr("stroke", "white");
    
  }, []);

  return (
    <div className="session-time">
      <svg ref={svgRef}></svg>
    </div>
  );
}
