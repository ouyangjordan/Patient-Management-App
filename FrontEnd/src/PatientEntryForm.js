import { Component } from "react";
import React from "react";

class PatientEntryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patientName: "",
            age: "",
            symptoms: "",
            comments: "",
            roomNumber: "",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addPatientRequest = this.addPatientRequest.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    addPatientRequest(event) {
        //Null check for every form field
        if (this.state.patientName == "" || this.state.age == "" ||
            this.state.symptoms == "" || this.state.comments == "" || this.state.roomNumber == "") {
            alert("No field can be empty");
            event.preventDefault();
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.patientName, age: this.state.age,
                symptoms: this.state.symptoms, comments: this.state.comments,
                room_number: this.state.roomNumber
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
    }
    render() {
        return (
            <div className="row">
                <div>
                    <form>
                        <div class="form-group">
                            <label for="patientName">Patient Name: </label>
                            <input
                                name="patientName"
                                class="form-control"
                                id="patientName"
                                type="string"
                                placeholder="Enter patient name"
                                value={this.state.patientName}
                                onChange={this.handleInputChange} />
                        </div>
                        <div class="form-group">
                            <label for="patientAge">Patient Age: </label>
                            <input
                                name="age"
                                class="form-control"
                                id="patientName"
                                type="number"
                                placeholder="Enter patient age"
                                value={this.state.age}
                                onChange={this.handleInputChange} />
                        </div>
                        <div class="form-group">
                            <label for="patientSymptoms">Patient Symptoms: </label>
                            <input
                                name="symptoms"
                                class="form-control"
                                id="patientSymptoms"
                                type="string"
                                placeholder="Enter patient symptoms"
                                value={this.state.symptoms}
                                onChange={this.handleInputChange} />
                        </div>
                        <div class="form-group">
                            <label for="patientComments">Comments: </label>
                            <input
                                name="comments"
                                class="form-control"
                                id="patientComments"
                                type="string"
                                placeholder="Comments about patient"
                                value={this.state.comments}
                                onChange={this.handleInputChange} />
                        </div>
                        <div class="form-group">
                            <label for="patientRoomNumber">Room Number: </label>
                            <input
                                name="roomNumber"
                                class="form-control"
                                id="patientRoomNumber"
                                type="number"
                                placeholder="Enter patient room number"
                                value={this.state.roomNumber}
                                onChange={this.handleInputChange} />
                        </div>
                        <button class="btn btn-primary" onClick={this.addPatientRequest}>
                            Add Patient
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default PatientEntryForm;

