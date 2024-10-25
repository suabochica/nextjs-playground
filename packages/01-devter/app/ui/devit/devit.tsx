import Avatar from "@/app/ui/avatar/avatar";

import styles from "@/app/ui/devit/devit.module.css";

type DevitProps = {
  avatar: string
  content: string
  createdAt: string
  id: string
  name: string  
  uid: string  
  userName: string
}

export default function Devit ({id, avatar, userName, content, createdAt, name, uid}: DevitProps  ) { 
  return (
    <>
    <article key={id} className={styles.article}>
      <div className={styles.container}>
        <Avatar alt={userName} src={avatar} text={name}/>
      </div>
      <section>
        <header>
          <strong>{userName}</strong> · <span className={styles.date}>{createdAt}</span>
        </header>
        <p className={styles.paragraph}>{content}</p>
      </section>
    </article>
    </>
  )
}
