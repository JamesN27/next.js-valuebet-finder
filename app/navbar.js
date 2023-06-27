import Image from 'next/image';
import Link from 'next/link';
import vwlogo from '../public/images/vwlogo.png';
import style from './navbar.module.css';

export default function Navbar() {
  return (
    <nav>
      <div className={style.logoContainer}>
        <Link href="http://localhost:3000">
          <Image src={vwlogo} alt="Logo" width={250} height={250} />
        </Link>
      </div>

      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="http://localhost:3000/valuebets">Value Bets</Link>
        </li>
        <li>
          <Link href="/nbavalue">NBA Player Prop Bets</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
}
