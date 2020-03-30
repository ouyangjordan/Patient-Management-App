import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Header } from './Header.js'
import PatientsTable from './PatientsTable.js'
import PatientEntryForm from './PatientEntryForm.js'

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Header></Header>
        <div className="row">
          <div className="col-md-4" class="m-5">
            <PatientEntryForm></PatientEntryForm>
          </div>
          <div className="col-md-8">
            <PatientsTable patients={this.patients} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;