import React, { useState } from "react";
import { Chart } from "primereact/chart";

const PollutionStats = () => {
  const [chartData] = useState({
    labels: ["A", "B", "C"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  });

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });

  return (
    <div className="main" style={{ backgroundColor: "white" }}>
      <div
        style={{ height: "50vh", display: "flex", justifyContent: "center" }}
      >
        <img
          src="loading1.gif"
          style={{ height: "50vh", display: "flex", allignItems: "center" }}
        />
      </div>
      <div className="card flex ">
        <div className="text-800 font-bold text-4xl mb-4 text-center">
          Reports Statics
        </div>
        <div className="flex p-8" style={{ width: "100vw" }}>
          <Chart
            type="doughnut"
            data={chartData}
            options={lightOptions}
            style={{ width: "350px" }}
          />
        </div>
        <div className="col-10 md:col-6  text-center md:text-center align-items-center ">
          <div className="flex-initial ">
            <div className="mb-2 text-center mt-7">
              <span className="block text-2xl mb-1">
                <strong>Air Quality Index:</strong> test
              </span>
              <span
                className="block text-2xl  mb-1"
                style={{ color: "orange" }}
              >
                <strong>Pending :</strong> {chartData.datasets[0].data[0]}
              </span>
              <span
                className="block text-2xl  mb-1"
                style={{ color: "#66BB6A" }}
              >
                <strong>Resolved :</strong> {chartData.datasets[0].data[1]}
              </span>
              <span className="block text-2xl mb-1">
                <strong>Number of active residents:</strong>{" "}
                {chartData.datasets[0].data[0] + chartData.datasets[0].data[1]}+
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// const PollutionStats = ({ reportData }) => {
//   function generateStatistics(
//     data,
//     styles = {
//       backgroundColor: ["#FFA726", "#66BB6A"],
//       hoverBackgroundColor: ["#FFB74D", "#81C784"],
//     }
//   ) {
//     let pending = 0,
//       resolved = 0;
//     data.forEach((report) => {
//       if (report.status === "completed") {
//         resolved += 1;
//       } else if (report.status === "pending") {
//         pending += 1;
//       }
//     });
//     return {
//       labels: ["Pending", "Resolved"],
//       datasets: [
//         {
//           data: [pending, resolved],
//           ...styles,
//         },
//       ],
//     };
//   }

//   let chartData = generateStatistics(reportData);
//   const lightOptions = {
//     plugins: {
//       legend: {
//         labels: {
//           color: "#495057",
//         },
//       },
//     },
//   };

//   return (
//     <div className="main" style={{ backgroundColor: "white" }}>
//       <div className="card flex p-6">
//         <div className="text-800 font-bold text-4xl mb-4 text-center">
//           Reports Statics
//         </div>
//         <div className="flex">
//           <Chart
//             type="doughnut"
//             data={chartData}
//             options={lightOptions}
//             style={{ position: "relative", width: "40%" }}
//           />
//   <div className="col-10 md:col-6 p-3 mt-2 text-center md:text-center align-items-center ">
//     <div className="flex-initial">
//       {/* <div className="mb-3 pr-2 flex-initial font-bold text-6xl text-center">
//         <span className="text-1100">User </span>
//         <span className="text-blue-1100">Details</span>
//       </div> */}
//       <div className="mb-2 text-center">
//         <span className="block text-2xl mb-1">
//           <strong>Total number of Reports:</strong> test
//         </span>
//         <span
//           className="block text-2xl  mb-1"
//           style={{ color: "orange" }}
//         >
//           <strong>Pending :</strong> {chartData.datasets[0].data[0]}
//         </span>
//         <span
//           className="block text-2xl  mb-1"
//           style={{ color: "#66BB6A" }}
//         >
//           <strong>Resolved :</strong> {chartData.datasets[0].data[1]}
//         </span>
//         <span className="block text-2xl mb-1">
//           <strong>Number of active residents:</strong>{" "}
//           {chartData.datasets[0].data[0] +
//             chartData.datasets[0].data[1]}
//           +
//         </span>
//       </div>
//     </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
export default PollutionStats;
