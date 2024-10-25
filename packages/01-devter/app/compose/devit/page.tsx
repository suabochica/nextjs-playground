'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/app/ui/button/button";

import styles from "@/app/compose/devit/page.module.css";

import { addDevit } from "@/firebase/client";
import useUser from "@/app/lib/useUser";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

export default function ComposeDevit() {
  const user = useUser();
  const router = useRouter(); 
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const [message, setMessage] = useState("");

  console.log(user)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setMessage(value);
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    //@ts-expect-error: check if user is not null 
    const { avatar, userName, uid, name } = user;

    // @ts-expect-error: check if user is not null
    addDevit({
      avatar,
      content: message,
      uid,
      userName: userName,
      name
    }).then(() => {{
      setStatus(COMPOSE_STATES.SUCCESS);
      router.push("/home"); 
    }}).catch((err: Error) => {
      console.error(err);
      setStatus(COMPOSE_STATES.ERROR);
    })
  }

  const isButtonDisabled = message.length === 0 || status === COMPOSE_STATES.LOADING; 

  return(
    <>
      <form action="" onSubmit={handleSubmit}>
        <textarea className={styles.textarea} placeholder="¿Qué esta pasando?" onChange={handleChange}></textarea>
        <div className="container">
          <Button disabled={isButtonDisabled}>Devitear</Button>
        </div>
      </form>
    </>
  )
}
