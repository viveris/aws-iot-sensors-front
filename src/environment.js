const temperatureDatasets = [
    {
        label: "T1",
        parsing: {
            yAxisKey: "T1",
        },
    },
    {
        label: "T2",
        parsing: {
            yAxisKey: "T2",
        },
    },
];
const temperatureFieldsMap = [
    ["T1", "temp_0_c"],
    ["T2", "temp_1_c"],
];

const sensorIds = [
    'stm32_1',
    'stm32_2',
    'stm32_3',
    'stm32_4',
];

sensorIds.forEach(sensorId => {
    const stm32u1TemperatureChart = initChart(sensorId + "Chart", temperatureDatasets, "Temperature (°C)");

    setDataUpdates(stm32u1TemperatureChart, "/measurements/environment/" + sensorId + "/recent", temperatureFieldsMap);
});
