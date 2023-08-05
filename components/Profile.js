import React, { useEffect, useState } from "react";
import { Paginator } from "primereact/paginator";
import UserRequest from "./UserRequest";
import NavBar from "./NavBar";
import { Card } from "primereact/card";
import { useSession } from "next-auth/react";

const Profile = () => {
  const session = useSession();
  const [data, setdata] = useState([]);
  const [reportdata, setReportdata] = useState([]);

  useEffect(() => {
    console.log({ session });
    if (session.status === "authenticated") {
      fetch("/api/reports", {
        method: "POST",
        body: JSON.stringify({
          usernames: [session?.data?.user?.username],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setReportdata(data.result[0].reports);
        });
    }
  }, [session]);

  const [basicFirst, setBasicFirst] = useState(0);
  const [basicRows, setBasicRows] = useState(10);
  const onBasicPageChange = (event) => {
    setBasicFirst(event.first);
    setBasicRows(event.rows);
  };
  return (
    <div className="root" style={{ backgroundColor: "white", height: "100vh" }}>
      <div>
        <NavBar />
      </div>
      <div className="grid grid-nogutter surface-0 text-800 pt-5" id="profile">
        <div className="col-12 md:col-6 overflow-hidden flex align-items-center">
          <img
            src="/avatar.png"
            alt="hero-1"
            className="md:ml-auto block md:h-full"
            style={{
              clipPath: "polygon(8% 0, 100% 0%, 100% 100%, 0 100%)",
              scale: "0.7",
            }}
          />
        </div>
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
          <div className="flex-initial">
            <div className="mb-3 pr-2 flex-initial font-bold text-6xl text-center">
              <span className="text-1100">User </span>
              <span className="text-blue-1100">Details</span>
            </div>
            <div className="mb-3 text-center">
              <span className="block text-2xl mb-1">
                <strong>Name: </strong>
                {session?.data?.user?.username}
              </span>
              <span className="block text-2xl  mb-1">
                <strong>Email:</strong> {session?.data?.user?.email || "-"}
              </span>
              <span className="block text-2xl  mb-1">
                <strong>Role:</strong> {session?.data?.user?.role || "-"}
              </span>

              <span className="block text-2xl  mb-1">
                <strong>Number of contributions:</strong>
                <img src="/Badge.webp" style={{ height: "50px" }} />
                {reportdata.length}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="text-900 font-bold text-5xl mb-3 p-5 text-center"
        style={{ marginTop: "20px" }}
      >
        User Complaints
      </div>
      {reportdata.length > 0 ? (
        <div className="items" style={{ height: "50vh" }}>
          <div
            className="border-2 border-dashed p-5 border-300 border-round-lg"
            style={{
              height: "300px",
              boxShadow: "box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;",
              margin: "40px",
            }}
          >
            <div
              className="grid grid-nogutter surface-0 text-800"
              style={{ height: "300px" }}
            >
              <div
                className="col-12 md:col-6 overflow-hidden"
                style={{ height: "300px" }}
              >
                <img
                  src={reportdata[reportdata.length - 1].imageURL}
                  alt="hero-1"
                  className="md:ml-auto block md:"
                  style={{ height: "300px", width: "340px" }}
                />
              </div>

              <div
                className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center"
                style={{
                  height: "300px",
                  padding: "40px",
                }}
              >
                <div className="surface-0 text-700 text-center">
                  <div className="text-900 font-bold text-4xl mb-1">
                    {reportdata[reportdata.length - 1].status}
                  </div>
                  <h5 style={{ color: "orange" }}>Pending</h5>
                  <div className="text-900 font-bold text-3xl mb-1">
                    {reportdata[reportdata.length - 1].description}
                  </div>
                  <div className="text-700 text-1xl mb-5">
                    Your report is successfully submitted waiting for response
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
