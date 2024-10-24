import Avatar from "@/app/ui/avatar/avatar";

import styles from "@/app/ui/devit/devit.module.css";

type DevitProps = {
  id: string
  avatar: string
  username: string
  message: string
  name: string  
}

export default function Devit ({id, avatar, username, message, name}: DevitProps  ) { 
  return (
    <>
    <article key={id} className={styles.article}>
      <div className={styles.container}>
        <Avatar alt={username} src={avatar} text={name}/>
      </div>
      <div>
        <strong className={styles.strong}>{username}</strong>
        <p className={styles.paragraph}>{message}</p>
      </div>
    </article>
    </>
  )
}
