import React from "react";
import NavBar from "../NavBar";
import { Button } from "primereact/button";

const OrgMain = () => {
  return (
    <div style={{ height: "100vh", backgroundColor: "white" }}>
      <div>
        <NavBar />
      </div>
      <div className="grid grid-nogutter surface-0 text-800 mt-5">
        <div className="col-12 md:col-6 overflow-hidden">
          <img
            src="/Recycle.jpg"
            alt="hero-1"
            className="md:ml-auto block md:h-full"
            style={{
              height: "50vh",
              width: "50vw",
              clipPath: "polygon(8% 0, 100% 0%, 100% 100%, 0 100%)",
            }}
          />
        </div>
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
          <section>
            <span className="block text-6xl font-bold mb-1">
              Empowering communities to take action on waste management
            </span>
            <div className="text-6xl text-primary font-bold mb-3">
              one volunteer at a time
            </div>

            <Button
              label="Learn More"
              type="button"
              className="mr-3 p-button-raised"
            />
          </section>
        </div>
      </div>
      <div className="surface-0 text-700 text-center pt-2">
        <img src="/logo1.png" alt="hyper" height={150} className="mb-3" />
        <div className="text-900 font-bold text-5xl mb-3">
          Role of an Organizer
        </div>
        <div className="text-800 text-1.5xl  pl-7 pr-7 p-2 pb-8">
          The Organizer role involves gathering local volunteers in the
          designated area to work on events and projects related to waste
          management. This includes coordinating efforts to clean up the
          community and promoting sustainable practices. The organizer will act
          as a leader, bringing together volunteers to make a positive impact on
          their local environment. By volunteering as an organizer, individuals
          can play a crucial role in promoting waste reduction and environmental
          preservation in their community
        </div>
      </div>
      <div className="grid grid-nogutter surface-0 text-800">
        <div
          className="col-5 md:col-6 overflow-hidden"
          style={{ height: "500px" }}
        >
          <img
            src="/Volunteer.webp"
            alt="hero-1"
            className="md:ml-auto block md:h-full"
            style={{ height: "100px", width: "100%" }}
          />
        </div>
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
          <div className="surface-0 text-700 text-center">
            <div className="text-900 font-bold text-5xl mb-3">
              Join Our Volunteer Program
            </div>
            <div className="text-700 text-2xl mb-5">
              Be the change you wish to see in the world - Join our waste
              management team as a volunteer today!
            </div>
            {/* Volunteer Form */}
            <Button
              label="Find Volunteers"
              onClick={() => {}}
              className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgMain;
