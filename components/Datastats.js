import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";

const DataStats = () => {
  let [loading, setLoading] = useState(true);
  let chartData = {
    labels: ["Bio-degradable", "Non Bio-degradable"],
    datasets: [
      {
        data: [55 + Math.random(), 100 - Math.random() - 50],
        backgroundColor: ["#FFA726", "#66BB6A"],
        hoverBackgroundColor: ["#FFB74D", "#81C784"],
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  const lightOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  };

  return;
  {
    loading ? (
      <img
        src="/loading.gif"
        style={{ objectFit: "contain" }}
        alt="Loading..."
      />
    ) : (
      <div className="main" style={{ backgroundColor: "white" }}>
        <div className="card flex p-6">
          <div className="text-800 font-bold text-4xl mb-4 text-center">
            Content Statics
          </div>
          <div className="flex">
            <Chart
              type="pie"
              data={chartData}
              options={lightOptions}
              style={{
                position: "relative",
                width: "300px",
                height: "40vh",
              }}
            />
            <div className="col-10 md:col-6 p-3 mt-2 text-center md:text-center align-items-center ">
              <div className="flex-initial">
                {/* <div className="mb-3 pr-2 flex-initial font-bold text-6xl text-center">
                <span className="text-1100">User </span>
                <span className="text-blue-1100">Details</span>
              </div> */}
                <div className="mb-2 text-center">
                  <span
                    className="block text-1.5xl  mb-1"
                    style={{ color: "orange" }}
                  >
                    <strong> High percent of Bio-degradable waste :</strong> It
                    indicates that litter of the current image contains high
                    amount of Recycleable waste
                  </span>
                  <span
                    className="block text-1.5xl  mt-7"
                    style={{ color: "#66BB6A" }}
                  >
                    <strong>
                      High percentage of Non Bio-degradable waste :
                    </strong>{" "}
                    indicates that litter of the current image contains high
                    amount of plastic waste
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default DataStats;
