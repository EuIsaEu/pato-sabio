import Head from 'next/head';
import styles from '@/styles/Cadastro.module.css';
import stylesComp from '../styles/Components.module.css';
import { useState, useEffect } from 'react';
import { get, getDatabase, ref, set } from "firebase/database";
import { App } from "./api/firebase";
import { stringify } from 'uuid';

export default function cadastro() {

    function cadastrarUsuario() {
        const registroAcad = document.getElementById('ra').value;
        const nome = document.getElementById('nome').value;
        const senha = document.getElementById('senha').value;
        const picUrl = 'https://firebasestorage.googleapis.com/v0/b/sage-duck.appspot.com/o/usuarios%2Fpato.png?alt=media&token=7917d820-f228-41e8-aa38-073ca8831b9e';

        if (registroAcad !== '' && nome !== '' && senha.lenght !== '') {
            const db = getDatabase(App);
            const userRef = ref(db, 'usuarios/' + registroAcad);

            try {
                get(userRef).then((snapshot) => {
                    if (!snapshot.exists()) {
                        const data = {
                            id: registroAcad,
                            nome: nome,
                            senha: senha,
                            profilePicUrl: picUrl
                        }
                        const db = getDatabase();
                        set(ref(db, 'usuarios/' + registroAcad), data);
                        localStorage.setItem('userID', data.id);

                        window.location.href = '/'

                    } else {
                        console.log('usuario ja existe')
                    }
                });

            } catch (error) {
                console.error('erro aqui', error)
            }
        } else {
            document.getElementById('ra').placeholder = "digite algo"
            document.getElementById('nome').placeholder = "digite seu nome"
            document.getElementById('senha').placeholder = "digite sua senha"
        }
    }


    return (
        <>
            <Head>
                <title>Cadastro</title>
                <meta name="description" content="Entre no nosso aplicativo se cadastrando" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <link rel="icon" href="/favicon.ico" /> mudar para nossa logo */}
            </Head>
            <div id={styles.cadastro}>
                <div id={styles.logo}>
                    <img src='sage-duck-logo.png' id={styles.logoImg}></img>
                </div>
                <div id={styles.dados}>
                    <div id={styles.inputsTexts}>
                        <p>R.A.</p>
                        <input id='ra' className={stylesComp.inputText}></input>
                    </div>
                    <div id={styles.inputsTexts}>
                        <p>Nome do usuário</p>
                        <input id='nome' className={stylesComp.inputText}></input>
                    </div>
                    <div id={styles.inputsTexts}>
                        <p>Senha</p>
                        <input id='senha' className={stylesComp.inputText} type='password'></input>
                    </div>
                </div>
                <div id={styles.button}>
                    <button onClick={cadastrarUsuario}>cadastrar</button>
                </div>
                <div id={styles.entrar}>
                    <p>Já possui uma conta? <a href='/login'>Entre aqui</a> </p>
                </div>
            </div>
        </>
    )
}