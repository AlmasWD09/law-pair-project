// import { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const Chart = ({ chartValue,curdTitle }) => {
//     const [chartHeight, setChartHeight] = useState(440);
//     const [chartData, setChartData] = useState({
//         prices: [],
//         dates: [],
//     });

//     // Update chart data when props change
//     useEffect(() => {
//         if (chartValue?.length > 0) {
//             const dates = chartValue.map(item => item.month);  // Extract months
//             const prices = chartValue.map(item => item.data);  // Extract data values
//             setChartData({ prices, dates });
//         }
//     }, [chartValue]);

//     const chartOptions = {
//         chart: {
//             type: "area",
//             height: 350,
//             zoom: { enabled: false },
//             toolbar: { show: false },
//         },
//         dataLabels: { enabled: false },
//         stroke: { curve: "smooth" },
//         title: {
//             text: `${curdTitle}`,
//             align: "left",
//         },
//         title: {
//             text: `${curdTitle}`,
//             align: "left",
//         },
//         subtitle: {
//             text: "Dynamic Analytics",
//             align: "left",
//         },
//         xaxis: {
//             categories: chartData.dates, // Dynamic months
//             type: "category",
//         },
//         yaxis: {},
//         legend: { horizontalAlign: "left" },
//     };

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth < 640) {
//                 setChartHeight(300);
//             } else if (window.innerWidth < 1024) {
//                 setChartHeight(430);
//             } else {
//                 setChartHeight(540);
//             }
//         };

//         window.addEventListener("resize", handleResize);
//         handleResize();

//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     return (
//         <div>
//             <div id="chart" className="bg-[#FFFF] my-6 p-4 rounded-lg">
//                 {chartData.prices.length > 0 ? (
//                     <ReactApexChart
//                         options={chartOptions}
//                         series={[{ name: `Monthly ${curdTitle}`, data: chartData.prices }]}
//                         type="area"
//                         height={chartHeight}
//                     />
//                 ) : (
//                     <p>Loading chart...</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Chart;





import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ chartValue, curdTitle, selectedYear, handleYearChange }) => {
    const [chartHeight, setChartHeight] = useState(440);
    const [chartData, setChartData] = useState({
        prices: [],
        dates: [],
    });

    const getLastTwoYears = () => {
        const currentYear = new Date().getFullYear();
        return [currentYear - 1, currentYear];  // Last 2 years
    };

    // Update chart data when props change
    useEffect(() => {
        if (chartValue?.length > 0) {
            const dates = chartValue.map((item) => item.month);
            const prices = chartValue.map((item) => item.data);
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
        legend: { horizontalAlign: "right" },
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setChartHeight(300);
            } else if (window.innerWidth < 1024) {
                setChartHeight(430);
            } else {
                setChartHeight(540);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex flex-col">
            {/* Dropdown for year selection */}
            <div className="p-4 flex">
                <select
                    value={selectedYear}
                    onChange={(e) => handleYearChange(e.target.value)}  // Use passed handler
                    className="border p-2 rounded"
                >
                    {getLastTwoYears().map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            {/* Chart */}
            <div id="chart" className="w-full bg-[#FFFF] my-6 p-4 rounded-lg">
                {chartData.prices.length > 0 ? (
                    <ReactApexChart
                        options={chartOptions}
                        series={[{ name: `Monthly ${curdTitle}`, data: chartData.prices }]}
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
