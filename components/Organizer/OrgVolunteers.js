import React, { useState } from "react";
import NavBar from "../NavBar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const OrgVolunteers = () => {
  const [Display, setDisplay] = useState(false);
  const [Display1, setDisplay1] = useState(false);
  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
      <div className="main">
        <NavBar />
      </div>
      <div className="text-800 font-bold text-4xl mt-8 mb-3 text-center">
        Available Volunteers in Your locality
      </div>
      <div className="surface-0  p-6 pb-3 shadow-2 border-round">
        <div
          style={{ height: "auto", backgroundColor: "white" }}
          className="border-2 border-dashed border-300 p-4"
        >
          <div className="grid p-5">
            <div className="col-4">
              <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                <div className="flex justify-content-between mb-3">
                  <div>
                    <span className="block text-1xl mb-1">
                      <strong>Name:</strong> test
                    </span>
                    <span className="block text-1xl mb-1">
                      <strong>Volunteer Since:</strong>
                      {"   "}
                      <i className="pi pi-calendar"></i>12- 04 -23
                    </span>
                    <span className="block text-1xl mb-1">
                      <strong>Contact:</strong> test.rsd@gmail.com
                    </span>
                  </div>
                  <div
                    className="flex align-items-center justify-content-center bg-blue-100 border-round"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                  >
                    <i className="pi pi-user text-blue-500 text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            label="View in map"
            icon=" pi pi-map"
            onClick={() => {
              setDisplay(true);
            }}
            className=" p-button-text mt-2 "
          />
        </div>
        <Dialog
          className="mt-3"
          visible={Display}
          style={{ width: "60vw", height: "90vh" }}
          onHide={() => {
            setDisplay(false);
          }}
        ></Dialog>
      </div>
      <div>
        <div className="text-700 text-1xl  p-7 pb-4 ">
          The Organizer role involves gathering local volunteers in the
          designated area to work on events and projects related to waste
          management. This includes coordinating efforts to clean up the
          community and promoting sustainable practices. The organizer will act
          as a leader, bringing together volunteers to make a positive impact on
          their local environment. By volunteering as an organizer, individuals
          can play a crucial role in promoting waste reduction and environmental
          preservation in their community
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            label="Recruit now"
            onClick={() => {
              setDisplay1(true);
            }}
            className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
          />
          <Dialog
            className="mt-3"
            visible={Display1}
            style={{ width: "50vw", height: "78vh" }}
            onHide={() => {
              setDisplay1(false);
            }}
          ></Dialog>
        </div>
        <br />
      </div>
    </div>
  );
};

export default OrgVolunteers;
