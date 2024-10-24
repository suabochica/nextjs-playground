"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

import { onAuthStateChange } from "@/firebase/client";

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
}

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)
  const router = useRouter();

  useEffect(() => {
    onAuthStateChange(setUser);
  }, []);


  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push("/");
  }, [user]);

  return user;
}