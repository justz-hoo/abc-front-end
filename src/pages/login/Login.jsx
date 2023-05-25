import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import {Link} from "react-router-dom";
import './login.scss';
import {Button} from "@material-ui/core";
import TextField from '@mui/material/TextField';
import {useState} from "react";
import cookie from "react-cookies";
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';


const userList = [
    {
        username: "DocPumpkin",
        password: '1',
        identity: "2",
        src: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        username: "财务Piggy",
        password: '1',
        identity: "1",
        src: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
];

const Login = () => {
    const [user, setUser] = useState({username: '', password: '', identity: '1', src:''});
    const setCookie = () => {
        let key = 'userinfo';
        //设置cookie，第三个参数的意思是所有页面都能用这个cookie
        cookie.save(key, user, {path: "/"})
    }

    //判断用户身份是否正确，返回用户序号
    const checkUser = () => {
        let result = -1;
        for (let i = 0; i < userList.length; i++) {
            // 密码正确
            if (userList[i].username === user.username && userList[i].identity === user.identity && userList[i].password === user.password) {
                result = i;
                break;
            }
        }
        return result;
    }

    // 验证身份信息并存储到cookie
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(user);
        // 用户名密码正确

        let idx = checkUser();
        if (idx !== -1) {
            setUser((prev) =>
                prev.src = userList[idx].src
            );
            // console.log(user);
            setCookie();
            console.log('login correct');
            window.location.href = '/';
        } else {
            console.log('login wrong');
            alert('登陆错误');
        }
    };

    //控制密码用户名输入
    const handleInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }


    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                        <Button>Introduction</Button>
                    </Link>
                </div>
                <div className="right">
                    <h1>登陆</h1>
                    <form onSubmit={(e) => {
                        handleSubmit(e)
                    }}>
                        <TextField
                            required
                            id="standard-basic"
                            label="用户名"
                            name='username'
                            // variant="standard"
                            onChange={(e) => {
                                handleInputChange(e)
                            }}
                        />
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">密码</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="密码"
                                onChange={(e) => {
                                    handleInputChange(e)
                                }}
                                name='password'
                            />
                        </FormControl>
                        <div>
                            <FormLabel sx={{fontSize: 14}}>身份</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="1"
                                name="identity"
                                onChange={(e) => handleInputChange(e)}
                            >
                                <FormControlLabel value="1" control={<Radio size='small'/>} label="财务人员"/>
                                <FormControlLabel value="2" control={<Radio size='small'/>} label="医护人员"/>
                            </RadioGroup>
                        </div>
                        <Button className='login-btn' type='submit'>Login</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;