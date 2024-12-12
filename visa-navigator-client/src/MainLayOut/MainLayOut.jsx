import { Outlet } from "react-router-dom";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";


const MainLayOut = () => {
    return (
        <div>
            <section>
                <Navbar></Navbar>
            </section>
            <div className="min-h-[calc(100vh-208px)] container mx-auto">
                <Outlet></Outlet>
            </div>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayOut;