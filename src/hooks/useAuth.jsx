import React, { use } from 'react';
import { AuthContext } from '../context/authcontext/AuthContext';

function useAuth() {
  const authData = use(AuthContext);
  return authData;
}

export default useAuth;