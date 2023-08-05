import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { SelectButton } from "primereact/selectbutton";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import { Calendar } from "primereact/calendar";
import NavBar from "./NavBar";
import { Dialog } from "primereact/dialog";
import dynamic from "next/dynamic";

const DynamicUtilMap = dynamic(() => import("./UtilMap"), {
  ssr: false,
});

const Form = ({ submitCallback }) => {
  const [marker, setMarker] = useState(null);
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
  const [Display, setDisplay] = useState(false);
  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log(position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setlat(position.coords.latitude);
      setlong(position.coords.longitude);
      console.log({ lat }.lat);
    });
  }, []);

  const [loading, setLoading] = useState(false);

  const [Address, setAddress] = useState("");
  const [Description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [date, setdate] = useState(null);
  const fileUploadRef = useRef(null);

  const options = ["Dry Waste", "Wet Waste"];

  async function handleSubmit() {
    setLoading(true);
    let formData = new FormData();
    formData.append("address", Address);
    formData.append("description", Description);
    formData.append("wasteType", value);
    formData.append("sinceDate", date);
    if (!marker) {
      formData.append("geoLocation[lat]", lat);
      formData.append("geoLocation[long]", long);
    } else {
      formData.append("geoLocation[lat]", marker.lat);
      formData.append("geoLocation[long]", marker.lng);
    }
    formData.append("image", fileUploadRef.current.getFiles()[0]);
    let res = await fetch("/api/upload/report", {
      method: "POST",
      body: formData,
    });
    let data = await res.json();
    if (data.ok) {
      submitCallback(data.result);
    }
    setLoading(false);
  }

  // File Upload
  const [totalSize, setTotalSize] = useState(0);
  const toast = useRef(null);
  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div
        className="flex align-items-center flex-column"
        style={{ backgroundColor: "white" }}
      >
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Drag and Drop Image Here
        </span>
      </div>
    );
  };
  const onUpload = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };
  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;

    setTotalSize(_totalSize);
  };
  const onTemplateUpload = (e) => {
    let _totalSize = 0;
    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };
  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        <ProgressBar
          value={value}
          displayValueTemplate={() => `${formatedValue} / 1 MB`}
          style={{ width: "300px", height: "20px", marginLeft: "auto" }}
        ></ProgressBar>
      </div>
    );
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
  // complete --------------->

  <iframe src="https://embed.lottiefiles.com/animation/99272"></iframe>;

  return (
    <div style={{ backgroundColor: "white", width: "100vw" }}>
      <div>
        <NavBar />
      </div>
      <div
        className="flex align-items-center justify-content-center mt-8"
        id="Form"
      >
        <div
          className="surface-card shadow-2 border-round w-full lg:w-12"
          style={{
            paddingLeft: "300px",
            paddingRight: "300px",
            paddingTop: "30px",
            paddingBottom: "30px",
          }}
        >
          <div className="text-center mb-5">
            <img src="/logo1.png" alt="hyper" height={150} className="mb-3" />
            <div className="text-900 text-3xl font-medium mb-3">
              Take action now and fill out this form to help preserve our planet
              for future generations.
            </div>
            <span className="text-600 font-medium line-height-3">
              Don't Know how our website work?
            </span>
            <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
              Click here!
            </a>
          </div>

          <div>
            <p className="block text-900 font-large mb-3">Upload Files</p>
            <FileUpload
              ref={fileUploadRef}
              name="demo[]"
              url="https://primefaces.org/primereact/showcase/upload.php"
              multiple
              accept="image/*"
              maxFileSize={1000000}
              onUpload={onTemplateUpload}
              onSelect={onTemplateSelect}
              onError={onTemplateClear}
              onClear={onTemplateClear}
              headerTemplate={headerTemplate}
              itemTemplate={itemTemplate}
              emptyTemplate={emptyTemplate}
              chooseOptions={chooseOptions}
              uploadOptions={uploadOptions}
              cancelOptions={cancelOptions}
            />
            <br />
            <label
              htmlFor="email"
              className="block text-900 font-large mb-3"
              style={{ textAlign: "center" }}
            >
              Select Type of Waste
            </label>
            <SelectButton
              style={{ display: "flex", justifyContent: "center" }}
              value={value}
              options={options}
              onChange={(e) => setValue(e.value)}
            />
            <br />
            <label htmlFor="text" className="block text-900 font-medium mb-2">
              Address
            </label>
            <InputTextarea
              placeholder="Enter here ........."
              rows={3}
              cols={106}
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                loading={loading}
                onClick={() => {
                  setDisplay(true);
                }}
                label="Select a location"
                className="w-half "
              />
            </div>
            <Dialog
              className="mt-3"
              header="Click to place a pin"
              headerStyle={{ textAlign: "center" }}
              visible={Display}
              style={{ width: "60vw", height: "60vh" }}
              onHide={() => {
                setDisplay(false);
              }}
            >
              <DynamicUtilMap
                lat={lat}
                long={long}
                className="p-4"
                markerlatlng={{ lat: lat, lng: long }}
                onMarkerChange={(latlng) => {
                  setMarker(latlng);
                  setlat(latlng.lat);
                  setlong(latlng.lng);
                }}
              />
            </Dialog>

            <label
              htmlFor="password"
              className="block text-900 font-medium mb-2"
            >
              Description
            </label>
            <InputTextarea
              rows={5}
              placeholder="Enter here ........."
              cols={106}
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <br />

            <label
              htmlFor="email"
              className="block text-900 font-large mb-3"
              style={{ textAlign: "center" }}
            >
              Since when did you found that waste laying there
            </label>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Calendar
                id="icon"
                showTime
                hourFormat="24"
                value={date}
                onChange={(e) => {
                  setdate(e.value);
                  console.log({ calendar: e.value });
                }}
                showIcon
              />
            </div>

            <br />
            <Button
              loading={loading}
              onClick={handleSubmit}
              label="Submit"
              icon="pi pi-send"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
