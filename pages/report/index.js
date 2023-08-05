import { useState } from "react";
import ReportForm from "../../components/ReportForm";
import Form from "../../components/Form";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useRouter } from "next/router";

export default function Report() {
  const router = useRouter();
  let [success, setSuccess] = useState(false);
  let [reportData, setReportData] = useState(null);
  // const [Display, setDisplay] = useState(true);

  return (
    <>
      <Form
        submitCallback={(data) => {
          setSuccess(true);
          setReportData(data);
        }}
      />
      {/* <Button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => {
          setDisplay(true);
        }}
      /> */}
      <Dialog
        className="mt-3"
        visible={success ? true : false}
        style={{ width: "60vw", height: "90vh" }}
        onHide={() => {
          // setDisplay(false);
          router.push("/");
          setSuccess(false);
        }}
      >
        <ReportForm reportData={reportData} />
      </Dialog>

      {success ? <ReportForm reportData={reportData} /> : ""}
    </>
  );
}
