import styles from '@/styles/Home.module.css'
import Header from '../components/header'


export default function App() {
  return (
    <div className={styles.App}>
      <div>
        <title>Sage Duck</title>
        <meta name="description" content="Entre no nosso aplicativo se cadastrando" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> mudar para nossa logo */}
      </div>
      <Header />
      <div id={styles.contend}>
        
      </div>
    </div>
  );
}


