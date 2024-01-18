import toast from "react-hot-toast";
import { Link } from "react-router-dom";

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavBar({ setIsLoggedIn }: Props) {
  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
  }
  return (
    <nav className="bg-blue-900 min-w-[200px] max-w-[250px] text-white min-h-screen">
      <div className=" p-2 text-lg font-semibold bg-blue-950 ">Actions</div>
      <div className="border-y  p-2">
        <Link to={`/`}>Create user account</Link>
      </div>

      <div className="border-y  p-2">
        <Link to={`/add-department`}>Add Department</Link>
      </div>

      <div className="border-y  p-2">
        <Link to={`/add-job`}>Add Job</Link>
      </div>

      <div className="border-y  p-2">
        <Link to={`/submitted-claims`}>Submitted Claims</Link>
      </div>

      <div className="border-y  p-2">
        <Link to={`/reviewed-claims`}>Reviewed Claims</Link>
      </div>

      <div className="border-y  p-2">
        <Link to={`/submit-claim`}>Submit Claim</Link>
      </div>

      <div className="border-y  p-2">
        <Link to={`/my-claims`}>My Claims</Link>
      </div>

      <button
        className="border-y w-full bg-blue-950 p-2"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}
