import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { observer } from "mobx-react-lite";
import { useStore } from "../../Hooks/useStore";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const TotalViewerNumberChart = observer(() => {
  const store = useStore();

  const data = store.dataPoints.map((dataPoint) => {
    return { x: dataPoint.timestamp, y: dataPoint.totalViewerCount };
  });

  return (
    <div
    style={{
      height: "50vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Line
      data={{
        datasets: [
          {
            label: "Nombre de spectateurs",
            data: data,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      }}
      options={{
        scales: {
          x: {
            type: "time",
          },
        },
      }}
    />
    </div>
  );
});
