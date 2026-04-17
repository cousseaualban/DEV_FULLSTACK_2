import { Link, Outlet } from "react-router-dom";

function header() {
    return (
        <>
            <div className="bg-purple-600 p-2 flex gap-x-2">
                <Link className="bg-purple-600 hover:bg-purple-700 border border-purple-500 text-white py-2 px-4 rounded" to="/">Bibliotèque des blocs</Link>
                <Link className="bg-purple-600 hover:bg-purple-700 border border-purple-500 text-white py-2 px-4 rounded" to="/images">Bibliothèque d'images</Link>
            </div>
            <Outlet />
        </>
    );
}
export default header;