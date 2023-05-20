import Image from 'next/image'
import styles from './page.module.css'
import Content from './Content';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';



export default function Home() {
  const nextCookies = cookies();
  if(nextCookies.get('token') === undefined || nextCookies.get('token') == null) {
    redirect('/auth/login');
  }

  return (
    <main className={styles.main}>
      <Content />
    </main>
  )
}
