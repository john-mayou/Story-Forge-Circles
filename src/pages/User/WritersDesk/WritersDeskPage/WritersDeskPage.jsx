import { useSelector } from "react-redux";

function WritersDeskPage() {
    const user = useSelector((store) => store.user);

    return (
        <main className="content-main">
            <h1>Writers Desk Page</h1>
            <h2>Welcome, {user.username}!</h2>
            <p>Your ID is: {user.id}</p>
        </main>
    );
}

export default WritersDeskPage;
