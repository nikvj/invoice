import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "./css/DataTable.css";
import axios from "axios";
import Appbar from "./Appbar";
import { useNavigate } from "react-router-dom";
import { Dropdown } from 'primereact/dropdown';

export default function Products() {
  let emptyProduct = {
    id: null,
    product_name: "",
      price: 0,
    quantity: 0,
    status: "INSTOCK",
    };
    
    const quantityUnitArray = [
        { unit: 'Kgs', code: 'K' },
        { unit: 'grams', code: 'G' },
        { unit: 'liters', code: 'L' },
        { unit: 'pieces', code: 'P' }];
    
     const priceUnitArray = [
        { unit: '/Kgs', code: 'PK' },
        { unit: '/grams', code: 'PG' },
        { unit: '/liters', code: 'PL' },
        { unit: '/pieces', code: 'PP' }];


  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
    const dt = useRef(null);
    const [quantity_unit, setQuantityUnit] = useState(quantityUnitArray[{}]);
    const [price_unit, setPriceUnit] = useState(priceUnitArray[{}]);


  let navigate = useNavigate();

    useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/')
    }
    setLoading(true);
        getProducts();
    setLoading(false);
  }, []);

  const getProducts = () => {
    axios.get("http://localhost:9000/product/all").then((response) => {
      setProducts(response.data.products);
    });
  };

    const saveProduct = () => {
    setSubmitted(true);
    if (product.product_name.trim()) {
      let _product = { ...product };
      if (product.id) {
        axios.put("http://localhost:9000/product/update/" + product.id, _product).then(
          () => { 
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "Product Updated",
              life: 3000,
            });
            getProducts();
          }
        )
      } else {
        axios.post("http://localhost:9000/product/add", _product).then(() => { 
          toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
          });
          getProducts();
        })
      }
      setProductDialog(false);
      }
  };

  const deleteProduct = () => {
    axios
      .delete("http://localhost:9000/product/delete/" + product.id)
      .then(() => {
        setDeleteProductDialog(false);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Deleted",
          life: 3000,
        });
        getProducts();
      });
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter(val => selectedProducts.includes(val));
    const newArray = _products.map((p) => {
         return p.id;
    })
    const selectedIds = {
    ids: newArray
    }
    
axios
      .post("http://localhost:9000/product/delete/all", selectedIds)
      .then(() => {
         setDeleteProductsDialog(false);
        toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
        getProducts();
      });
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("hi", {
      style: "currency",
      currency: "INR",
    });
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  
  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`product-badge status-${rowData.status}`}>
        {rowData.status}
      </span>
    );
    };
    
    const onPriceUnitChange = (e, name) => {
        setPriceUnit(e.value);
        const val = e.value.unit || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
    }

    const onQuantityUnitChange = (e, name) => {
        setQuantityUnit(e.value);
        const val = e.value.unit || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
    }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-user mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Manage Products</h5>
      <div>
        <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </React.Fragment>
      </div>
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
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
    );
    
  return (
    <div className="datatable-crud-demo">
      <Appbar />
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          scrollable scrollHeight="400px"
          loading={loading}
          ref={dt}
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
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
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
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
          <Column
            field="quantity"
            header="Quantity"
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            header="Actions"
            body={actionBodyTemplate}
            style={{ minWidth: "8rem" }}
          ></Column>
          </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "450px" }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText
            id="product_name"
            value={product.product_name}
            onChange={(e) => onInputChange(e, "product_name")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product.product_name,
            })}
          />
          {submitted && !product.product_name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="price">Price</label>
            <InputNumber
              id="price"
              value={product.price}
              onValueChange={(e) => onInputNumberChange(e, "price")}
              mode="currency"
              currency="INR"
              locale="hi"
                      />
                <Dropdown id="price_unit" value={price_unit} options={priceUnitArray} onChange={(e) => onPriceUnitChange(e, "price_unit")} optionLabel="unit" placeholder="Select unit" />
          </div>
          <div className="field col">
            <label htmlFor="quantity">Quantity</label>
            <InputNumber
              id="quantity"
              value={product.quantity}
              onValueChange={(e) => onInputNumberChange(e, "quantity")}
              integeronly
                      />
                      <Dropdown id="quantity_unit" value={quantity_unit} options={quantityUnitArray} onChange={(e) => onQuantityUnitChange(e, "quantity_unit")} optionLabel="unit" placeholder="Select unit"/>
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.product_name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
