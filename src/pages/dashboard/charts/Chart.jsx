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




// import { useState, useEffect } from "react";
// import ReactApexChart from "react-apexcharts";

// const Chart = () => {
//     // ✅ Static Data (Hardcoded)
//     const staticData = {
//         months: ["January", "February", "March", "April", "May", "June"],
//         totalUsers: [10, 25, 15, 30, 20, 35],
//         totalClients: [5, 10, 8, 15, 12, 18],
//         totalLawyers: [3, 8, 5, 12, 10, 20],
//     };

//     const [chartData, setChartData] = useState({
//         series: [
//             { name: "Total Users", data: staticData.totalUsers },
//             { name: "Total Clients", data: staticData.totalClients },
//             { name: "Total Lawyers", data: staticData.totalLawyers },
//         ],
//         options: {
//             chart: { type: "area", height: 350, zoom: { enabled: false } },
//             dataLabels: { enabled: false },
//             stroke: { curve: "smooth" },
//             title: { text: "User Analytics (Static Data)", align: "left" },
//             labels: staticData.months,
//             xaxis: { categories: staticData.months, type: "category" },
//             yaxis: { opposite: false },
//             legend: { horizontalAlign: "left" },
//         },
//     });

//     const [chartHeight, setChartHeight] = useState(440);

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth < 640) {
//                 setChartHeight(300);
//             } else if (window.innerWidth < 1024) {
//                 setChartHeight(450);
//             } else {
//                 setChartHeight(440);
//             }
//         };

//         window.addEventListener("resize", handleResize);
//         handleResize();

//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     return (
//         <div>
//             <div id="chart" className="bg-white my-6 p-4 rounded-lg shadow-lg">
//                 <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={chartHeight} />
//             </div>
//         </div>
//     );
// };

// export default Chart;

// import { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import axios from "axios";

// const Chart = () => {
//     const [chartData, setChartData] = useState({
//         series: [],
//         options: {
//             chart: {
//                 type: "area",
//                 height: 350,
//                 zoom: { enabled: false },
//             },
//             dataLabels: { enabled: false },
//             stroke: { curve: "straight" },
//             title: { text: "User Analytics", align: "left" },
//             labels: [],
//             xaxis: { categories: [], type: "category" },
//             yaxis: { opposite: true },
//             legend: { horizontalAlign: "left" },
//         },
//     });

//     const [chartHeight, setChartHeight] = useState(440);

//     useEffect(() => {
   
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("http://10.0.80.13:9000/api/admin/dashboard");
//                 const apiData = response.data.data;


//                 const months = apiData.map((item) => item.month);
//                 const totalUsers = apiData.map((item) => item.total_users);
//                 const totalClients = apiData.map((item) => item.total_clients);
//                 const totalLawyers = apiData.map((item) => item.total_lawyers);

         
//                 setChartData({
//                     series: [
//                         { name: "Total Users", data: totalUsers },
//                         { name: "Total Clients", data: totalClients },
//                         { name: "Total Lawyers", data: totalLawyers },
//                     ],
//                     options: {
//                         chart: { type: "area", height: 350, zoom: { enabled: false } },
//                         dataLabels: { enabled: false },
//                         stroke: { curve: "smooth" },
//                         title: { text: "User Analytics", align: "left" },
//                         labels: months,
//                         xaxis: { categories: months, type: "category" },
//                         yaxis: { opposite: false },
//                         legend: { horizontalAlign: "left" },
//                     },
//                 });
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth < 640) {
//                 setChartHeight(300);
//             } else if (window.innerWidth < 1024) {
//                 setChartHeight(450);
//             } else {
//                 setChartHeight(440);
//             }
//         };

//         window.addEventListener("resize", handleResize);
//         handleResize();

//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     return (
//         <div>
//             <div id="chart" className="bg-[#FFFF] my-6 p-4 rounded-lg">
//                 <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={chartHeight} />
//             </div>
//         </div>
//     );
// };

// export default Chart;

