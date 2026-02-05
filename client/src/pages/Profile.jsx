import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Profile() {
  const { user, logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await api.put("/auth/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Profile updated successfully!");
      setEditMode(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Messages */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes("successfully")
              ? "bg-emerald-50 border border-emerald-200"
              : "bg-red-50 border border-red-200"
          }`}>
            <p className={message.includes("successfully") ? "text-emerald-700" : "text-red-700"}>
              {message}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-4">
                <svg className="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600 mt-1">{user.email}</p>
              <div className="mt-4 inline-block">
                <span className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-semibold text-sm capitalize">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Profile Information</h3>
              <button
                onClick={() => {
                  if (editMode) {
                    setFormData({ name: user.name, email: user.email });
                  }
                  setEditMode(!editMode);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  editMode
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>

            {editMode ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="text-lg font-medium text-gray-900">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <p className="text-lg font-medium text-gray-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Account Type</p>
                  <p className="text-lg font-medium text-gray-900 capitalize">{user.role}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-8 border border-red-100">
          <h3 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h3>
          <p className="text-gray-600 mb-6">Log out of your account or take other actions.</p>
          <button
            onClick={handleLogout}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-medium px-6 py-3 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
