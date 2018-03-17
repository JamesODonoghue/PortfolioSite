
import React from 'react';
import $ from 'jquery';
import _ from 'lodash';

var healthData = require('Assets/health-data.csv');



const TableRow = ({row}) => (
  <tr>
    {row.map((val, index) => 
      <td key={index}>{val}</td>
    )}
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
  render() {

    return (
      <div>
        <div className="health-page">
          <div className="container-fluid">
            <h1 className="display-1">Health</h1>
          </div>
        </div>
        <div className="health-data container">
          <Table headers={this.headers} data={healthData}/>
        </div>
      </div>
    );
  }
}
