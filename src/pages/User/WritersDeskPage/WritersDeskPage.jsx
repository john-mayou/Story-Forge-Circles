import Sidebar from "../../../layout/Sidebar/Sidebar";
import { useSelector } from "react-redux";

function WritersDeskPage() {
    const user = useSelector((store) => store.user);

    return (
        <div>
            <Sidebar />
            <main className="content-main">
                <h1>Writers Desk Page</h1>
                <h2>Welcome, {user.username}!</h2>
                <p>Your ID is: {user.id}</p>
            </main>
        </div>
    );
}

export default WritersDeskPage;
