import React, { useState, useEffect, useRef } from "react";
import Appbar from "./Appbar";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { SEARCHBYCODE } from "./../services/apiUrls";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  let navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const { control, handleSubmit } = useForm(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const [code, setCode] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    axios.get(SEARCHBYCODE + code).then((response) => {
      if (response) {
        const newItem = [...selectedProduct];
        newItem.push(response.data.product);
        setSelectedProduct(newItem);
      }
    });
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("hi", {
      style: "currency",
      currency: "INR",
    });
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  console.log(selectedProduct);

  return (
    <div>
      <Appbar />
      <div>
        <Splitter style={{ position: "absolute", height: "85%", width: "99%" }}>
          <SplitterPanel
            classNamoe="flex align-items-center justify-content-center"
            size={300}
          >
            <div style={{ padding: "2%", height: "10%" }}>
              <div className="card">
                <form className="p-fluid">
                  <div className="field">
                    <span className="p-float-label">
                      <Controller
                        name="code"
                        control={control}
                        rules={{ required: "Code is required." }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.code}
                            {...field}
                            autoFocus
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            style={{ width: "30%" }}
                          />
                        )}
                      />
                      <label htmlFor="code">Code*</label>

                      <Button
                        type="submit"
                        label="Submit"
                        className="mt-2"
                        onClick={handleClick}
                        style={{ width: "20%", marginLeft: "20px" }}
                      />
                    </span>
                  </div>
                </form>
              </div>
            </div>

            <div style={{ height: "80%", marginTop: "4%" }}>
              <div className="card">
                <DataTable
                  scrollable
                  scrollHeight="400px"
                  value={selectedProduct && selectedProduct}
                  dataKey="id"
                  paginator
                  rows={10}
                  rowsPerPageOptions={[5, 10, 25]}
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                  responsiveLayout="scroll"
                >
                  <Column
                    field="code"
                    header="Code"
                    sortable
                    style={{ minWidth: "12rem" }}
                  ></Column>
                  <Column
                    field="product_name"
                    header="Name"
                    sortable
                    style={{ minWidth: "12rem" }}
                  ></Column>
                  <Column
                    field="price"
                    header="Price"
                    body={priceBodyTemplate}
                    sortable
                    style={{ minWidth: "8rem" }}
                  ></Column>
                </DataTable>
              </div>
            </div>
          </SplitterPanel>
          <SplitterPanel size={180}>
            <Splitter layout="vertical">
              <SplitterPanel
                className="flex align-items-center justify-content-center"
                size={100}
              ></SplitterPanel>
              <SplitterPanel size={85}>
                <Splitter>
                  <SplitterPanel
                    className="flex align-items-center justify-content-center"
                    size={100}
                  >
                    Panel 4
                  </SplitterPanel>
                </Splitter>
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
        </Splitter>
      </div>
    </div>
  );
}
