'use client';

import Head from 'next/head';
import Link from 'next/link'; 

import { useState, useEffect } from "react";  

import styles from "@/app/home/page.module.css";

import Devit from "@/app/ui/devit/devit"; 

import CreateIcon from '@/app/ui/icons/create';
import HomeIcon  from '@/app/ui/icons/home';
import SearchIcon from '@/app/ui/icons/search';

import useUser from "@/app/lib/useUser";

import { listenLatestDevits } from '@/firebase/client';

export default function HomePage() {
  const [timeline, setTimeline] = useState([]); 
  const user = useUser()


  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (user) {
      // @ts-expect-error unsubscribe is not defined
      unsubscribe = listenLatestDevits(setTimeline);
    }

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [user])

  return (
    <>
      <Head>
        <title>Home</title>
      </Head> 

      <header className={styles.header}>
        <h2 className={styles.h2}>Home</h2>
      </header>

      <section className={styles.section}>
        { 
          timeline && timeline.map((devit) => {
            const { id, avatar, userName, content, name, image, uid, createdAt } = devit;  

            return (
              <Devit
                avatar={avatar}
                id={id} 
                image={image} 
                key={id}
                content={content}
                name={name} 
                userName={userName}
                uid={uid}
                createdAt={createdAt}
              />
            )
          })
        }
      </section>
      <nav className={styles.nav}>
        <Link className={styles.link} href="/home">
          <HomeIcon width={32} height={32} stroke="#09f" />
        </Link>
        <Link className={styles.link} href="/search">
          <SearchIcon width={32} height={32} stroke="#09f" />
        </Link>
        <Link className={styles.link} href="/compose/devit">
          <CreateIcon width={32} height={32} stroke="#09f" />
        </Link>
      </nav>
    </>
  );  
}
