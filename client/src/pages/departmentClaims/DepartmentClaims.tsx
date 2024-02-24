import { useContext, useEffect, useState } from "react";
import { ClaimType } from "../../utilities/Types";
import { serverUrl } from "../../utilities/Constants";
import { UserContext } from "../../App";

export default function DepartmentClaims() {
  const [claims, setClaims] = useState<ClaimType[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchClaims() {
      try {
        const response = await fetch(
          `${serverUrl}/claims/department/${user?.department}`
        );
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
  }, []);

  return <div className="p-4">DepartmentClaims</div>;
}
