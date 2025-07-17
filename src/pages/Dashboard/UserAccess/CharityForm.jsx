import React from "react";
import { useForm } from "react-hook-form";

function CharityForm({ onSubmit, user, errors, register }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label>Name:</label>
        <input value={user?.displayName} readOnly className="input input-bordered w-full" />
      </div>
      <div>
        <label>Email:</label>
        <input value={user?.email} readOnly className="input input-bordered w-full" />
      </div>
      <div>
        <label>Organization Name:</label>
        <input
          {...register("organization", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.organization && <p className="text-red-500">Organization is required</p>}
      </div>
      <div>
        <label>Mission Statement:</label>
        <textarea
          {...register("mission", { required: true })}
          className="textarea textarea-bordered w-full"
        />
        {errors.mission && <p className="text-red-500">Mission statement is required</p>}
      </div>
      <button className="btn w-full bg-orange-400" type="submit">
        Proceed to Payment
      </button>
    </form>
  );
}

export default CharityForm;