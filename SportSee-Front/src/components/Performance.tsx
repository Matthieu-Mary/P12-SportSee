import { useRef, useEffect } from "react";
import { USER_PERFORMANCE } from "../mocks/PerformanceMock";
import * as d3 from "d3";


type Props = {
  userPerformance: {
    data: {
      value: number;
      kind: number;
    }[];
  };
};

function Performance({ userPerformance }: Props) {

  // Response from API or not
  const data = userPerformance ?? USER_PERFORMANCE[0];

  const performancesValues = [...data.data.map((i: any) => i.value)];
  const maxValue = Math.max(...performancesValues);
  const angleEachPolygonsLines = 60;
  const radarChart: any = useRef(null);

  // Draw the polygons
  const polygons = (values = [1, 1, 1, 1, 1, 1]) =>
    values
      .map((angle, i) =>
        [
          angle *
            Math.cos(angleEachPolygonsLines * (Math.PI / 180) * (i - 0.5)),
          -angle * Math.sin(60 * (Math.PI / 180) * (i - 0.5)),
        ].join(",")
      )
      .join(" ");

  useEffect(() => {
    radarChart.current.innerHTML = "";

    const wCurrentRadarChart = 258;
    const hCurrentRadarChart = 263;
    const currentRadarChart = d3
      .select(radarChart.current)
      .attr("width", wCurrentRadarChart)
      .attr("height", hCurrentRadarChart);

    // Create scales for the axes
    const valueScale = d3
      .scaleLinear()
      .range([0, hCurrentRadarChart / 2 - 40])
      .domain([0, maxValue]);

    // Draw the polygons
    const polygonWrapper = currentRadarChart
      .append("g")
      .attr("class", "polygonWrapper")
      .attr(
        "transform",
        `translate(${wCurrentRadarChart / 2},${hCurrentRadarChart / 2})`
      )
      .attr("fill", "none")
      .attr("stroke", "white");

    for (let i = 0; i < 5; i++) {
      polygonWrapper
        .append("polygon")
        .attr(
          "points",
          polygons(
            Array(6).fill(
              wCurrentRadarChart / 2 - 40 - 22.5 * i - (i === 4 ? 10 : 0)
            )
          )
        );
    }

    // Add Legend
    const textValues = currentRadarChart
      .append("text")
      .classed("textValues", true)
      .style("font-size", "12px")
      .attr("fill", "white")
      .attr("font-weight", 500);
    textValues
      .append("tspan")
      .text("Intensité")
      .attr("x", wCurrentRadarChart / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle");
    textValues.append("tspan").text("Vitesse").attr("x", 215).attr("y", 85);
    textValues.append("tspan").text("Force").attr("x", 215).attr("y", 185);
    textValues
      .append("tspan")
      .text("Endurance")
      .attr("x", wCurrentRadarChart / 2)
      .attr("y", 240)
      .attr("text-anchor", "middle");
    textValues.append("tspan").text("Energie").attr("x", 5).attr("y", 185);
    textValues.append("tspan").text("Cardio").attr("x", 5).attr("y", 85);

    // Display data points as polygon
    currentRadarChart
      .append("polygon")
      .attr(
        "points",
        polygons([
          ...data.data.map((el: any) =>
            el.value < 1
              ? 1
              : (el.value / maxValue) * (hCurrentRadarChart / 2 - 40)
          ),
        ])
      )
      .attr(
        "transform",
        `translate(${wCurrentRadarChart / 2},${hCurrentRadarChart / 2})`
      )
      .style("fill", "rgba(255, 1, 1, 0.7)");
  }, [data]);

  return (
    <div className="radar-chart">
      <svg ref={radarChart}></svg>
    </div>
  );
}

export default Performance;
