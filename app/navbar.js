import Image from 'next/image';
import Link from 'next/link';
import vwlogo from '../public/images/vwlogo.png';
import style from './navbar.module.css';

export default function Navbar() {
  return (
    <nav>
      <Link href="http://localhost:3000">
        <div className={style.logoContainer}>
          <Image src={vwlogo} alt="Logo" width={500} height={500} />
        </div>
      </Link>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="http://localhost:3000/valuebets">Value Bets</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
}
