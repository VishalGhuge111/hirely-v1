import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function UserDashboard() {
  const [apps, setApps] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchApps = async () => {
      const res = await api.get("/applications/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApps(res.data);
    };

    fetchApps();
  }, [token]);

  return (
    <div>
      <h1>My Applications</h1>

      {apps.map((app) => (
        <div key={app._id}>
          <h3>{app.jobId.title}</h3>
          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
}

export default UserDashboard;