import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import SavedCoin from "../components/SavedCoin";

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  if (user) {
    return (
      <main>
        {/* Welcome User / Sign Out Section */}
        <section className="flex justify-between items-center mb-4 mt-36 py-8 rounded-div">
          <div>
            <h1 className="text-2xl font-bold mb-4">Account</h1>
            <div>
              <p>Welcome, {user?.email}</p>
            </div>
          </div>

          <div>
            <button
              onClick={handleSignOut}
              className="border px-6 py-2 rounded-2xl shadow-lg hover:shadow-2xl"
            >
              Sign Out
            </button>
          </div>
        </section>

        {/* User's Coins Watch List Section */}
        <section className="flex justify-between items-center my-12 py-8 rounded-div">
          <div className="w-full min-h-[300px]">
            <h2 className="text-2xl font-bold py-4">Watch List</h2>
            <SavedCoin />
          </div>
        </section>
      </main>
    );
  } else {
    return <Navigate to="/signin" />;
  }
};

export default Account;
