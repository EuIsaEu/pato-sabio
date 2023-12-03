import styles from '@/styles/Cadastro.module.css'
import stylesComp from '../styles/Components.module.css'

export default function cadastro() {
    return (
        <>
            <div>
                <title>Cadastro</title>
                <meta name="description" content="Entre no nosso aplicativo se cadastrando" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <link rel="icon" href="/favicon.ico" /> mudar para nossa logo */}
            </div>
            <div id={styles.cadastro}>
                <div id={styles.logo}>
                    <img src='sage-duck-logo.png' id={styles.logoImg}></img>
                </div>
                <div id={styles.inputsTexts}>
                    <p>R.A.</p>
                    <input className={stylesComp.inputText}></input>
                </div>
                <div id={styles.inputsTexts}>
                    <p>Nome do usuário</p>
                    <input className={stylesComp.inputText}></input>
                </div>
                <div id={styles.inputsTexts}>
                    <p>Senha</p>
                    <input className={stylesComp.inputText}></input>
                </div>
                <div id={styles.button}>
                    <button>cadastrar</button>
                </div>
                <div id={styles.entrar}>
                    <p>Já possui uma conta? <a href='/cadastro'>Entre aqui</a> </p>
                </div>
            </div>
        </>
    )
}