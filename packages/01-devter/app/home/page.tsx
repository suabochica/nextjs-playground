'use client';

import { useState, useEffect } from "react";  

import styles from "@/app/home/page.module.css";
import Devit from "@/app/ui/devit/devit"; 

export default function Home() {
  const [timeline, setTimeline] = useState([]); 

  useEffect(() => {
    const fetchTimeline = async () => {
      const response = await fetch("/api/statuses");
      const formattedResponse = await response.json();
      const { data } = formattedResponse;

      setTimeline(data);
    }

    fetchTimeline();
  }, []);  

  console.log(":rocket", timeline);

  return (
    <>
    <div>
      <header className={styles.header}>
        <h2>Home</h2>
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
    </div>
    </>
  );  
}