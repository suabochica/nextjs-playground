import styles from './page.module.css';

import { prisma } from '@/lib/prisma';
import UserCard from '@/app/components/UserCard';

export default async function Users() {
  const users = await prisma.user.findMany();

  return (
    <div className={styles.grid}>
      {users.map((user) => {
        return <UserCard key={user.id} id={user.id} name={user.name} age={user.age} image={user.image} />;
      })}
    </div>
  );
}
