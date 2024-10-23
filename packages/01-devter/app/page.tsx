"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import styles from "./page.module.css";

import Avatar from "./ui/avatar/avatar";
import { Button } from "./ui/button/button";
import GitHub from "./ui//icons/github";

import {
  loginWithGitHub,
  onAuthStateChange,
  UserProfile,
} from "../firebase/client";

export default function Home() {
  const [user, setUser] = useState<UserProfile | null | undefined>(undefined);

  useEffect(() => {
    onAuthStateChange(setUser);
  }, []);

  const handleClick = (event: React.SyntheticEvent): void => {
    loginWithGitHub(event)
      .then((user) => {
        setUser(user);
        console.log(user);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>devter</title>
        <meta name="description" content="Tweeter for devs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image
          src="/devter-logo.png"
          alt="Devter logo"
          height={32}
          width={32}
        />
        <h1 className={styles.title}>Devter</h1>
        <h2>Talk about development with developers</h2>

        {user === null && (
          <Button onClick={handleClick}>
            <GitHub fill="#FEFEFE" width={24} height={24} />
            Log ing with GitHub
          </Button>
        )}

        {user && user.avatar && user.username && (
          <Avatar src={user.avatar} alt={user.username} text={user.username} />
        )}

        <div className={styles.ctas}>
          <Link
            className={styles.primary}
            href="/timeline"
            rel="noopener noreferrer"
          >
            Timeline
          </Link>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
