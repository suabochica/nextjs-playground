'use client';

import { useState } from "react";

import { Button } from "@/app/ui/button/button";

import styles from "@/app/compose/tweet/page.module.css";

import useUser from "@/app/lib/useUser";

export default function ComposeTweet() {
  const user = useUser();
  const [message, setMessage] = useState("");

  console.log(user)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setMessage(value);
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    // TODO: Add devit to firebase
    // addDevit({
    //   avatar: user.avatar,
    //   content: message,
    //   userId: user.uid,
    //   userName: user.username,
    //   name: user.name
    // })
  }

  return(
    <>
      <form action="" onSubmit={handleSubmit}>
        <textarea className={styles.textarea} placeholder="¿Qué esta pasando?" onChange={handleChange}></textarea>
        <div className="container">
          <Button disabled={message.length === 0}>Devitear</Button>
        </div>
      </form>
    </>
  )
}
