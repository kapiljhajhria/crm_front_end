import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function SimpleTable(props) {
    const classes = useStyles();
    // function deleteCustomerId(custId){
    //     console.log("deleting stuff id:"+custId);
    //     let tableDataCopy = [].concat(props.tableData)
    //     let indexOfCust=tableDataCopy.findIndex((cust)=>cust.custId===custId);
    //     console.log("found index:"+indexOfCust)
    //     tableDataCopy.splice(indexOfCust,1);
    //     localStorage.setItem('myData', JSON.stringify(tableDataCopy));
    //
    // }
    return (
        <TableContainer component={Paper}>
            {/*{console.log(props)}*/}
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Customer ID</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Gender</TableCell>
                        <TableCell align="right">Contact No</TableCell>
                        <TableCell align="right">Remove?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableData.map((row,idx) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row._id}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.gender}</TableCell>
                            <TableCell align="right">{row.contact}</TableCell>
                            <TableCell align="right">{props.deletingCustList.includes(row._id) ? <div>
                                <CircularProgress color="secondary"/></div> : <Button
                                variant="contained"
                                color="secondary"
                                className={"deleteBtn"}
                                startIcon={<DeleteIcon/>}
                                onClick={() => {
                                    props.deleteCustomerId(row._id,idx)
                                }}
                            />}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}