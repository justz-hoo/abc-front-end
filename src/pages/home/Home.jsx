import React, {useEffect, useState} from "react";
import axios from "axios";
import './home.scss';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button} from "@material-ui/core";
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import {ThemeProvider} from "@mui/material";
import UpdateDialog from "../../components/updateDialog/UpdateDialog";
import {isCellExitEditModeKeys} from "@mui/x-data-grid/utils/keyboardUtils";
import Navbar from "../../components/navbar/Navbar";



const useStyles = makeStyles({
    table: {
        // minWidth: 100,
    },
});
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


//调色盘
const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        neutral: {
            main: '#ce93d8',
            contrastText: '#fff',
        },
    },
});


const Home = () => {
    const [params, setParams] = useState(null);

    const [test, setTest] = useState(false);

    useEffect(() => {
        loadParams();
    }, []);

    const loadParams = async () => {
        await axios.get("http://localhost:8080/parameter").then(
            result => {setParams(result.data)});
    };

    const [newParamName, setNewParamName] = useState({pname: '', pvalue: ''});

    const onInputChange = (e) => {
        setNewParamName({...newParamName, [e.target.name]: e.target.value})
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/parameter", newParamName);

        //重新获取一次列表并刷新
        await axios.get("http://localhost:8080/parameter").then(
            result => {setParams(result.data)});
    }




    const classes = useStyles();
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];


    return (
        <div className='home'>
            {/*<Navbar/>*/}
            <div className='container'>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="left">Parameter Name</TableCell>
                                <TableCell align="left">Parameter Value</TableCell>
                                <TableCell align='left'>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {params && params.map((param, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left">{param.pname}</TableCell>
                                    <TableCell align="left">{param.pvalue}</TableCell>
                                    <TableCell align='left'>

                                        {/*// TODO:这里用link来做新建一个页面覆盖上去*/}
                                        {/*<Link></Link>*/}
                                        <Button value={param.pid}>View</Button>
                                        <Button value={param.pid}>Edit</Button>
                                        <Button onClick={async () => {
                                            // console.log(params);
                                            await axios.delete(`http://localhost:8080/parameter/${param.pid}`);
                                            //重新获取一次列表并刷新
                                            await axios.get("http://localhost:8080/parameter").then(
                                                result => {setParams(result.data)});
                                        }}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <form className='new-param-form' onSubmit={(e) => {onSubmit(e)}}>
                    <div className='new-param'>
                        <ThemeProvider theme={theme}>
                            <TextField
                                required
                                color="neutral"
                                id="param-name"
                                label="Parameter Name"
                                name="pname"
                                placeholder="New Parameter Name"
                                onChange={(e) => onInputChange(e)}
                            />
                            <TextField
                                required
                                type='number'
                                color="neutral"
                                id="pvalue"
                                label="Parameter Value"
                                name="pvalue"
                                placeholder="New Parameter Value"
                                onChange={(e) => onInputChange(e)}
                            />
                            <Button type='submit'>Add New</Button>
                        </ThemeProvider>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Home;