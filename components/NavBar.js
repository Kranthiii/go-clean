import React, { useRef } from "react";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";
import { Menubar } from "primereact/menubar";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const NavBar = () => {
  const router = useRouter();
  const session = useSession();

  const menu = useRef(null);
  const items = [
    { label: " " },
    {
      label: "Home",
      command: () => {
        router.push("/");
      },
    },
    {
      label: "About",
      command: () => {
        router.push("/about");
      },
    },
  ];
  const menuitems = [
    {
      label: session.status === "authenticated" ? "Logout" : "Login",
      icon:
        session.status === "authenticated"
          ? "pi pi-fw pi-power-off"
          : "pi pi-fw pi-sign-in",
      command: () => {
        if (session.status === "authenticated") {
          signOut();
        } else {
          router.push("/login");
        }
      },
    },
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        router.push("/");
      },
    },
    {
      label: "Profile",
      icon: "pi pi-fw pi-user",
      command: () => {
        router.push("/profile");
      },
    },
  ];
  const start = [
    <>
      <div
        style={{ display: "flex", backgroundColor: "#F8F9FA", height: "78px" }}
      >
        <img alt="logo" src="/logo1.png" height="80" className="mr-2"></img>

        <a
          href="http://localhost:3000/"
          className="no-underline  mb-3 text-justify text-500 cursor-pointer"
          style={{ fontSize: "1.5rem", marginTop: "23px", fontWeight: "600" }}
        >
          Go Clean
        </a>
      </div>
    </>,
  ];
  const end = [
    <>
      <Menu
        model={menuitems}
        popup
        ref={menu}
        id="popup_menu"
        style={{ marginTop: "15px" }}
      />{" "}
      <Avatar
        icon="pi pi-user"
        className="mr-2"
        size="large"
        style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
        shape="circle"
        onClick={(event) => menu.current.toggle(event)}
      />
      ,
    </>,
  ];
  return (
    <div className="card">
      <Menubar
        model={items}
        start={start}
        end={end}
        style={{
          height: "80px",
          position: "fixed",
          width: "100vw",
          zIndex: "1100",
        }}
      />
    </div>
  );
};

export default NavBar;
