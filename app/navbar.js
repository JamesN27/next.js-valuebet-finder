import Image from 'next/image';
import Link from 'next/link';
import vwlogo from '../public/images/vwlogo.png';
import style from './navbar.module.css';

export default function Navbar() {
  return (
    <nav>
      <Link href="http://localhost:3000">
        <div className={style.logoContainer}>
          <Image src={vwlogo} alt="Logo" width={250} height={250} />
        </div>
      </Link>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/valuebets">Value Bets</Link>
        </li>
        <li>
          <Link href="/nbavalue">NBA Player Props</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
}
