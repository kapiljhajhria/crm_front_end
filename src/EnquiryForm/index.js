import React from "react";
import './styles.css'
import {Button} from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

class EnquiryForm extends React.Component {
    state = {
        customerName: '',
        gender: "Male",
        mobNo: "",
        fetchedData: ""
    };

    constructor(props) {
        super(props);
    }

    // // method 1
    // handleInputChange = (event) => {
    //     let updateObject = {};
    //     let key = event.target.name;
    //     updateObject[key] = event.target.value;
    //     this.setState(updateObject);
    // }
    // method 2
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    genderList = ["Male", "Female", "Rather Not Say", "Others"];

    getCustomerId = async () => {
        this.setState({fetchedData: null});
        let postData = new FormData();
        const payload = this.state;
        postData.append("myjsonkey", JSON.stringify(payload));

        let response = await fetch('https://cors-anywhere.herokuapp.com/https://us-central1-form-manager-7234f.cloudfunctions.net/saveCustomer', {
            method: 'POST',
            headers: postData
        })
        let jsonMap = await response.json();
        this.setState({fetchedData: jsonMap['customerID']});
        console.log(this.state);
        console.log("fetched CustomerID is: " + jsonMap['customerID']);
    }


    render() {
        return (
            <div>
                <form>
                    <div>
                        <TextField name="customerName" id="customerName" label="Customer Name" variant="outlined"
                                   onChange={this.handleInputChange}/>
                        {/*<label htmlFor="customerName">Your Name:</label>*/}
                        {/*<input type="text" name="customerName" value={this.state.customerName}*/}
                        {/*       onChange={this.handleInputChange}/>*/}
                    </div>
                    <div>
                        <TextField name="mobNo" id="mobNo" label="Contact No." variant="outlined"
                                   onChange={this.handleInputChange}/>

                    </div>
                    <div>


                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name={"gender"}
                            value={this.state.gender}
                            onChange={this.handleInputChange}
                            color="secondary"
                        >
                            {this.genderList.map((el) =>
                                (<MenuItem value={el}>{el}</MenuItem>)
                            )}
                        </Select>

                    </div>

                </form>
                {this.state.fetchedData === null ? <div>
                        <CircularProgress color="secondary"/></div> :
                    <Button color="primary" variant="contained" onClick={() => this.getCustomerId()}>Save info
                    </Button>}
            </div>
        );
    }
}

export default EnquiryForm;