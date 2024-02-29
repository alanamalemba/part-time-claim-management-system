import { useEffect, useState } from "react";
import { UnitType, UserType } from "../../utilities/Types";
import toast from "react-hot-toast";
import { serverUrl } from "../../utilities/Constants";

export default function AssignUnits() {
  const [units, setUnits] = useState<UnitType[]>([]);
  const [lecturers, setLecturers] = useState<UserType[]>([]);

  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedLecturer, setSelectedLecturer] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${serverUrl}/units/not-assigned`);
        const result = await response.json();

        if (result.error) {
          throw new Error(result.error.message);
        }

        const response2 = await fetch(`${serverUrl}/users/lecturers`);

        const result2 = await response2.json();

        if (result2.error) {
          throw new Error(result2.error.message);
        }

        setUnits(result.success.data);

        setLecturers(result2.success.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          toast.error(error.message);
        }
      }
    }

    fetchData();
  }, []);

  async function handleAssignUnit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${serverUrl}/units/assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unit_id: selectedUnit,
          user_id: selectedLecturer,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast.success(result.success.message);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <div className="p-4 w-full flex justify-center items-start">
      <form
        className="border shadow rounded p-2 w-full max-w-[800px] flex flex-col gap-4"
        onSubmit={(e) => handleAssignUnit(e)}
      >
        <h1 className="text-center font-semibold text-lg text-blue-800">
          Assign Unit
        </h1>

        <label>
          <p>Select unit Name</p>
          <select
            className="border shadow rounded p-2 w-full"
            required
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
          >
            <option disabled defaultValue="" value="">
              select a unit
            </option>
            {units?.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.unit_code}: {unit.unit_title}
              </option>
            ))}
          </select>
        </label>

        <label className="">
          <p>Select Lecturer</p>
          <select
            className="border shadow rounded p-2 w-full "
            required
            value={selectedLecturer}
            onChange={(e) => setSelectedLecturer(e.target.value)}
          >
            <option defaultValue="" value="">
              select a Lecturer
            </option>
            {lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id}>
                Name: {lecturer.name}, Email: {lecturer.email}
              </option>
            ))}
          </select>
        </label>

        <div>
          <button className="bg-blue-500 p-2 font-semibold text-white rounded shadow border w-full">
            Assign
          </button>
        </div>
      </form>
    </div>
  );
}
