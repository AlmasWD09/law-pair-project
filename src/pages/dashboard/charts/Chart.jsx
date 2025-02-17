import axios from "axios";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Chart = ({chartValue}) => {
    const axiosPublic = useAxiosPublic();
    const [chartHeight, setChartHeight] = useState(440);


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



    // useEffect(()=>{
    //     const res = axios.get('http://10.0.80.13:9000/api/admin/users')
    //     console.log(res.data)
    // },[])


    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 640) {
          setChartHeight(300);
        } else if (window.innerWidth < 1024) {
          setChartHeight(430);
        } else {
          setChartHeight(430);
        }
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            <div id="chart" className="bg-[#FFFF] my-6 p-4 rounded-lg">
                <ReactApexChart options={state.options} series={state.series} type="area" height={chartHeight} />
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

