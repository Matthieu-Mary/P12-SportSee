import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const RadarGraph = () => {
  const [data, setData] = useState([200, 240, 80, 80, 220, 110]);
  const [names, setNames] = useState([
    "Cardio",
    "Energie",
    "Endurance",
    "Force",
    "Vitesse",
    "Intensité",
  ]);
  const ref = useRef(null);

  useEffect(() => {
    const drawChart = () => {
      const width = 260;
      const height = 260;
      const margin = 70;
      const maxValue = 250;
      const levels = 5;
      const radians = 2 * Math.PI;
      const angleSlice = radians / names.length;

      // Remove old svg and create new svg element
      d3.select(ref.current).selectAll("*").remove();
      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      // Create scales for the axes
      const valueScale = d3
        .scaleLinear()
        .range([0, height / 2 - margin])
        .domain([0, maxValue]);

      // Draw the polygons
      const polygonWrapper = svg
        .append("g")
        .attr("class", "polygonWrapper")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      for (let j = levels; j > 0; j--) {
        const polygon = polygonWrapper
          .append("g")
          .attr("class", `polygon level-${j}`);

        const coordinates = names.map((name, i) => {
          const r = valueScale((maxValue * j) / levels);
          const angle = i * angleSlice;
          return [r * Math.sin(angle), -r * Math.cos(angle)];
        });

        const lineGenerator: any = d3
          .line()
          .x((d) => d[0])
          .y((d) => d[1])
          .curve(d3.curveLinearClosed);

        polygon
          .append("path")
          .attr("d", lineGenerator(coordinates))
          .attr("class", "polygon-line")
          .style("stroke-width", "2px")
          .style("stroke", "#555")
          .style("fill", "none");
      }

      // Draw the axes
      const axisWrapper = svg
        .append("g")
        .attr("class", "axisWrapper")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const axis = axisWrapper
        .selectAll(".axis")
        .data(names)
        .enter()
        .append("g")
        .attr("class", "axis");

      axis
        .append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr(
          "x2",
          (d, i) => valueScale(maxValue * 1.1) * Math.sin(i * angleSlice)
        )
        .attr(
          "y2",
          (d, i) => -valueScale(maxValue * 1.1) * Math.cos(i * angleSlice)
        )
        .attr("class", "line")
        .style("stroke", "#555")
        .style("stroke-width", "2px");

      // Add labels for the axes
      axis
        .append("text")
        .attr("class", "legend")
        .style("font-size", "16px")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr(
          "x",
          (d, i) => valueScale(maxValue * 1.1) * Math.sin(i * angleSlice)
        )
        .attr(
          "y",
          (d, i) => -valueScale(maxValue * 1.1) * Math.cos(i * angleSlice)
        )
        .text((d) => d);

      // Draw the data
      const dataWrapper = svg
        .append("g")
        .attr("class", "dataWrapper")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const dataPoints = names.map((name, i) => {
        const r = valueScale(data[i]);
        const angle = i * angleSlice;
        return [r * Math.sin(angle), -r * Math.cos(angle)];
      });

      const dataPolygon = dataWrapper
        .append("path")
        .datum(dataPoints)
        .attr("class", "dataPolygon")
        .style("stroke-width", "2px")
        .style("stroke", "#009688")
        .style("fill", "rgba(0, 150, 136, 0.3)");

      const dataPointsCircles = dataWrapper
        .selectAll(".dataPointsCircle")
        .data(dataPoints)
        .enter()
        .append("circle")
        .attr("class", "dataPointsCircle")
        .attr("cx", (d) => d[0])
        .attr("cy", (d) => d[1])
        .attr("r", 5)
        .style("fill", "#009688");
    };

    drawChart();
  }, [data, names]);

  return <div ref={ref}></div>;
};

export default RadarGraph;
