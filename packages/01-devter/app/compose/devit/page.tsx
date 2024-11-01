'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/app/ui/button/button";

import styles from "@/app/compose/devit/page.module.css";

import { addDevit, uploadImage } from "@/firebase/client";

import useUser from "@/app/lib/useUser";
import Avatar from "@/app/ui/avatar/avatar";


const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export default function ComposeDevitPage() {
  const user = useUser();
  const router = useRouter(); 
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const [message, setMessage] = useState("");

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [downloadURL, setDownloadURL] = useState("");
  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    if (downloadURL) {
      setImgURL(downloadURL);
    }
  }, [downloadURL])

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
      image: imgURL,
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

  const handleDragOver = (event: React.DragEvent<HTMLTextAreaElement>): void => {
    event.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  } 

  const handleDragEnter = (event: React.DragEvent<HTMLTextAreaElement>): void => {
    event.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  }

  const handleDragLeave = (event: React.DragEvent<HTMLTextAreaElement>): void => {
    event.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  }

  const handleDrop = async (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);

    const file = event.dataTransfer.files[0];
    const url = await uploadImage(file);

    setDownloadURL(url);
  }

  return(
    <>
      <section className={styles.formSection}>
        { user && 
          <section className={styles.avatarSection}>
            {typeof user.avatar === 'string' && typeof user.userName === 'string' && <Avatar src={user.avatar} alt={user.userName}/>}
          </section>
        }
        <form className={styles.form} action="" onSubmit={handleSubmit}>
          <textarea 
            className={ drag === DRAG_IMAGE_STATES.DRAG_OVER ? styles.textareaDragOver: styles.textarea }
            placeholder="¿Qué esta pasando?"
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave} 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            value={message}
            >
          </textarea>
          { imgURL && 
            <section className={styles.imageSection}>
              <Image className={styles.image} src={imgURL} alt="image" />
              <button className={styles.imageButton} onClick={() => setImgURL("")}>X</button>
            </section>
          }
          <div className="container">
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </section>
    </>
  )
}
