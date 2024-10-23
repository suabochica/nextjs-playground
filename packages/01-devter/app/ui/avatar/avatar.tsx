import Image from "next/image";

import styles from "./avatar.module.css";

interface AvatarProps {
  alt: string;
  src: string;
  text?: string;
}

export default function Avatar({ alt, src, text }: AvatarProps) {
  return (
    <div className={styles.container}>
      <Image className={styles.avatar} alt={alt} src={src} title={text} />
      {text && <strong>{text}</strong>}
    </div>
  );
}
