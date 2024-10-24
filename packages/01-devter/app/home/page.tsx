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

export default function Home() {
  const [timeline, setTimeline] = useState([]); 
  const user = useUser()

  useEffect(() => {
    if (user) {
      const fetchTimeline = async () => {
        const response = await fetch("/api/statuses");
        const formattedResponse = await response.json();
        const { data } = formattedResponse;

        setTimeline(data);
      }

      fetchTimeline();
    }
  }, [user]);  

  console.log(":rocket", timeline);

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
            const { id, avatar, username, message, name } = devit;  

            return (
              <Devit
                avatar={avatar}
                id={id} 
                key={id}
                message={message}
                name={name} 
                username={username}
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
