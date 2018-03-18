
import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import utils from 'Helpers/utils';

var healthData = require('Assets/health-data.csv');



const TableRow = ({row}) => (

  <tr>
      <td>{row.Start}</td>
      <td>{row['Active Calories (kcal)']}</td>
      <td>{row['Cycling Distance (mi)']}</td>
      <td>{row.Steps}</td>
      
  </tr>
)


const Table = ({data}) => (
  <table className="table table-striped table-hover">
    <tbody>
      {data.map((row, index) => 
        <TableRow key={index} row={row}/>
      )}
    </tbody>

  </table>
)

export default class Health extends React.Component {

  constructor(){
    super();

  }

  mapData() {
    healthData = utils.mapCSVData(healthData);

  }
  render() {

    this.mapData();

    return (
      <div>
        <div className="health-page">
          <div className="container-fluid">
            <h1 className="display-1">Health</h1>
          </div>
        </div>
        <div className="health-data container">
          <Table data={healthData}/>
        </div>
      </div>
    );
  }
}
