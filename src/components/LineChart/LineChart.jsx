import React, { useEffect } from "react";
import { scaleLinear, max, line, select } from "d3";
import { lineChartData } from "../../testData";

const lineTitleTextStyle = {
  fontSize: "8px",
  fontFamily: "verdana",
  fontWeight: "bold"
};

const lineSubTitleTextStyle = {
  fontSize: "2px",
  fontFamily: "verdana",
  fontWeight: "bold"
};

const amimateLine = (xScale, yScale, currentLine, lineColor, selectedData) => {
  const lineDefinition = line()
    .x((d, i) => xScale(i) * 0.1)
    .y(d => yScale(d.measure) * 0.1);

  const newLinePath = lineDefinition(selectedData);

  currentLine
    .transition()
    .duration(650)
    .attr("d", newLinePath)
    .attr("stroke", lineColor);
};

const animateDots = (
  xScale,
  yScale,
  dotsContainer,
  dotsColor,
  selectedData
) => {
  const dotsCoords = selectedData.map((item, index) => {
    return { x: xScale(index) * 0.1, y: yScale(item.measure) * 0.1 };
  });

  const dots = dotsContainer.selectAll("circle");

  const getDotColor = index => {
    const measures = selectedData.map(item => item.measure);
    const minValue = Math.min.apply(null, measures);
    const maxValue = Math.max.apply(null, measures);
    let fillColor = "white";
    if (measures[index] === minValue) {
      fillColor = "red";
    } else if (measures[index] === maxValue) {
      fillColor = "green";
    }
    return fillColor;
  };

  dots.each(function(d, i) {
    select(this)
      .transition()
      .duration(650)
      .attr("cx", dotsCoords[i].x)
      .attr("cy", dotsCoords[i].y)
      .attr("fill", getDotColor(i))
      .attr("stroke", dotsColor)
      .attr("stroke-width", 0.15);
  });
};

const Dots = props => {
  const { xScale, yScale, dotsColor, selectedData } = props;
  const dotsRef = React.createRef();

  useEffect(() => {
    const dotsContainer = select(dotsRef.current);
    animateDots(xScale, yScale, dotsContainer, dotsColor, selectedData);
  });

  const dots = selectedData.map((item, index) => (
    <circle key={index} r={0.3}>
      <title>{`${item.category}: ${Math.floor(item.measure)}`}</title>
    </circle>
  ));

  return <g ref={dotsRef}>{dots}</g>;
};

const Line = props => {
  const { xScale, yScale, lineColor, selectedData } = props;
  const lineRef = React.createRef();

  useEffect(() => {
    const currentLine = select(lineRef.current);
    amimateLine(xScale, yScale, currentLine, lineColor, selectedData);
  });

  return (
    <g>
      <path ref={lineRef} strokeWidth="0.3" fill="none" />
    </g>
  );
};

const LineChart = props => {
  const { selectedGroup, lineColor, positionX, positionY } = props;
  const margin = { top: 20, right: 10, bottom: 0, left: 50 };
  const selectedData = lineChartData.filter(
    datum => datum.group === selectedGroup
  );
  const width = 500 - margin.left - margin.right;
  const height = 150 - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain([0, selectedData.length - 1])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([0, max(selectedData, d => d.measure)])
    .range([height, 0]);

  return (
    <g transform={`translate(${positionX}, ${positionY})`}>
      <text
        textAnchor="middle"
        style={lineSubTitleTextStyle}
        fill="lightgrey"
        x={22}
        y={-2}
      >
        Performance 2021
      </text>
      <Line
        xScale={xScale}
        yScale={yScale}
        lineColor={lineColor}
        selectedData={selectedData}
      />
      <Dots
        xScale={xScale}
        yScale={yScale}
        dotsColor={lineColor}
        selectedData={selectedData}
      />
    </g>
  );
};

export default LineChart;
