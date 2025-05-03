import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function ProfilePage() {
  const [averageMarks, setAverageMarks] = useState({});
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found");
          return;
        }

        const decoded = jwtDecode(token);
        const { email, username } = decoded;
        setUsername(username);

        const response = await axios.post("https://smartedbackend.onrender.com/profile", {
          email,
        });

        setAverageMarks(response.data.averageMarks);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2">Welcome, {username}!</h3>
          <div className="mt-4">
            <h4 className="text-md font-medium mb-2">Average Marks per Subject:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {Object.entries(averageMarks).map(([subject, avg]) => (
                <li key={subject}>
                  <strong>{subject}:</strong> {avg}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
