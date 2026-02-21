import { useState } from "react";
import api from "../lib/api";
import type { Student } from "../types/Student";
import EditModal from "./EditModal";

interface StudentTableProps {
  students: Student[];
  onDeleted: (id: string) => void;
  onUpdated: (updated: Student) => void;
}

export default function StudentTable({ students, onDeleted, onUpdated }: StudentTableProps) {
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this student?")) return;
    setDeletingId(id);
    try {
      await api.delete(`/api/students/${id}`);
      onDeleted(id);
    } catch {
      alert("Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  };

  if (students.length === 0) {
    return (
      <p className="text-sm py-12 text-center" style={{ color: "#a3b1c6" }}>
        No students yet. Add one to get started.
      </p>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              {["#", "Name", "Email", "Department", "Phone", ""].map((h) => (
                <th
                  key={h}
                  className="py-2 px-3 text-left text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#6b7a8e" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id}>
                <td className="py-4 px-3 text-xs tabular-nums" style={{ color: "#9aa5b4" }}>{index + 1}</td>
                <td className="py-4 px-3 font-semibold" style={{ color: "#1a202c" }}>{student.name}</td>
                <td className="py-4 px-3" style={{ color: "#4a5568" }}>{student.email}</td>
                <td className="py-4 px-3" style={{ color: "#4a5568" }}>{student.department}</td>
                <td className="py-4 px-3" style={{ color: "#4a5568" }}>{student.phone}</td>
                <td className="py-4 px-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => setEditingStudent(student)}
                      className="neu-btn px-3 py-1.5 text-xs font-medium"
                      style={{ color: "#4a5568" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      disabled={deletingId === student._id}
                      className="neu-btn px-3 py-1.5 text-xs font-medium disabled:opacity-40"
                      style={{ color: "#e53e3e" }}
                    >
                      {deletingId === student._id ? "..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingStudent && (
        <EditModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onUpdated={(updated) => {
            onUpdated(updated);
            setEditingStudent(null);
          }}
        />
      )}
    </>
  );
}
