import React, { Component } from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { GridDialog } from './GridDialog';
import { Products } from './products.js';
import { GridCellWithEditing } from './GridCellWithEditing';

export class CustomGrid extends Component {
    displayName = CustomGrid.name

 constructor(props) {
        super(props);

        this.state = {
            products: Products.slice(0, 7),
            productInEdit: undefined
        };

        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
        this.cancel = this.cancel.bind(this);
        this.insert = this.insert.bind(this);
        this.onDialogInputChange = this.onDialogInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    edit(dataItem) {
        this.setState({ productInEdit: this.cloneProduct(dataItem) });
    }

    remove(dataItem) {
        const products = this.state.products.slice();
        const index = products.findIndex(p => p.ProductID === dataItem.ProductID);
        if (index !== -1) {
            products.splice(index, 1);
            this.setState({
                products: products
            });
        }
    }

    save() {
        const dataItem = this.state.productInEdit;
        const products = this.state.products.slice();

        if (dataItem.ProductID === undefined) {
            products.unshift(this.newProduct(dataItem));
        } else {
            const index = products.findIndex(p => p.ProductID === dataItem.ProductID);
            products.splice(index, 1, dataItem);
        }

        this.setState({
            products: products,
            productInEdit: undefined
        });
    }

    cancel() {
        this.setState({ productInEdit: undefined });
    }

    insert() {
        this.setState({ productInEdit: { } });
    }

    onDialogInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.props ? target.props.name : target.name;

        const edited = this.cloneProduct(this.state.productInEdit);
        edited[name] = value;

        this.setState({
            productInEdit: edited
        });
    }

    render() {
        return (
            <div >
                <Grid
                    data={this.state.products}
                    style={{ height: '420px' }}
                >
                    <GridToolbar>
                        <button
                            onClick={this.insert}
                            className="k-button"
                        >
                            Add New
                        </button>
                    </GridToolbar>
                    <Column field="ProductID" title="Id" width="50px" />
                    <Column field="ProductName" title="Product Name" />
                    <Column field="UnitsInStock" title="Units In Stock" />
                    <Column field="Discontinued" />
                    <Column
                        title="Edit"
                        cell={GridCellWithEditing(this.edit, this.remove)}
                    />
                </Grid>
                {this.state.productInEdit &&
                <GridDialog
                    title={this.dialogTitle()}
                    close={this.cancel}
                    ok={this.save}
                    cancel={this.cancel}
                >
                    <form onSubmit={this.handleSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>
                                Product Name<br />
                                <Input
                                    type="text"
                                    name="ProductName"
                                    value={this.state.productInEdit.ProductName || ''}
                                    onChange={this.onDialogInputChange}
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>
                                Units In Stock<br />
                                <NumericTextBox
                                    name="UnitsInStock"
                                    value={this.state.productInEdit.UnitsInStock || 0}
                                    onChange={this.onDialogInputChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Discontinued"
                                    checked={this.state.productInEdit.Discontinued || false}
                                    onChange={this.onDialogInputChange}
                                />
                                Discontinued product
                            </label>
                        </div>
                    </form>
                </GridDialog>}
            </div>
        );
    }

    dialogTitle() {
        return `${this.state.productInEdit.ProductID === undefined ? 'Add' : 'Edit'} product`;
    }
    cloneProduct(product) {
        return Object.assign({}, product);
    }

    newProduct(source) {
        const newProduct = {
            ProductID: this.generateId(),
            ProductName: '',
            UnitsInStock: 0,
            Discontinued: false
        };

        return Object.assign(newProduct, source);
    }

    generateId() {
        let id = 1;
        this.state.products.forEach(p => { id = Math.max((p.ProductID || 0) + 1, id); });
        return id;
    }
}