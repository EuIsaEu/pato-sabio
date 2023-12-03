import styles from '@/styles/Login.module.css'
import stylesComp from '../styles/Components.module.css'

export default function login() {
    return (
        <>
            <div>
                <title>Login</title>
                <meta name="description" content="Entre no nosso web app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </div>
            <div id={styles.login}>
                <div id={styles.logo}>
                    <img src='sage-duck-logo.png' id={styles.logoImg}></img>
                </div>
                <div id={styles.nome}>
                    <p>Nome</p>
                    <input className={stylesComp.inputText}></input>
                </div>
                <div id={styles.senha}>
                    <p>Senha</p>
                    <input className={stylesComp.inputText}></input>
                </div>
                <div id={styles.button}>
                    <button>Entrar</button>
                </div>
                <div id={styles.cadastre}>
                    <p>Ainda não possui uma conta? <a href='/cadastro'>Cadastre-se aqui</a> </p>
                </div>
            </div>
        </>
    )
}