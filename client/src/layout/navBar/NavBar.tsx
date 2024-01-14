import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-blue-900 w-1/5 text-white min-h-screen">
      <div className=" p-2 text-lg font-semibold bg-blue-950 ">Actions</div>
      <div className="border-y  p-2">
        <Link to={`/create-account`}>Create user account</Link>
      </div>
    </nav>
  );
}
