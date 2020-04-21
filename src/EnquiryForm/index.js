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

    genderList = ["Male", "Female", "Rather Not Say", "Others"];

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
                <button onClick={() => {
                    console.log(this.state);
                }}>Save info
                </button>
            </div>
        );
    }
}

export default EnquiryForm;