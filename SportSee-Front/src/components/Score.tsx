import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { USER_MAIN_DATA } from "../mocks/InfosMock";

type Props = {
  userScore: any
}

export default function Score({userScore}: Props) {

  const data = USER_MAIN_DATA[0]
  const score: number | undefined = data.todayScore;
  const scoreInPourcent : string = score ? ((score * 100)+"%" ) : "";
  
  const scoreChart: any = useRef(null);

  useEffect(() => {
    scoreChart.current.innerHTML = "";

    const currentScoreChart = d3.select(scoreChart.current);

    
  }, [data])

  return (
    <div className="score-chart">
      <svg ref={scoreChart}></svg>
      <p>{scoreInPourcent}</p>
    </div>
  )
}