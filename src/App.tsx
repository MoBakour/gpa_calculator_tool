import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AboutGPA from "./pages/AboutGPA";
import AboutUs from "./pages/AboutUs";
import Layout from "./pages/Layout";

function App() {
    return (
        <div className="bg-slate-800 text-white min-h-screen overflow-x-hidden">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about-gpa" element={<AboutGPA />} />
                        <Route path="/about-us" element={<AboutUs />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
