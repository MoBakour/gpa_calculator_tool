import { Outlet } from "react-router-dom";
import { Blobs } from "../components/Blobs";
import Header from "../components/Header";

const Layout = () => {
    return (
        <div>
            <Blobs />
            <Header />
            <Outlet />
        </div>
    );
};

export default Layout;
