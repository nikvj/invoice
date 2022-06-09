import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./css/DataTable.css";
import axios from "axios";
import Appbar from "./Appbar";
import { useNavigate } from "react-router-dom";
import { GETINVOICEHISTORY } from "./../services/apiUrls";
import InvoiceProduct from "./invoiceProduct";

export default function InvoiceHistory() {
  let emptyProduct = {
    id: null,
    invoice_id: 0,
    total_amount: 0,
    customer: {
      id: null,
      name: "",
      contact: 0,
    },
    products: [
      {
        id: null,
        invoice_id: 0,
        product_quantity: null,
        product_amount: null,
        product: {
          code: "",
          product_name: "",
          status: "",
          quantity: 0,
          quantity_unit: "",
          price: 0,
          price_unit: "",
          id: null,
        },
      },
    ],
  };
  const [invoiceHistory, setInvoiceHistory] = useState();
  const [invoiceHistoryProducts, setInvoiceHistoryProducts] =
    useState(emptyProduct);
  const [invoiceDialog, setInvoiceDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    setLoading(true);
    getInvoiceHistory();
    setLoading(false);
  }, []);

  const getInvoiceHistory = () => {
    axios.get(GETINVOICEHISTORY).then((response) => {
      setInvoiceHistory(response.data);
    });
  };

  const hideDialog = () => {
    setInvoiceDialog(false);
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("hi", {
      style: "currency",
      currency: "INR",
    });
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.total_amount);
  };

  const invoiceProduct = (invoiceHistoryProducts) => {
    setInvoiceHistoryProducts({ ...invoiceHistoryProducts });
    setInvoiceDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-user mr-2"
          onClick={() => invoiceProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Invoice History</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  return (
    <div className="datatable-crud-demo">
      <Appbar />
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          scrollable
          scrollHeight="400px"
          loading={loading}
          ref={dt}
          value={invoiceHistory}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
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
            body={priceBodyTemplate}
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
          <Column
            header="Actions"
            body={actionBodyTemplate}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>

        <InvoiceProduct
          showDialog={invoiceDialog}
          closeDialog={hideDialog}
          invoiceHistoryProducts={invoiceHistoryProducts}
        />
      </div>
    </div>
  );
}
