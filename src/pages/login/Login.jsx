import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Link} from "react-router-dom";
import './login.scss';

const Login = () => {
    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>ABC Sys</h1>
                    <p>
                       Welcome to ABC System. Please login if you wanna hava access to the details.
                    </p>
                    <span>Click below to check the introduction of the website.</span>
                    <Link to="/intro">
                        <button>Introduction</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>登陆</h1>
                    <form>
                        <input type="text" placeholder="用户名" />
                        <input type="password" placeholder="密码" />
                        <div>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">身份</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="Administrator"
                                    name="type"
                                >
                                    <FormControlLabel value="1" control={<Radio />} label="财务人员" />
                                    <FormControlLabel value="2" control={<Radio />} label="医护人员" />
                                    {/*<FormControlLabel value="3" control={<Radio />} label="User" />*/}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default Login;