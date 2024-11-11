"use client";

import { useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/navigation";

import { loginWithGitHub } from "@/firebase/client";

import styles from "@/app/page.module.css";

import { Button } from "@/app/ui/button/button";

import GitHubIcon from "@/app/ui//icons/github";
import Logo from "@/app/ui/icons/logo";

import useUser, { USER_STATES } from "@/app/lib/useUser";

export default function HomePage() {
  const user = useUser();
  const router = useRouter(); 

  useEffect(() => {
    if (user !== null)  {
      router.replace("/home");  
    }
  }, [user, router]);

  const handleClick = (event: React.SyntheticEvent): void => {
    loginWithGitHub(event)
     .catch((err: Error) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>devter</title>
        <meta name="description" content="Tweeter for devs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.main}>
        <Logo className={styles.logo} width={120} height={120}/>  
        <h1 className={styles.h1}>Devter</h1>
        <h2 className={styles.h2}>Talk about development with developers</h2>

        <div className={styles.mt}>
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <GitHubIcon fill="#FEFEFE" width={24} height={24} />
              Log in with GitHub
            </Button>
          )}

          {user === USER_STATES.NOT_KNOWN && (
            <div>
              <p>Loading...</p>
            </div>  
          )}
        </div>

      </section>
    </div>
  );
}
