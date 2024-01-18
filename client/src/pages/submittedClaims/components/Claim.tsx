import { useEffect, useState } from "react";
import { ClaimType, ClaimantType } from "../../../utilities/Types";
import { serverUrl } from "../../../utilities/Constants";

type Props = {
  claim: ClaimType;
};

export default function Claim({ claim }: Props) {
  const date = new Date(claim.date).toDateString();
  const [claimant, setClaimant] = useState<ClaimantType>();

  const [status, setStatus] = useState(claim.status);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user details
        const response = await fetch(`${serverUrl}/users/${claim.user_id}`);
        const data = await response.json();
        setClaimant(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    fetchData();
  }, [claim.user_id, claim.file_url]);

  async function handleStatusUpdate(status: boolean) {
    let newStatus;
    try {
      if (status) {
        newStatus = "accepted";
      } else {
        newStatus = "rejected";
      }

      const res = await fetch(`${serverUrl}/claims/${claim.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await res.json();
      console.log(data);
      setStatus(newStatus);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

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
          Status: <span className="font-medium text-sm">{status}</span>
        </div>
      </div>

      <div className="bg-slate-500 rounded text-white text-center p-1 text-xs">
        <a
          href={`${serverUrl}/uploads/${claim.file_url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download support document
        </a>
      </div>

      <div className="border p-1 rounded shadow flex gap-2 text-white font-medium">
        <button
          className="p-1 border  grow rounded bg-red-500 "
          onClick={() => handleStatusUpdate(false)}
        >
          Reject
        </button>
        <button
          className="p-1 border  grow rounded bg-green-500 "
          onClick={() => handleStatusUpdate(true)}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
