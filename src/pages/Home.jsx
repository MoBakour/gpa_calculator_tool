import Header from "../components/Header";
import { Blobs } from "../components/Blobs";
import Calculator from "../components/Calculator";
import GradingSystem from "../components/GradingSystem";

const Home = () => {
    return (
        <div>
            <Header />
            <Blobs />
            <GradingSystem />
            <Calculator />
        </div>
    );
};

export default Home;
