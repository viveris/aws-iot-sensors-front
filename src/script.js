Chart.defaults.color = "#000000";
Chart.defaults.font.size = 16;

const ctx = document.getElementById('stm32u1Chart').getContext('2d');

const chart = new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: [
      {
        label: "x",
        data: [],
        parsing: {
          yAxisKey: "a_x",
        },
        showLine: true,
        borderWidth: 1,
      },
      {
        label: "y",
        data: [],
        parsing: {
          yAxisKey: "a_y",
        },
        showLine: true,
        borderWidth: 1,
      },
      {
        label: "z",
        data: [],
        parsing: {
          yAxisKey: "a_z",
        },
        showLine: true,
        borderWidth: 1,
      },
    ]
  },
  options: {
    animation: false,
    scales: {
      x: {
        title: {
          text: "Time from now (s)",
          display: true,
        },
      },
      y: {
        title: {
          text: "Acceleration (mG)",
          display: true,
        }
      },
    }
  }
});

const apiUrl = "https://ynvl3toggi.execute-api.eu-west-3.amazonaws.com/v1";

let url = apiUrl + "/measurements/motion/stm32_1/recent";

let options = {
  headers: {
    'Accept': 'application/json',
  },
};

function updateData() {
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      let items = data["Items"];
      let now = Date.now();
      let plotData = items.map(e => {
        return {
          x: (Number(e.timestamp.N) - now) / 1000,
          a_x: Number(e.payload.M.acceleration_mG_x.N),
          a_y: Number(e.payload.M.acceleration_mG_y.N),
          a_z: Number(e.payload.M.acceleration_mG_z.N),
        }
      });
      chart.data.datasets[0].data = plotData;
      chart.data.datasets[1].data = plotData;
      chart.data.datasets[2].data = plotData;
      chart.update();
    });
}

setInterval(updateData, 1000);
