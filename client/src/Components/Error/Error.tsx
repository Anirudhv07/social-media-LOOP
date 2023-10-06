import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (

        <div style={{ backgroundColor: 'white' }}>
            <div className="flex flex-col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: "#aff0e4" }}>
                <img src="https://media2.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif" alt="error" />
                <Link to={'/'} className="font-medium " >
                <Button color="blue">Back to home</Button>
              </Link>
            </div>

        </div>


    );
}

export default ErrorPage;
