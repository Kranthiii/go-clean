import React from "react";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";

const UserRequest = () => {
  const customizedContent = (item) => {
    return (
      <Card title={item.status} subTitle={item.date}>
        {item.image && (
          <img
            src={`images/product/${item.image}`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={item.name}
            width={200}
            className="shadow-1"
          />
        )}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
      </Card>
    );
  };

  const customizedMarker = (item) => {
    return (
      <span
        className="custom-marker shadow-1"
        style={{ backgroundColor: item.color }}
      >
        <i className={item.icon}></i>
      </span>
    );
  };
  return (
    <div className="surface-0 p-4 shadow-2 border-round">
      <div className="grid grid-nogutter surface-0 text-800">
        <div
          className="col-5 md:col-6 overflow-hidden"
          style={{ height: "240px" }}
        >
          <img
            src="/clean.jpg"
            alt="hero-1"
            className="md:ml-auto block md:h-full"
            style={{
              marginRight: "50px",
              borderRadius: "700px",
              width: "300px",
            }}
          />
        </div>
        <div className="col-6 md:col-6 p-6 text-center md:text-left flex align-items-center ">
          <div style={{ display: "inline" }}>
            <span className="block text-3xl font-bold mb-1">Location :</span>
            <p
              style={{
                margin: "0",
                marginBottom: "0",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              &nbsp;&nbsp; data.Location
            </p>
            <span className="block text-3xl font-bold mb-1">Location :</span>
            <p
              style={{
                margin: "0",
                marginBottom: "0",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              &nbsp;&nbsp; data.Location
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRequest;
