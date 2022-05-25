import React from "react";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";

const AddProduct = (props) => {
  return (
    <>
      <Dialog
        visible={props.showDialog}
        style={{ width: "450px" }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={props.confirmDialog}
        onHide={props.closeDialog}
      >
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText
            id="product_name"
            value={props.product.product_name}
            onChange={(e) => props.onInputChange(e, "product_name")}
            required
            autoFocus
            className={classNames({
              "p-invalid": props.submitted && !props.product.product_name,
            })}
          />
          {props.submitted && !props.product.product_name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="price">Price</label>
            <InputNumber
              id="price"
              value={props.product.price}
              onValueChange={(e) => props.onInputNumberChange(e, "price")}
              mode="currency"
              currency="INR"
              locale="hi"
            />
            <Dropdown
              id="price_unit"
              value={props.price_unit}
              options={props.priceUnitArray}
              onChange={(e) => props.onPriceUnitChange(e, "price_unit")}
              optionLabel="unit"
              placeholder="Select unit"
            />
          </div>
          <div className="field col">
            <label htmlFor="quantity">Quantity</label>
            <InputNumber
              id="quantity"
              value={props.product.quantity}
              onValueChange={(e) => props.onInputNumberChange(e, "quantity")}
              integeronly
            />
            <Dropdown
              id="quantity_unit"
              value={props.quantity_unit}
              options={props.quantityUnitArray}
              onChange={(e) => props.onQuantityUnitChange(e, "quantity_unit")}
              optionLabel="unit"
              placeholder="Select unit"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddProduct;
