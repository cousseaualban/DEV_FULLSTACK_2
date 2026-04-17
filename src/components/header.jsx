import { Link, Outlet } from "react-router-dom";

function header() {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <div className="flex-shrink-0 bg-purple-600 p-2 flex gap-x-2">
                <Link className="bg-purple-600 hover:bg-purple-700 border border-purple-500 text-white py-2 px-4 rounded" to="/">Bibliotèque markdown</Link>
                <Link className="bg-purple-600 hover:bg-purple-700 border border-purple-500 text-white py-2 px-4 rounded" to="/blocs">Bibliotèque des blocs</Link>
                <Link className="bg-purple-600 hover:bg-purple-700 border border-purple-500 text-white py-2 px-4 rounded" to="/images">Bibliothèque d'images</Link>
            </div>
            <div className="flex-1 overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
}
export default header;