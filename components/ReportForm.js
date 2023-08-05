import React, { useState } from "react";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";
import NavBar from "./NavBar";

const ReportForm = ({ reportData }) => {
  const mailConfig = {
    baseMail: "csr-ghmc@telangana.gov.in",
    subject: "Public littering complaint",
  };

  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  // const [mailData, setMailData] = useState(null);

  async function handleMailGen() {
    console.log({ reportData });
    setLoading(true);
    let res = await fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify({
        location: reportData.report.address,
        description: reportData.report.description,
        date: reportData.report.sinceDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    console.log({ mailData: data });
    if (data.ok) {
      // setMailData(data.result.mailBody);
      console.log;
      window.open(
        `mailto:${mailConfig.baseMail}?subject=${mailConfig.subject}&body=${data.result.choices[0].text}`,
        "_blank"
      );
    }
    setLoading(false);
  }

  const onClick = (itemIndex) => {
    let _activeIndex = activeIndex ? [...activeIndex] : [];

    if (_activeIndex.length === 0) {
      _activeIndex.push(itemIndex);
    } else {
      const index = _activeIndex.indexOf(itemIndex);
      if (index === -1) {
        _activeIndex.push(itemIndex);
      } else {
        _activeIndex.splice(index, 1);
      }
    }

    setActiveIndex(_activeIndex);
  };

  return (
    <div>
      <div className="surface-0 text-700 text-center  pt-0">
        <div className="text-blue-600 font-bold mb-0">
          <img src="/sucess.gif" style={{ height: "320px" }} />
        </div>
        <div className="text-900 font-bold text-5xl mb-2">
          Thanks for filling the Form
        </div>
        <div className="text-700 text-2xl mb-3">Need Immediate action?</div>
        <Button
          onClick={handleMailGen}
          loading={loading}
          label="Mail"
          icon="pi pi-send"
          className="font-bold px-5 mb-3 py-3 p-button-raised p-button-rounded white-space-nowrap"
        />
        <br />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Accordion activeIndex={0} style={{ width: "60vw" }}>
            <AccordionTab
              header={
                <React.Fragment>
                  {/* <i className="pi pi-info"></i> */}
                  <span>Know More</span>
                </React.Fragment>
              }
            >
              <p>
                By clicking the button above, you will be asked to open your
                mail application with an automatically generated email with all
                the details mentioned in the form you just filled.
              </p>
            </AccordionTab>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
