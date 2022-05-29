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
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleClick = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      axios.get(SEARCHBYCODE + code).then((response) => {
        if (response) {
          const newItem = [...selectedProduct];
          newItem.push(response.data.product);
          setSelectedProduct(newItem);
        }
      });
    }
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

  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);
  const handleQuantity = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const price = selectedProduct.map((item) => {
        return item.price;
      });
      const amount = calculateAmount(quantity, price);
      setAmount(amount);
    }
  };

  const calculateAmount = (quantity, price) => {
    return quantity * price;
  };

  const quantityBodyTemplate = () => {
    return (
      <React.Fragment>
        <span className="p-float-label">
          <Controller
            name="quantity"
            control={control}
            render={({ field, fieldState }) => (
              <InputText
                id={field.quantity}
                {...field}
                autoFocus
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                onKeyPress={handleQuantity}
                style={{ width: "50px" }}
              />
            )}
          />
        </span>
      </React.Fragment>
    );
  };

  const amountBodyTemplate = () => {
    return (
      <React.Fragment>
        <h4 style={{ position: "center" }}>{formatCurrency(amount)}</h4>
      </React.Fragment>
    );
  };

  return (
    <div>
      <Appbar />
      <div>
        <Splitter style={{ position: "absolute", height: "85%", width: "99%" }}>
          <SplitterPanel
            classNamoe="flex align-items-center justify-content-center"
            size={300}
          >
            <div style={{ padding: "5%", height: "15%" }}>
              <div className="card grid p-fluid">
                <form className="p-fluid">
                  <div className="grid p-fluid">
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
                            onKeyPress={handleClick}
                            style={{ width: "70%" }}
                          />
                        )}
                      />
                      <label htmlFor="code">
                        Product Code<span style={{ color: "red" }}>*</span>
                      </label>
                    </span>
                    <span
                      className="p-float-label"
                      style={{ marginLeft: "-30px" }}
                    >
                      <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Code is required." }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyPress={handleClick}
                            style={{ width: "70%" }}
                          />
                        )}
                      />
                      <label htmlFor="name">Customer Name</label>
                    </span>
                    <span
                      className="p-float-label"
                      style={{ marginLeft: "-30px" }}
                    >
                      <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Code is required." }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.contact}
                            {...field}
                            autoFocus
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            onKeyPress={handleClick}
                            style={{ width: "80%" }}
                          />
                        )}
                      />
                      <label htmlFor="name">
                        Customer Contact<span style={{ color: "red" }}>*</span>
                      </label>
                    </span>
                  </div>
                </form>
                <h3 style={{ marginTop: "5px" }}>
                  Total Amount: {formatCurrency(amount)}
                </h3>
              </div>
            </div>

            <div style={{ height: "80%", marginTop: "4%" }}>
              <div className="card">
                <DataTable
                  scrollable
                  scrollHeight="400px"
                  value={selectedProduct && selectedProduct}
                  dataKey="id"
                  responsiveLayout="scroll"
                >
                  <Column
                    field="code"
                    header="Code"
                    style={{ minWidth: "12rem" }}
                  ></Column>
                  <Column
                    field="product_name"
                    header="Name"
                    style={{ minWidth: "12rem" }}
                  ></Column>
                  <Column
                    field="price"
                    header="Price"
                    body={priceBodyTemplate}
                    style={{ minWidth: "8rem" }}
                  ></Column>
                  <Column
                    field="buying_quantity"
                    header="Quantity"
                    body={quantityBodyTemplate}
                    style={{ minWidth: "8rem" }}
                  ></Column>
                  <Column
                    field="buying_amount"
                    header="Amount"
                    body={amountBodyTemplate}
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
