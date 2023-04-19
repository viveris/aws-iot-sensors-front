Chart.defaults.color = "#000000";
Chart.defaults.font.size = 12;


const apiUrl = "https://wunfz8npma.execute-api.eu-west-3.amazonaws.com/v1";


function initChart(id, datasets, yLabel) {
  const ctx = document.getElementById(id).getContext('2d');

  const datasetDefaults = {
    data: [],
    showLine: true,
    borderWidth: 1,
  };
  const newDatasets = datasets.map(
    function (e) {
      return {...datasetDefaults, ...e};
    }
  );

  const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: newDatasets,
    },
    options: {
      animation: false,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            text: "Time from now (s)",
            display: true,
          },
          min: -300,
          max: 10,
        },
        y: {
          title: {
            text: yLabel,
            display: true,
          }
        },
      }
    }
  });

  return chart;
}

function setDataUpdates(chart, urlPath, fieldsMap) {
  function updateData() {
    const options = {
      headers: {
        'Accept': 'application/json',
      },
    };

    const url = apiUrl + urlPath;
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        const items = data["Items"];
        const now = Date.now() / 1000;
        const plotData = items.map(e => {
          const formattedData = {
            x: (Number(e.timestamp.N) - now),
          }
          fieldsMap.forEach(yElem => {
            const destField = yElem[0];
            const srcField = yElem[1];
            formattedData[destField] = Number(e.payload.M[srcField].N);
          });
          return formattedData;
        });
        chart.data.datasets.forEach(e => {
          e.data = plotData;
        });
        chart.update();
      });
  }

  setInterval(updateData, 1000);
}
