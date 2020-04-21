import React from "react";
import './styles.css'
import {Button} from '@material-ui/core';

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
        console.log("fetched CustomerID is: " + jsonMap['customerID']);
    }


    render() {
        return (
            <div>
                <form>
                    <div>
                        <label htmlFor="customerName">Your Name:</label>
                        <input type="text" name="customerName" value={this.state.customerName}
                               onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <label>
                            Your Gender:
                            <select value={this.state.gender} name={"gender"} onChange={this.handleInputChange}>
                                {this.genderList.map((el) =>
                                    (<option value={el}>{el}</option>)
                                )}

                            </select>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="mobNo">Contact Number:</label>
                        <input type="text" name="mobNo" value={this.state.mobNo}
                               onChange={this.handleInputChange}/>
                    </div>

                </form>
                {this.state.fetchedData === null ? <div>Fetching Customer ID......</div> :
                    <Button onClick={() => this.getCustomerId()}>Save info
                    </Button>}
            </div>
        );
    }
}

export default EnquiryForm;