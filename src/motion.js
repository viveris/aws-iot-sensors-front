const accelerationDatasets = [
    {
        label: "x",
        parsing: {
            yAxisKey: "aX",
        },
    },
    {
        label: "y",
        parsing: {
            yAxisKey: "aY",
        },
    },
    {
        label: "z",
        parsing: {
            yAxisKey: "aZ",
        },
    },
];
const accelerationFieldsMap = [
    ["aX", "acceleration_mG_x"],
    ["aY", "acceleration_mG_y"],
    ["aZ", "acceleration_mG_z"],
];

const sensorIds = [
    'stm32_1',
    'stm32_2',
    'stm32_3',
    'stm32_4',
];

sensorIds.forEach(sensorId => {
    const stm32u1AccelerationChart = initChart(sensorId + "Chart", accelerationDatasets, "Acceleration (mG)");

    setDataUpdates(stm32u1AccelerationChart, "/measurements/motion/" + sensorId + "/recent", accelerationFieldsMap);
});
