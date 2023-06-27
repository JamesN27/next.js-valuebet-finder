import Image from 'next/image';
import Link from 'next/link';
import oddspedia from '../public/images/oddspedia.png';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <h1>Welcome to the Homepage</h1>
        <p>This is the main content of the homepage.</p>
      </div>
      <footer className={styles.footer}>
        <p>Data powered by</p>
        <Link href="https://oddspedia.com/">
          <Image src={oddspedia} alt="Logo" width={250} height={50} />
        </Link>
      </footer>
    </div>
  );
}
