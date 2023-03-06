import { useRef, useEffect } from "react";
import { USER_PERFORMANCE } from "../mocks/PerformanceMock";
import * as d3 from "d3";

type Props = {
  userPerformance: any
}

function Performance({userPerformance}: Props) {

  const data = userPerformance ?? USER_PERFORMANCE[0];


  const performancesValues = [...data.data.map((i: any) => i.value)];
  const performancesNames = data.kind;

  const radarChart: any = useRef(null)

  
  useEffect(() => {
    radarChart.current.innerHTML = "";
    
    const currentRadarChart = d3.select(radarChart.current).attr("width", 258).attr("height", 263);

  }, [data])

  return (
    <div className="radar-chart">
      <svg ref={radarChart}></svg>
    </div>
  )
}

export default Performance