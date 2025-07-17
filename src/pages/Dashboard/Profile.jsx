import React from "react";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";

const Profile = () => {
  const { user } = useAuth(); 
  //console.log(user);
  const { role } = useUserRole();

  const showRole = role !== "user";

  return (
    <div className="max-w-xl mx-auto bg-orange-50 shadow-md rounded-xl p-6 md:p-8 mt-8">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Profile Image */}
        <img
          src={user?.photoURL || "https://i.ibb.co/F4V6ryMJ/avatar.jpg"}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-orange-200 shadow"
        />

        {/* Name and Email */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {user?.displayName || "Unnamed User"}
          </h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        {/* Role (only for non-user roles) */}
        {showRole && (
          <div className="px-4 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            Role: {role.charAt(0).toUpperCase() + role.slice(1)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
