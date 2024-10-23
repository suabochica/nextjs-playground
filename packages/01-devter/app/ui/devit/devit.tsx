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
      <div className="container">
        <Avatar alt={username} src={avatar} text={name}/>
      </div>
      <div>
        <p className="paragraph">{message}</p>
      </div>
    </article>
    </>
  )
}
