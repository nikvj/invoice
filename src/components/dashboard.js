
import React, {useState, useEffect, useRef} from "react";
import Appbar from "./Appbar";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function Dashboard() {

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const op = useRef(null);
  const toast = useRef(null);
  const isMounted = useRef(false);
  
  useEffect(() => {
        if (isMounted.current && selectedProduct) {
            op.current.hide();
            toast.current.show({severity:'info', summary: 'Product Selected', detail: selectedProduct.name, life: 3000});
        }
    }, [selectedProduct]);

  useEffect(() => {
        isMounted.current = true;
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get("http://localhost:9000/product/all").then((response) => {
      setProducts(response.data.products);
    });
  };

  const onProductSelect = (e) => {
    setSelectedProduct(e.value);
  }

  const formatCurrency = (value) => {
        return value.toLocaleString('hi', {style: 'currency', currency: 'INR'});
    }
  
   const priceBody = (rowData) => {
        return formatCurrency(rowData.price);
  }
  
   const quantityBody = (rowData) => {
        return rowData.quantity;
  }
  
  return (
    <div>
      <Appbar />
      <div>
        <Toast ref={toast} />
                <Splitter style={{position: 'absolute', height: '85%', width: '99%'}}>
          <SplitterPanel classNamoe="flex align-items-center justify-content-center" size={300}>
            <div style={{padding: '2%'}}>
            <div className="card">
                <Button type="button" icon="pi pi-search" label={selectedProduct ? selectedProduct.product_name : 'Select a Product'} onClick={(e) => op.current.toggle(e)} aria-haspopup aria-controls="overlay_panel" className="select-product-button" />

                <OverlayPanel ref={op} showCloseIcon id="overlay_panel" style={{width: '450px'}} className="overlaypanel-demo">
                    <DataTable value={products} selectionMode="single" paginator rows={5}
                        selection={selectedProduct} onSelectionChange={onProductSelect}>
                        <Column field="product_name" header="Name" sortable />
                    <Column field="price" header="Price" sortable body={priceBody} />
                    <Column field="quantity" header="Quantity" sortable body={quantityBody} />
                    </DataTable>
                </OverlayPanel>
            </div>
            </div>
            
                       <div style={{ height: '80%', marginTop: '4%'}}>
            <div className="card">
                <DataTable responsiveLayout="scroll"
                >
                    <Column field="code" header="Code"></Column>
                    <Column field="product_name" header="Name"></Column>
                    <Column field="price" header="Price"></Column>
                </DataTable>
            </div>
        </div>
                    </SplitterPanel>
                    <SplitterPanel size={180}>
                        <Splitter layout="vertical">
                            <SplitterPanel className="flex align-items-center justify-content-center" size={100}>
                                
                            </SplitterPanel>
                            <SplitterPanel size={85}>
                                <Splitter>
                                    <SplitterPanel className="flex align-items-center justify-content-center" size={100}>
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
