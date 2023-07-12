import Image from 'next/image';
import Link from 'next/link';
import oddspedia from '../public/images/oddspedia.png';
import OddspediaWidget from './OddspediaWidget';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.body}>
      <div className={styles.main}></div>

      <div id="oddspedia-widget-container"></div>

      <OddspediaWidget />

      <footer className={styles.footer}>
        <p>Data powered by Oddspedia</p>
        <Link href="https://oddspedia.com/">
          <Image src={oddspedia} alt="Logo" width={125} height={25} />
        </Link>
      </footer>
    </div>
  );
}
