import Navbar from './components/navbar/Navbar';
import Leftbar from './components/leftbar/Leftbar';
import Login from './pages/login/Login';
import Output from './pages/output/Output';
import Input from './pages/input/Input';
import Params from './pages/params/Params';
import {
    Outlet,
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import Home from "./pages/home/Home";
import Intro from "./pages/intro/Intro";
import TableDemo from "./pages/test/test";
import Rightbar from "./components/rightbar/Rightbar";
import './App.css';
import Visualization from "./pages/visualization/visualization";
import DocInput from "./pages/input/docInput/DocInput";
import NurseInput from "./pages/input/nurseInput/NurseInput";

function App() {
    const Layout = () => {
        return (
            <div>
                {/*<Navbar/>*/}
                <div className='layout'>
                    <Leftbar/>
                    <div className='middle'>
                        <Navbar/>
                        <Outlet/>
                    </div>
                </div>
            </div>
        )

    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    path: '/',
                    element: <Home/>
                },
                {
                    path: '/params',
                    element: <Params/>
                },
                {
                    path: '/output',
                    element: <Output/>
                },
                {
                    path: '/input',
                    element: <Input/>
                },
                {
                    path: '/visualization',
                    element: <Visualization/>
                },
                {
                    path: '/input/doctor',
                    element: <DocInput/>
                },
                {
                    path: '/input/nurse',
                    element: <NurseInput/>
                }
            ]
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/intro',
            element: <Intro/>
        },
        {
            path: '/test',
            element: <TableDemo/>
        },
    ]);

    return (
        <div className="App">
            <RouterProvider router={router}>
            </RouterProvider>
        </div>
    );
}

export default App;
