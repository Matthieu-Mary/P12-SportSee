import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { USER_MAIN_DATA } from "../mocks/InfosMock";

type Props = {
  userScore: any;
};

export default function Score({ userScore }: Props) {
  const data = USER_MAIN_DATA[0];
  const score: number | undefined = data.todayScore;
  const scoreInPourcent: number = score ? score * 100 : 0;

  const scoreChart: any = useRef(null);

  useEffect(() => {
    scoreChart.current.innerHTML = "";

    const wCurrentScoreChart: number = 258;
    const hCurrentScoreChart: number = 263;
    const currentScoreChart = d3
      .select(scoreChart.current)
      .attr("width", wCurrentScoreChart)
      .attr("height", hCurrentScoreChart)
      .attr(
        "transform",
        `translate(${wCurrentScoreChart / 2} ${hCurrentScoreChart / 2})`
      )
      .style("overflow", "visible");

    // Create Arc
    const arc = d3
      .arc<any>()
      .cornerRadius(10)
      .innerRadius(80)
      .outerRadius(90)
      .startAngle(0)
      .endAngle((-(scoreInPourcent * 3.6) * (Math.PI / 180)));

    // Extern Red Circle
    currentScoreChart
      .append("path")
      .attr("d", arc)
      .attr("fill", "#FF0000");

      console.log(Math.PI)

  }, [data]);

  return (
    <div className="score-chart">
      <svg ref={scoreChart}></svg>
      {/* <p>{scoreInPourcent}</p> */}
    </div>
  );
}
