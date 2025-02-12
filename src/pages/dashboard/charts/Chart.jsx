import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Chart = () => {
    const seriesData = {
        monthDataSeries1: {
            prices: [8100, 8120, 8135, 8105, 8140, 8125, 8150, 8170, 8190, 8210],
            dates: [
                "2024-02-01",
                "2024-02-02",
                "2024-02-03",
                "2024-02-04",
                "2024-02-05",
                "2024-02-06",
                "2024-02-07",
                "2024-02-08",
                "2024-02-09",
                "2024-02-10",
            ],
        },
    };

    const [state] = useState({
        series: [
            {
                name: "STOCK ABC",
                data: seriesData.monthDataSeries1.prices,
            },
        ],
        options: {
            chart: {
                type: "area",
                height: 350,
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "straight",
            },
            title: {
                text: "Clients",
                align: "left",
            },
            subtitle: {
                text: "Static analytics",
                align: "left",
            },
            labels: seriesData.monthDataSeries1.dates,
            xaxis: {
                type: "datetime",
            },
            yaxis: {
                opposite: true,
            },
            legend: {
                horizontalAlign: "left",
            },
        },
    });

    return (
        <div>
            <div id="chart" className="bg-[#FFFF] my-6 p-4 rounded-lg">
                <ReactApexChart options={state.options} series={state.series} type="area" height={440} />
            </div>
        </div>
    );
};

export default Chart;
