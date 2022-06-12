import React, { useState } from "react";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";
import { Toast } from "primereact/toast";
import { Menubar } from "primereact/menubar";
import "primeicons/primeicons.css";
import { useNavigate } from "react-router-dom";

export default function Appbar() {
  let navigate = useNavigate();
  const toast = useState(null);

  const items = [
    {
      label: "Invoice History",
      icon: "pi pi-user-edit",
      command: () => {
        navigate("/invoice-history");
      },
    },
    {
      label: "Sign-out",
      icon: "pi pi-sign-out",
      command: () => {
        handleClick();
      },
    },
    {
      label: "Products",
      icon: "pi pi-box",
      command: () => {
        navigate("/products");
      },
    },
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        navigate("/dashboard");
      },
    },
  ];

  const handleClick = (e) => {
    localStorage.removeItem("token");
    window.location.reload(true);
  };

  const start = <h3 className="heading">General Store</h3>;
  const end = (
    <div
      className="speeddial-tooltip-demo"
      style={{ marginRight: "300px", marginTop: "-30px" }}
    >
      <Tooltip
        target=".speeddial-tooltip-demo .speeddial-right .p-speeddial-action"
        position="bottom"
      />
      <SpeedDial
        model={items}
        direction="left"
        className="speeddial-right"
        showIcon="pi pi-user"
        hideIcon="pi pi-times"
        buttonClassName="p-button-outlined"
      />
    </div>
  );

  return (
    <div>
      <div className="card" style={{ marginTop: "-10px" }}>
        <Toast ref={toast} />
        <Menubar start={start} end={end} />
      </div>
    </div>
  );
}
