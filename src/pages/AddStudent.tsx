import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DEPARTMENTS = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Information Technology",
  "Electrical",
  "Chemical",
  "Biotechnology",
];

export default function AddStudent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/students", form);
      setSuccess(true);
      setForm({ name: "", email: "", department: "", phone: "" });
      setTimeout(() => navigate("/"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "#2d3748" }}>Add Student</h1>
        <p className="text-xs uppercase tracking-widest mt-1" style={{ color: "#6b7a8e" }}>Enroll a new student</p>
      </div>

      <div className="neu-flat p-8 max-w-sm">
        {success && (
          <p className="mb-5 text-xs" style={{ color: "#38a169" }}>Student added. Redirecting...</p>
        )}
        {error && (
          <p className="mb-5 text-xs" style={{ color: "#e53e3e" }}>{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#6b7a8e" }}>Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Brahmvir Singh"
              className="neu-input w-full px-4 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#6b7a8e" }}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="student@college.edu"
              className="neu-input w-full px-4 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#6b7a8e" }}>Department</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              className="neu-input w-full px-4 py-2.5 text-sm"
            >
              <option value="">Select department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#6b7a8e" }}>Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="+91 98765 43210"
              className="neu-input w-full px-4 py-2.5 text-sm"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="neu-btn flex-1 px-4 py-2.5 text-sm font-medium"
              style={{ color: "#718096" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="neu-btn-dark flex-1 px-4 py-2.5 text-sm font-medium"
            >
              {loading ? "Adding..." : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
