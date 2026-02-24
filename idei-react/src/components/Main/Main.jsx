import { Outlet } from "react-router-dom";
import BtnContacto from "../BtnContacto";

const Main = () => {
    return (
        <main className="w-full relative bg-(--background) text-(--text)">
            <Outlet/>
            <BtnContacto/>
        </main>
    );
};
export default Main;