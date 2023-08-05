import React, { useState } from "react";
import NavBar from "./NavBar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";

const Find = () => {
  const [Description, setDescription] = useState("");
  const [Reason, setReason] = useState("");
  const [Display, setDisplay] = useState(false);
  return (
    <div style={{ backgroundColor: "white" }}>
      <div>
        <NavBar />
      </div>
      <div className="surface-0 text-700 text-center pt-8 pl-2 pr-2">
        <div className="infoContainer">
          <img src="/logo1.png" alt="hyper" height={150} className="mb-3" />
          <div className="text-900 font-bold text-4xl mb-1 p-4">
            Proper Disposal: How Individuals Can Help to Save the Environment
          </div>

          <div className="text-700 text-1xl  pl-6 pr-6 p-4">
            "Proper disposal of items is one of the most important ways that
            individuals can help to save the environment. By properly disposing
            of waste, including recyclable materials, hazardous materials, and
            electronic waste, individuals can help to reduce pollution, conserve
            natural resources, and protect the environment for future
            generations. This can include things like properly recycling paper,
            plastic, and glass, composting food waste, and properly disposing of
            batteries, light bulbs, and other hazardous materials. Additionally,
            individuals can also reduce waste by purchasing products with
            minimal packaging, and by reusing or repurposing items instead of
            disposing of them. By taking these simple steps, individuals can
            play an important role in helping to preserve the environment."
          </div>
        </div>
      </div>
      <br />
      <div className="grid grid-nogutter surface-0 text-800 mt-5">
        <div className="flex align-items-center justify-content-center p-8 m-3">
          <div className="text-center mb-3">
            <img src="/Leaf.jpg" alt="hyper" height={100} className="mb-3" />
            <div className="text-900 text-3xl font-medium mb-3">
              <Button
                icon="pi pi-info"
                className="p-button-rounded p-button-info p-button-text pt-3"
                aria-label="User"
                onClick={(e) => setDisplay(true)}
              />
              Volunteer Form
            </div>

            <div>
              <label htmlFor="text" className="block text-900 font-medium mb-1">
                Why you want to apply as volunteer?
              </label>
              <InputTextarea
                rows={6}
                cols={60}
                placeholder="Enter here........"
                value={Reason}
                onChange={(e) => setReason(e.target.value)}
              />

              <br />

              <Button
                label="Submit"
                icon="pi pi-search"
                className="w-full mt-5"
              />
              <Dialog
                className="mt-3"
                visible={Display}
                style={{ width: "60vw", height: "90vh" }}
                onHide={() => {
                  setDisplay(false);
                }}
              ></Dialog>
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 overflow-hidden">
          <img
            src="/Find.webp"
            alt="hero-1"
            className="md:ml-auto block md:h-full"
            style={{
              height: "50vh",
              width: "50vw",
              scale: "0.9",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Find;
