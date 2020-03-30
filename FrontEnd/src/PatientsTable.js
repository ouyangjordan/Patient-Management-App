import { Component } from "react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';

import DataTable from "react-data-table-component";
import { ExportCSV } from './ExportCSV.js'

class PatientsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientData: [],
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };
        fetch('/api/v1/patients', requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ patientData: result})
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    render() {
        return (
            <div class="m-5">
                <DataTable striped = "true" columns={columns} data={this.state.patientData}/>
                <ExportCSV csvData={this.state.patientData} fileName="Patient Data" />
            </div>
        )
    }

}
const columns = [

    {
        name: 'Name',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'Age',
        selector: 'age',
        sortable: true,
        right: true,
    },
    {
        name: 'Symptoms',
        selector: 'symptoms',
        sortable: true,
        right: true,
    },
    {
        name: 'Room Number',
        selector: 'room_number',
        sortable: true,
        right: true,
    },
    {
        name: 'Comments',
        selector: 'comments',
        sortable: true,
        right: true
    },
    {
        cell: () => <Button raised primary onClick={deleteRow}>Delete</Button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
];

const deleteRow = (element) => {


    let primaryKey = element.target.parentNode.parentNode.firstChild.firstChild.textContent;
    //Super Hacky way to get the tables primary key (the Name field)

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: primaryKey
        })
    };
    fetch('/api/v1/patients/', requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
            },
            (error) => {
                console.log(error)
            }
        )
    window.location.reload(); //Reload the page to show updated state
}

export default PatientsTable;

