import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartDataset,
  LogarithmicScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { observer } from "mobx-react-lite";
import { useStore } from "../../Hooks/useStore";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LogarithmicScale,
  Title,
  Tooltip,
  Legend
);

const colors = [
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(255, 159, 64)",
  "rgb(150, 192, 10)",
  "rgb(255, 99, 10)",
  "rgb(255, 10, 130)",
  "rgb(20, 10, 130)",
  "rgb(150, 20, 0)",
  "rgb(20, 200, 0)",
  "rgb(54, 10, 235)",
];

export const ViewerByLanguage = observer(() => {
  const store = useStore();

  const lastDataPoint = store.dataPoints.length > 0 ? store.dataPoints[store.dataPoints.length - 1] : undefined;

  const dataSets = new Map<
    string,
    ChartDataset<
      "line",
      {
        x: number;
        y: number;
      }[]
    >
  >();

  if (lastDataPoint !== undefined) {

    const top10Languages = lastDataPoint.viewersByLanguage.slice().sort((a, b) => (a[1] > b[1] ? -1 : 1)).slice(0, 10).map((language) => language[0]);

    store.dataPoints.forEach((dataPoint) => {
      dataPoint.viewersByLanguage.forEach((viewersByLanguage) => {
        if (!top10Languages.includes(viewersByLanguage[0])) {
          return;
        }
        let dataSet = dataSets.get(viewersByLanguage[0]);
        if (dataSet === undefined) {
          const color = colors[dataSets.size % colors.length];
          dataSet = {
            label: new Intl.DisplayNames(["fr"], { type: "language" }).of(
              viewersByLanguage[0]
            ),
            data: [],
            fill: false,
            borderColor: color,
            tension: 0.1,
          };
          dataSets.set(viewersByLanguage[0], dataSet);
        }
        dataSet.data.push({
          x: dataPoint.timestamp,
          y: viewersByLanguage[1],
        });
      });
    });
  }

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
          datasets: Array.from(dataSets.values()),
        }}
        options={{
          scales: {
            x: {
              type: "time",
            },
            y: {
              type: "logarithmic",
            },
          },
        }}
      />
    </div>
  );
});
