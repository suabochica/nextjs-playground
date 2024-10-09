import Image from "next/image";
import Head from "next/head";
import Link from "next/link";	
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Head>
        <title>devter</title>
        <meta name="description" content="Tweeter for devs" />
        <link rel="icon" href="/favicon.ico"/> 
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Devter</h1>

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
