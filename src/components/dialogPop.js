import React from "react";
import { Dialog } from "primereact/dialog";

const DialogComp = (props) => {
  return (
    <>
      <Dialog
        visible={props.showDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={props.confirmDialog}
        onHide={props.closeDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>{props.message}</span>
        </div>
      </Dialog>
    </>
  );
};

export default DialogComp;
