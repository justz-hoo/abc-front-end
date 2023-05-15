import {Link, useNavigate} from "react-router-dom";
import './navbar.scss';
import {useState} from "react";

const Navbar = () => {
    const [uType, setUType] = useState("3");
    const [usrName, setUsrName] = useState("piggy");
    const [curUsr, setCurUsr] = useState(true);
    const navigate = useNavigate();
    const handleLogBtn = () => {
        console.log(curUsr);
        //用户存在
        //TODO: 删除localhost的数据
        if (curUsr) {
            setUsrName(null);
            setCurUsr(false);
            setUType(null);
        }
        //用户不存在，转到登陆界面
        else {
            navigate('/login');
        }
    }
    function ChooseUserType ({uType}) {
        console.log(uType);
        switch (uType) {
            case "1": return 'Admin';
            case "2": return 'Doctor';
            case "3": return 'User';
            default: return '***';
        }
    }

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>ABC Sys</span>
                </Link>
            </div>
            <div className="right">
                <div className="user">
                    {curUsr && (
                        <span>Hi, {
                            ChooseUserType({uType})
                        } {
                            usrName
                        }</span>
                    )}
                    <button className="cssbuttons-io-button"
                            onClick={handleLogBtn}>
                        {curUsr ? ('Logout'): ('Login')}
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                        </div>
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Navbar;