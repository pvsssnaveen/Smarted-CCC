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
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-2">My Profile</h2>

        {loading ? (
          <div className="text-gray-500 text-center">
            <svg
              className="animate-spin h-6 w-6 mr-2 inline-block text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 018 8h-4l3.5 3.5L20 20h-4a8 8 0 01-8-8z"
              ></path>
            </svg>{" "}
            Loading profile...
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Welcome, <span className="text-blue-600">{username}</span>!
            </h3>

            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                📊 Average Marks per Subject:
              </h4>
              <ul className="space-y-2">
                {Object.entries(averageMarks).map(([subject, avg]) => (
                  <li
                    key={subject}
                    className="bg-blue-50 p-3 rounded-lg shadow-sm flex justify-between items-center"
                  >
                    <span className="text-gray-700 font-medium">{subject}  </span>
                    <span className="text-blue-700 font-bold">{avg}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
