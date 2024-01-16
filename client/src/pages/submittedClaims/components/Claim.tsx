import { useEffect, useState } from "react";
import { ClaimType, ClaimantType } from "../../../utilities/Types";
import { serverUrl } from "../../../utilities/Constants";

type Props = {
  claim: ClaimType;
};

export default function Claim({ claim }: Props) {
  const date = new Date(claim.date).toDateString();
  const [claimant, setClaimant] = useState<ClaimantType>();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`${serverUrl}/users/${claim.user_id}`);
        const data = await response.json();
        setClaimant(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    fetchUser();
  }, [claim.user_id]);

  return (
    <div className="p-2 border shadow rounded flex flex-col gap-2">
      <div className="flex gap-2 flex-wrap">
        <div>
          Name: <span className="font-medium text-sm">{claimant?.name}</span>
        </div>

        <div>
          Email: <span className="font-medium text-sm">{claimant?.email}</span>
        </div>

        <div>Job: </div>

        <div>
          Hours: <span className="font-medium text-sm">{claim.hours}</span>
        </div>

        <div>
          Date: <span className="font-medium text-sm">{date}</span>
        </div>

        <div>
          Status: <span className="font-medium text-sm">{claim.status}</span>
        </div>
      </div>
      <div className="border p-1 rounded shadow flex gap-2 text-white font-medium">
        <button className="p-1 border  grow rounded bg-red-500 ">Reject</button>
        <button className="p-1 border  grow rounded bg-green-500 ">
          Accept
        </button>
      </div>
    </div>
  );
}
