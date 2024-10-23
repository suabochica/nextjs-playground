import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Timeline() {
  const userName = "@suabochica";

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Timeline of {userName}</h1>
        <Link href="/">Go Home</Link>
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
