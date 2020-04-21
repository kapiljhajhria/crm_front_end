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
        this.handelNameChange = this.handelNameChange.bind(this);
        this.handelGenderChange = this.handelGenderChange.bind(this);
        this.handelMobNoChange= this.handelMobNoChange.bind(this);
    }


    handelNameChange(event) {
        this.setState({
            customerName: event.target.value
        });
    }

    handelGenderChange(event) {
        this.setState({
            gender: event.target.value
        });
    }

    handelMobNoChange(event) {
        this.setState({
            mobNo: event.target.value
        });
    }

    render() {
        return (
            <div>
                <form>
                    <div>
                        <label htmlFor="customerName">Your Name:</label>
                        <input type="text" name="customerName" value={this.state.customerName}
                               onChange={this.handelNameChange}/>
                    </div>
                    <div>
                        <label>
                            Your Gender:
                            <select value={this.state.gender} onChange={this.handelGenderChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Rather Not Say">Rather Not Say</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="mobNo">Contact Number:</label>
                        <input type="text" name="mobNo" value={this.state.mobNo}
                               onChange={this.handelMobNoChange}/>
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