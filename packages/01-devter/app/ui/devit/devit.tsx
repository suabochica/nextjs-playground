"use client";

import Image from "next/image";
import Link from 'next/link'; 
import { useRouter } from "next/compat/router";

import Avatar from "@/app/ui/avatar/avatar";
import styles from "@/app/ui/devit/devit.module.css";

import useTimeAgo from "@/app/lib/useTimeAgo";
import useDateTimeFormat from "@/app/lib/useTimeAgo";

type DevitProps = {
  avatar: string
  content: string
  createdAt: string
  id: string
  image?: string
  name: string  
  uid: string  
  userName: string
}


export default function Devit ({id, avatar, image, userName, content, createdAt, name, uid}: DevitProps  ) { 
  console.log("🚀 uid", uid);
  const timeAgo = useTimeAgo(+createdAt);
  const createdAtFormatted = useDateTimeFormat(+createdAt);
  const router = useRouter()

  const handleArticleClick  = (event: React.MouseEvent) => {
    event.preventDefault();

    if (router) {
      router.push(`/status/${id}`);
    }
  }

  return (
    <>
    <article key={id} className={styles.article} onClick={handleArticleClick}>
      <div className={styles.container}>
        <Avatar alt={userName} src={avatar} text={name}/>
      </div>
      <section>
        <header>
          <strong>{userName}</strong><span> · </span>
          <Link className={styles.link} href={`/status/${id}`}>
            <time className={styles.date} title={createdAtFormatted}>{timeAgo}</time>
          </Link>
        </header>
        <p className={styles.paragraph}>{content}</p>
        {image && <Image className={styles.img} src={image} alt="Devit"/>}
      </section>
    </article>
    </>
  )
}
