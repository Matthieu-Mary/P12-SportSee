import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { USER_MAIN_DATA } from "../mocks/InfosMock";

type Props = {
  userScore: any;
};

export default function Score({ userScore }: Props) {

  const data = userScore ?? USER_MAIN_DATA[0];
  const score: number | undefined =  data.todayScore ?? data.score;
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
      .attr("viewbox", "0 0 260 260")
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
      .endAngle(-(scoreInPourcent * 3.6) * (Math.PI / 180));

    // Extern Red Circle colorized
    currentScoreChart.append("path").attr("d", arc).attr("fill", "#FF0000");

    // Intern White circle
    currentScoreChart.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 80).style("fill", "white")

  }, [data]);


  return (
    <div className="score-chart">
      <p>Score</p>
      <svg ref={scoreChart}></svg>
      <div className="score-infos"><p> <span>{scoreInPourcent}%</span> <br />de votre <br /> objectif </p></div>
    </div>
  );
}
