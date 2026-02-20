import { useEffect, useState } from "react";
import axios from "axios";
import type { Student } from "../types/Student";
import StudentTable from "../components/StudentTable";

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/students")
      .then((res) => setStudents(res.data))
      .catch(() => setError("Failed to load students. Is the server running?"))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleted = (id: string) => {
    setStudents((prev) => prev.filter((s) => s._id !== id));
  };

  const handleUpdated = (updated: Student) => {
    setStudents((prev) => prev.map((s) => (s._id === updated._id ? updated : s)));
  };

  const departments = [...new Set(students.map((s) => s.department))];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      {/* Stat cards */}
      <div className="flex gap-6">
        <div className="neu-flat px-8 py-6 flex-1 text-center">
          <p className="text-4xl font-bold" style={{ color: "#1a202c" }}>{students.length}</p>
          <p className="text-xs uppercase tracking-widest mt-2" style={{ color: "#6b7a8e" }}>Total Students</p>
        </div>
        <div className="neu-flat px-8 py-6 flex-1 text-center">
          <p className="text-4xl font-bold" style={{ color: "#1a202c" }}>{departments.length}</p>
          <p className="text-xs uppercase tracking-widest mt-2" style={{ color: "#6b7a8e" }}>Departments</p>
        </div>
      </div>

      {/* Table card */}
      <div className="neu-flat p-8">
        <h2 className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: "#6b7a8e" }}>
          Student Records
        </h2>

        {loading && (
          <p className="text-sm py-8 text-center" style={{ color: "#a3b1c6" }}>Loading...</p>
        )}
        {error && (
          <p className="text-sm py-4" style={{ color: "#e53e3e" }}>{error}</p>
        )}
        {!loading && !error && (
          <StudentTable
            students={students}
            onDeleted={handleDeleted}
            onUpdated={handleUpdated}
          />
        )}
      </div>
    </div>
  );
}
