import React from "react";
import './styles.css'
import {Button} from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import SimpleTable from "../Table";
import Paper from "@material-ui/core/Paper";

class EnquiryForm extends React.Component {
    state = {
        customerName: '',
        gender: "Male",
        mobNo: "",
        fetchedData: "",
        tableData: [],
    };

    constructor(props) {
        super(props);
    }

    createData = (custId, name, gender, contact,) => {
        return {custId, name, gender, contact,}
    }


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
        let tableDataCopy = [].concat(this.state.tableData);
        tableDataCopy.push(this.createData(jsonMap['customerID'], this.state.customerName, this.state.gender, this.state.mobNo))
        this.setState({tableData: tableDataCopy});
        localStorage.setItem('myData', JSON.stringify(tableDataCopy));
    }

    componentDidMount() {
        let dataList = JSON.parse(localStorage.getItem('myData'));
        this.setState({tableData: dataList})
        console.log(localStorage.getItem('myData'))
        // localStorage.getItem('myData').then((data)=>{
        //     console.log(data);
        //     console.log(" 2data from local storage");
        // })
        console.log("data from local storage");
    }

    render() {
        return (
            <div>
                <Paper className="paper">
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
                </Paper>
                <SimpleTable className="simpleTable" tableData={this.state.tableData}/>
            </div>
        );
    }
}


export default EnquiryForm;