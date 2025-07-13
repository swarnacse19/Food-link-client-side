import { useQuery, useMutation } from "@tanstack/react-query";
import {
  FaTrashAlt,
  FaUserShield,
  FaUtensils,
  FaHandsHelping,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Loading/Loading";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => refetch(),
  });

  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/users/${id}`),
    onSuccess: () => refetch(),
  });

  const handleRoleChange = async (id, role) => {
    const confirm = await Swal.fire({
      title: `Make this user a ${role}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (confirm.isConfirmed) {
      try {
        await updateRole({ id, role });
        Swal.fire("Success", `User is now a ${role}`, "success");
      } catch (err) {
        Swal.fire("Error", "Failed to update role", "error");
      }
    }
  };

  const handleDelete = async (id) => {

    const confirm = await Swal.fire({
      title: "Delete this user?",
      text: "This will also remove the user from Firebase.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteUser( id );
        Swal.fire("Deleted", "User has been removed", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete user", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Change Role</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name || "N/A"}</td>
                  <td>{u.email}</td>
                  <td className="capitalize">{u.role || "user"}</td>
                  <td className="flex flex-col lg:flex-row gap-1">
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => handleRoleChange(u._id, "admin")}
                    >
                      <FaUserShield className="mr-1" /> Admin
                    </button>
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleRoleChange(u._id, "restaurant")}
                    >
                      <FaUtensils className="mr-1" /> Restaurant
                    </button>
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() => handleRoleChange(u._id, "charity")}
                    >
                      <FaHandsHelping className="mr-1" /> Charity
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(u._id)}
                    >
                      <FaTrashAlt className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
