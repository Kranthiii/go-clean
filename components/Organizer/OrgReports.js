import React, { useState, useEffect, useRef } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Rating } from "primereact/rating";
import NavBar from "../NavBar";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import OrgReportStats from "./OrgReportStat";
import { parseCoords } from "../../lib/locationUtils";
import { Checkbox } from "primereact/checkbox";
import DataStats from "../Datastats";

const OrgReports = ({ data: products, onResolve }) => {
  const [data, setData] = useState(products || []);

  useEffect(() => {
    setData(products || []);
  }, [products]);
  const [checked, setChecked] = useState(false);
  const [layout, setLayout] = useState("grid");
  const [Display, setDisplay] = useState(false);
  const [Displaystats, setDisplaystats] = useState(false);

  async function resolveWorkflow(id, node) {
    let success = await onResolve(id);
    console.log({ id, success });
    if (success) {
      console.log(node);
      node.disabled = true;
      node.childNodes[1].textContent = "Resolved";
    }
  }

  var data1 = {
    name: "12-03-22",
    description: "hello",
    inventoryStatus: "drywaste",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4PztzmryAyxHpLFJrEJjb1Cuv8MC4uSThmhRRN_k2dQ&s",
  };

  const renderListItem = (data) => {
    return (
      <div className="col-12">
        <div className="product-list-item">
          <img
            src={data.imageURL}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={data.name}
          />
          <div className="product-list-detail">
            <span className="block text-1.2xl  mb-2 ml-5 mr-5">
              <strong>Date :</strong> {data.sinceDate}
            </span>
            <span className="block text-1.2xl  mb-3 ml-5 mr-5">
              <strong>Address :</strong> {data.address}
            </span>
            <span className="block text-1.2xl  mb-3 ml-5 mr-5">
              <strong>Description :</strong> {data.description}
            </span>
          </div>
          <div
            className="product-list-action"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              disabled={data.status === "completed"}
              icon="pi pi-check"
              label={
                data.status === "completed" ? "Mark as Resolved" : "Resolved"
              }
              onClick={(e) => {
                resolveWorkflow(data._id, e.currentTarget);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderGridItem = (data) => {
    return (
      <div className="col-12 md:col-4">
        <div className="product-grid-item card ">
          <div className="product-grid-item-top">
            <span
              className={`product-badge status-${data.wasteType.toLowerCase()} font-bold `}
            >
              {parseCoords(data.geoLocation.lat, "lat")},{" "}
              {parseCoords(data.geoLocation.long, "long")}
            </span>
          </div>
          <div className="product-grid-item-content h-23rem">
            <img
              src={data.imageURL}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.name}
            />
            <span className="block text-1.2xl  mb-3 ml-5 mr-5">
              <strong>Address :</strong> {data.address}
            </span>
            <div className="product-description" style={{ height: "50px" }}>
              {data.description}
            </div>

            {/* <Rating value={data.rating} readOnly cancel={false}></Rating> */}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => {
                setDisplaystats(true);
              }}
              label="View Statics of this litter"
              className="p-button-text mt-3 mb-2 "
            />
          </div>
          <Dialog
            className="mt-3"
            visible={Displaystats}
            style={{ width: "60vw", height: "80vh" }}
            onHide={() => {
              setDisplaystats(false);
            }}
          >
            <DataStats />
          </Dialog>
          <div
            className="product-grid-item-bottom"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {/* <span className="product-price">${data.price}</span> */}
            <Button
              disabled={data.status === "completed"}
              icon="pi pi-check"
              label={
                data.status === "completed" ? "Mark as Resolved" : "Resolved"
              }
              onClick={(e) => {
                resolveWorkflow(data._id, e.currentTarget);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === "list") return renderListItem(product);
    else if (layout === "grid") return renderGridItem(product);
  };

  const renderHeader = () => {
    return (
      <div className="grid grid-nogutter gap-2">
        <div className="col-5">
          <DataViewLayoutOptions
            layout={layout}
            onChange={(e) => setLayout(e.value)}
          />
        </div>
        <div className="field-checkbox">
          <Checkbox
            checked={checked}
            onChange={(e) => {
              console.log({ data });
              if (e.checked) {
                setData(
                  products.filter((product) => {
                    return product.status === "pending";
                  })
                );
              } else {
                setData(products);
              }
              setChecked(e.checked);
            }}
          />
          <label htmlFor="binary">Show Pending Reports</label>
        </div>
      </div>
    );
  };

  const header = renderHeader();
  return (
    <>
      <div className="main">
        <NavBar />
      </div>
      <div className="dataview-demo mt-8" style={{ backgroundColor: "white" }}>
        <div className="text-800 font-bold text-4xl mb-3 text-center">
          Reports in Your Locality
        </div>
        <div className="card  p-5">
          <DataView
            value={data}
            layout={layout}
            header={header}
            itemTemplate={itemTemplate}
            paginator
            rows={8}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              setDisplay(true);
            }}
            label="View Statics"
            className="w-half mt-5 "
          />
        </div>
        <Dialog
          className="mt-3"
          visible={Display}
          style={{ width: "60vw", height: "80vh" }}
          onHide={() => {
            setDisplay(false);
          }}
        >
          <OrgReportStats reportData={products} />
        </Dialog>
      </div>
      <br />
      <br />
    </>
  );
};
export default OrgReports;
