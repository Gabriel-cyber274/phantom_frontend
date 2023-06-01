import styles from './page.module.css'
import Content from './Content';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: '400'})

async function Home() {
  const nextCookies = cookies();
  if(nextCookies.get('token') === undefined || nextCookies.get('token') == null) {
    redirect('/auth/login');
  }

  return (
    <main className={`${styles.main} ${roboto.className}`}>
      <Content />
    </main>
  )
}

export default Home
