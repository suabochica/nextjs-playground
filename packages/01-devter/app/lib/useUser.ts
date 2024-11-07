'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { onAuthStateChange } from "@/firebase/client";
import { UserProfile } from "firebase/auth";

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
}

export default function useUser(): UserProfile | undefined {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)
  const router = useRouter();

  useEffect(() => {
    onAuthStateChange(setUser);
  }, []);


  useEffect(() => {
    if (user === USER_STATES.NOT_LOGGED) {
      router.push("/");
    }
  }, [user, router]);

  return user;
}
