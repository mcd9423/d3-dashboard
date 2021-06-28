import React, { useState } from "react";
import DonutComponent from "./components/DonutChart/DonutComponent";
import BarChart from "./components/BarChart/BarChart";
import LineChart from "./components/LineChart/LineChart";

const App = props => {
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [groupColor, setGroupColor] = useState("lightgrey");

  function updateBarChart(group, color) {
    setSelectedGroup(group);
    setGroupColor(color);
  }

  return (
    <div>
      <svg viewBox="-2 0 100 100" preserveAspectRatio="xMidYMid meet">
        <DonutComponent x={15} y={20} onChangeGroup={updateBarChart} />
        <BarChart
          positionX={35}
          positionY={50}
          width={80}
          height={100}
          selectedGroup={selectedGroup}
          barColor={groupColor}
        />
        <LineChart
          positionX={35}
          positionY={4}
          selectedGroup={selectedGroup}
          lineColor={groupColor}
        />
      </svg>
    </div>
  );
};

export default App;
