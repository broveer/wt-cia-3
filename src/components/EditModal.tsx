import { useState } from "react";
import axios from "axios";
import type { Student } from "../types/Student";

interface EditModalProps {
  student: Student;
  onClose: () => void;
  onUpdated: (updated: Student) => void;
}

export default function EditModal({ student, onClose, onUpdated }: EditModalProps) {
  const [form, setForm] = useState({
    name: student.name,
    email: student.email,
    department: student.department,
    phone: student.phone,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.put(`/api/students/${student._id}`, form);
      onUpdated(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(163,177,198,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="neu-flat w-full max-w-sm mx-4 p-8">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6b7a8e" }}>Edit Student</h2>
          <button
            onClick={onClose}
            className="neu-btn w-8 h-8 flex items-center justify-center text-lg leading-none"
            style={{ color: "#718096" }}
          >
            &times;
          </button>
        </div>

        {error && (
          <p className="mb-4 text-xs" style={{ color: "#e53e3e" }}>{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Full Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Department", name: "department", type: "text" },
            { label: "Phone", name: "phone", type: "tel" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#6b7a8e" }}>{label}</label>
              <input
                type={type}
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                required
                className="neu-input w-full px-4 py-2.5 text-sm"
              />
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="neu-btn flex-1 px-4 py-2.5 text-sm font-medium"
              style={{ color: "#718096" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="neu-btn-dark flex-1 px-4 py-2.5 text-sm font-medium"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
