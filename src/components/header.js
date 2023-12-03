import styles from '../styles/Components.module.css'

export default function Header() {
    return (
        <div id={styles.header}>
            <div id={styles.divLogo}>
                <img id={styles.logo} src='sage-duck-logo.png'></img>
                <h1>Sage Duck</h1>
            </div>
            <span>
                <a href='/cadastro'>Cadastre-se</a>
                <a href='/login'>Login</a>
            </span>
        </div>
    )
}
