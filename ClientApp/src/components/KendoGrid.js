
import React, { Component } from 'react';
import {CustomGrid} from './Grid/CustomGrid';
import './Grid/kendoStyle.css';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';

export class KendoGrid extends Component {
  displayName = KendoGrid.name

  render() {
    return (
      <div>
        <h1> Kendo UI React Grid</h1>
            <CustomGrid/>
      </div>
    );
  }
}
