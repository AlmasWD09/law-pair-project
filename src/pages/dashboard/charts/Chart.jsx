import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ chartValue,curdTitle }) => {
    const [chartHeight, setChartHeight] = useState(440);
    const [chartData, setChartData] = useState({
        prices: [],
        dates: [],
    });

    // Update chart data when props change
    useEffect(() => {
        if (chartValue?.length > 0) {
            const dates = chartValue.map(item => item.month);  // Extract months
            const prices = chartValue.map(item => item.data);  // Extract data values
            setChartData({ prices, dates });
        }
    }, [chartValue]);

    const chartOptions = {
        chart: {
            type: "area",
            height: 350,
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
        title: {
            text: `${curdTitle}`,
            align: "left",
        },
        subtitle: {
            text: "Dynamic Analytics",
            align: "left",
        },
        xaxis: {
            categories: chartData.dates, // Dynamic months
            type: "category",
        },
        yaxis: {},
        legend: { horizontalAlign: "left" },
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setChartHeight(300);
            } else if (window.innerWidth < 1024) {
                setChartHeight(430);
            } else {
                setChartHeight(440);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            <div id="chart" className="bg-[#FFFF] my-6 p-4 rounded-lg">
                {chartData.prices.length > 0 ? (
                    <ReactApexChart
                        options={chartOptions}
                        series={[{ name: "Monthly Data", data: chartData.prices }]}
                        type="area"
                        height={chartHeight}
                    />
                ) : (
                    <p>Loading chart...</p>
                )}
            </div>
        </div>
    );
};

export default Chart;

