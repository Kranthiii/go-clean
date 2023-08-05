import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import OrgMain from "../../components/Organizer/OrgMain";

export default function AdminIndex() {
  const session = useSession();
  if (
    !(session.status === "authenticated" && session.data.user?.role === "admin")
  ) {
    return (
      <div style={{ backgroundColor: "white" }}>
        <img
          src="/De.webp"
          style={{ height: "80Vh", marginLeft: "250px", marginTop: "60px" }}
        />
      </div>
    );
  }
  return <OrgMain />;
}
