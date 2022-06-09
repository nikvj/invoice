import React from "react";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const InvoiceProduct = (props) => {
  return (
    <>
      <Dialog
        visible={props.showDialog}
        style={{ width: "1000px" }}
        header="Product Details"
        modal
        className="p-fluid"
        onHide={props.closeDialog}
      >
        <DataTable
          scrollable
          scrollHeight="400px"
          value={props.invoiceHistoryProducts}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          responsiveLayout="scroll"
        >
          <Column
            field="invoice_id"
            header="Invoice Id"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column field="customer.name" header="Customer" sortable></Column>
          <Column
            field="total_amount"
            header="Total Amount"
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          {/* <Column
            field="quantity"
            header="Quantity"
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="status"
            header="Status"
            // body={statusBodyTemplate}
            sortable
            style={{ minWidth: "12rem" }}
          ></Column> */}
        </DataTable>
      </Dialog>
    </>
  );
};

export default InvoiceProduct;
