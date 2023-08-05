import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import OrgReports from "../../components/Organizer/OrgReports";
import { formatData } from "../../lib/formatUtils";
import { getLocalCoordinates } from "../../lib/locationUtils";

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  async function onResolve(id) {
    let res = await fetch("/api/admin/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        statusObj: { id: id, status: "completed" },
      }),
    });
    let data = await res.json();
    if (data.ok) {
      return true;
    } else return false;
  }

  useEffect(() => {
    getLocalCoordinates()
      .then(({ coords: { latitude, longitude } }) => {
        return fetch("/api/localdata", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            center: { lat: latitude, long: longitude },
          }),
        });
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.ok) {
          setData(formatData(data.result, true));
        }
      });
  }, []);

  const session = useSession();
  if (
    !(session.status === "authenticated" && session.data.user?.role === "admin")
  ) {
    return (
      <div
        style={{
          backgroundColor: "white",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="../Denied.jpg"
          style={{ height: "80Vh", width: "45vw", marginTop: "100px" }}
        />
      </div>
    );
  }
  return (
    <>
      <OrgReports
        data={data?.reports}
        onResolve={async (id) => await onResolve(id)}
      />
    </>
  );
}
