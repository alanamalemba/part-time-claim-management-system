import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import toast from "react-hot-toast";
import { serverUrl } from "../../utilities/Constants";

export default function SubmitClaim() {
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File>();

  const { user } = useContext(UserContext);

  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    async function fetchUnits() {
      try {
        const response = await fetch(`${serverUrl}/units/claimant/${user?.id}`);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
  }, []);

  async function uploadFile() {
    try {
      const formData = new FormData();
      formData.append("file", file as File);
      const res = await fetch(`${serverUrl}/submit-claim/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const fileUrl = await uploadFile();
      console.log("submitting...");

      const response = await fetch(`${serverUrl}/submit-claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hours,
          date,
          status: "pending",
          department: user?.department,
          user_id: user?.id,
          file_url: fileUrl,
        }),
      });
      console.log("submitted");

      const data = await response.json();
      console.log(data);

      toast.success(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  return (
    <div className="flex w-full p-6 gap-2 justify-evenly">
      <form
        className="flex flex-col gap-2 border shadow h-fit grow p-2  max-w-[800px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-xl text-blue-900 font-semibold text-center">
          Submit Claim
        </h1>

        <label className="">
          <p>Enter number of hours worked</p>
          <input
            min={1}
            max={9}
            className="border rounded w-full p-1 shadow"
            type="number"
            required
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </label>

        <label className="">
          <p>Enter the date you worked</p>
          <input
            className="border rounded w-full p-1 shadow"
            type="date"
            max={currentDate}
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label className="">
          <p>Select supporting document</p>
          <input
            className="border rounded w-full p-1 shadow"
            type="file"
            required
            onChange={(e) => setFile(e.target.files?.[0])}
          />
        </label>

        <button className="border shadow bg-blue-600 rounded p-2 text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
