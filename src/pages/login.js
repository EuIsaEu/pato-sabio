import Head from 'next/head';
import styles from '@/styles/Login.module.css'
import { get, getDatabase, ref, set } from "firebase/database";
import { App } from "./api/firebase";
import stylesComp from '../styles/Components.module.css'

export default function login() {

    function entrar() {
        const registroAcad = document.getElementById('ra').value;
        const senha = document.getElementById('senha').value;

        try {
            const db = getDatabase(App);
            const userRef = ref(db, 'usuarios/' + registroAcad);

            get(userRef).then((snapshot) => {
                console.log(snapshot.val().id)
                if (snapshot.exists()) {
                    if (senha == snapshot.val().senha) {
                        localStorage.setItem('userID', snapshot.val().id);
                        window.location.href = '/usuario'
                    } else {
                        alert('senha errada')
                    }
                } else {
                    console.log('usuario ja existe')
                }
            });

        } catch (error) {
            console.error('aq', error)
        }

    }

    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Entre no nosso web app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            <div id={styles.login}>
                <div id={styles.logo}>
                    <img src='sage-duck-logo.png' id={styles.logoImg}></img>
                </div>
                <div id={styles.nome}>
                    <p>R.A.</p>
                    <input id='ra' className={stylesComp.inputText}></input>
                </div>
                <div id={styles.senha}>
                    <p>Senha</p>
                    <input id='senha' type='password' className={stylesComp.inputText}></input>
                </div>
                <div id={styles.button}>
                    <button onClick={entrar}>Entrar</button>
                </div>
                <div id={styles.cadastre}>
                    <p>Ainda não possui uma conta? <a href='/cadastro'>Cadastre-se aqui</a> </p>
                </div>
            </div>
        </>
    )
}