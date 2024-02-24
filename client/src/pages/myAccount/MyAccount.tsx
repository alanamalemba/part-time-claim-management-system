import { useContext } from "react";
import { UserContext } from "../../App";

export default function MyAccount() {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col gap-2 items-center w-full p-6">
      <h1 className="text-blue-800 font-semibold text-lg">My Account</h1>

      <div className="flex flex-col gap-2 w-full max-w-[500px] border shadow p-2 rounded">
        <div>
          Name: <span className="font-semibold">{user?.name}</span>
        </div>

        <div>
          Email: <span className="font-semibold">{user?.email}</span>
        </div>

        <div>
          Role: <span className="font-semibold">{user?.role}</span>
        </div>

        {user?.role !== "Admin" && (
          <>
            <div>
              Department:{" "}
              <span className="font-semibold">{user?.department}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
