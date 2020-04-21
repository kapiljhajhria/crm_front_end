import React from "react";
import './styles.css'

class EnquiryForm extends React.Component {
    state = {
        customerName: '',
        gender: "Male",
        mobNo: ""
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
                            <select value={this.state.gender} onChange={this.handleInputChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Rather Not Say">Rather Not Say</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="mobNo">Contact Number:</label>
                        <input type="text" name="mobNo" value={this.state.mobNo}
                               onChange={this.handleInputChange}/>
                    </div>

                </form>
                <button onClick={() => {
                    console.log(this.state);
                }}>Save info
                </button>
            </div>
        );
    }
}

export default EnquiryForm;