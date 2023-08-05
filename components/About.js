import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import NavBar from "./NavBar";
import dynamic from "next/dynamic";
import { getLocalCoordinates } from "../lib/locationUtils";
import { formatData, getVolunteerFormData } from "../lib/formatUtils";

const DynamicMap = dynamic(() => import("./VolunteerMap"), {
  ssr: false,
});

const About = () => {
  const [localCoords, setLocalCoords] = useState({ lat: 51.505, long: -0.09 });
  const [volunteerFormData, setVolunteerFormData] = useState([]);

  useEffect(() => {
    getLocalCoordinates()
      .then((position) => {
        setLocalCoords({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        return position;
      })
      .then((localCoords) => {
        console.log({ localCoords });
        return fetch("/api/localdata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            center: {
              lat: localCoords.coords.latitude,
              long: localCoords.coords.longitude,
            },
            radius: 100,
          }),
        });
      })
      .then((res) => res.json())
      .then((data) => {
        console.log({
          data: getVolunteerFormData(data.result),
        });
        setVolunteerFormData(getVolunteerFormData(data.result));
      });
  }, []);

  // Required
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [description1, setdescription1] = useState("");
  const [description2, setdescription2] = useState("");
  const [name, setname] = useState("");
  // End

  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
  };
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
      <div>
        <NavBar />
      </div>
      <div className="surface-0 text-700 text-center pt-8">
        <img src="/logo1.png" alt="hyper" height={150} className="mb-3" />
        <div className="text-900 font-bold text-5xl mb-3">
          About our Volunteer community
        </div>

        <div className="text-700 text-1xl mb-3 pl-6 pr-6">
          Our volunteer program is all about empowering the community to make a
          difference in their surroundings. By participating in our program,
          anyone can help to improve the society by cleaning up their local
          area. We believe that small actions can lead to big change, and that's
          why we're dedicated to providing a platform for individuals to make a
          positive impact. As a participant in our program, you will be provided
          with a certificate recognizing your contributions. Additionally, we
          encourage volunteers in a specific location to form groups and
          organize volunteer camps and programs. By working together, we can
          make a bigger impact on our community by cleaning up waste and
          improving the environment. Whether you're an individual looking to
          make a difference, or a group looking to organize a volunteer event,
          our program is open to all. Join us and become a part of a community
          of individuals working together to create a cleaner and more
          sustainable future.
        </div>
        <br />
        <div
          style={{ height: "60vh", borderRadius: "30px", margin: "20px" }}
          className="border-2 border-dashed border-300 p-6"
        >
          <DynamicMap data={volunteerFormData} center={localCoords} />
        </div>
        {/* Start of Organizer */}
        <div className="grid grid-nogutter surface-0 text-800">
          <div
            className="col-12 md:col-6 overflow-hidden"
            style={{ height: "600px" }}
          >
            <img
              src="/Organizer.jpg"
              alt="hero-1"
              className="md:ml-auto block md:h-full"
              style={{ width: "50vw", scale: "0.8" }}
            />
          </div>
          <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
            <div className="surface-0 text-700 text-center">
              <div className="text-900 font-bold text-5xl mb-3">
                Want to become an organizer?
              </div>
              <div className="text-700 text-2xl mb-5">
                Be the change you wish to see in the world - Join our waste
                management team as a Organizer today!
              </div>
              {/* Volunteer Form */}
              <Button
                label="Apply Now!"
                onClick={() => onClick("displayResponsive")}
                className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
              />
              <Dialog
                className="pt-0"
                visible={displayResponsive}
                onHide={() => onHide("displayResponsive")}
                // breakpoints={{ "960px": "75vw" }}
                style={{ width: "50vw", zIndex: "10000000", height: "100vh" }}
              >
                <div className="flex align-items-center justify-content-center">
                  <div className="text-center mb-3">
                    <img
                      src="/logo1.png"
                      alt="hyper"
                      height={120}
                      className="mb-3"
                    />
                    <div className="text-900 text-3xl font-medium mb-1">
                      Organizer Form
                    </div>

                    <div>
                      <label
                        htmlFor="text"
                        className="block text-900 font-medium mb-1"
                      >
                        Preferred Name
                      </label>
                      <InputText
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        placeholder="Enter Name"
                        className="w-full mb-3"
                      />

                      <label
                        htmlFor="text"
                        className="block text-900 font-medium mb-2"
                      >
                        Why you want to become an Organizer?
                      </label>

                      <InputTextarea
                        rows={5}
                        cols={60}
                        placeholder="Enter here ........."
                        value={description1}
                        onChange={(e) => setdescription1(e.target.value)}
                      />
                      <label
                        htmlFor="text"
                        className="block text-900 font-medium mb-2"
                      >
                        Any Past experience?
                      </label>

                      <InputTextarea
                        rows={5}
                        cols={60}
                        placeholder="Enter here ........."
                        value={description2}
                        onChange={(e) => setdescription2(e.target.value)}
                      />

                      <br />
                      <br />

                      <Button
                        label="Submit"
                        icon="pi pi-user"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
