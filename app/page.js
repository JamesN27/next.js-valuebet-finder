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

      <div id="oddspedia-widget-odds-comparison-popular-false-sports-false-leagues-false">
        <script>
          {`
    window.oddspediaWidgetOddsComparisonPopularSportsLeagues = {
      api_token: "1802fa7b754c1a082862aa19948c30499bcd952be46462a15b5874b481e3",
      type: "odds-comparison",
      domain: "next-js-valuebet-finder-git-trial-jamesn27.vercel.app/",
      selector: "oddspedia-widget-odds-comparison-popular-false-sports-false-leagues-false",
      width: "0",
      theme: "1",
      odds_type: "1",
      language: "en",
      primary_color: "#0F5D75",
      accent_color: "#1AB7AC",
      font: "Roboto",
      logos: "true",
      limit: "10",
      popular: "false",
      sports: "",
      leagues: "",
    };
    `}
        </script>
        <script
          src="https://widgets.oddspedia.com/js/widget/init.js?widgetId=oddspediaWidgetOddsComparisonPopularSportsLeagues"
          async
        ></script>
      </div>

      <footer className={styles.footer}>
        <p>Data powered by Oddspedia</p>
        <Link href="https://oddspedia.com/">
          <Image src={oddspedia} alt="Logo" width={250} height={50} />
        </Link>
      </footer>
    </div>
  );
}
