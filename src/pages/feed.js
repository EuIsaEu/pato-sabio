import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/feed.module.css'

import { App } from "./api/firebase";
import { storage } from "./api/firebase";

import { ref, get, getDatabase, set, update } from "firebase/database";
import { async } from '@firebase/util';


export default function feed() {

    const [userData, setUserData] = useState(null);

    function criarSala() {
        const db = getDatabase(App);
        const storedUser = localStorage.getItem('userID');
        const nomeSala = prompt('nome sala');
        const dbRef = ref(db, 'salas/' + nomeSala);

        get(dbRef).then((snapshot) => {
            if (!snapshot.exists()) {
                const materiaSala = prompt('qual a materia da sala?')
                const salaInfo = {
                    nome: nomeSala,
                    materia: materiaSala,
                    criadorID: storedUser
                }
                set(ref(db, 'salas/' + nomeSala), salaInfo);
            } else {
                alert('nome de sala já em uso')
            }
        })
    }

    useEffect(() => {
        const fetchUserData = () => {
            try {
                const storedUser = localStorage.getItem('userID');
                if (storedUser) {
                    const userID = storedUser;

                    const db = getDatabase(App);
                    const userRef = ref(db, 'usuarios/' + userID);

                    get(userRef).then((snapshot) => {

                        if (snapshot.exists()) {
                            setUserData(snapshot.val());

                        } else {
                            console.log('usuario não existe')
                            window.location.href = '/cadastro';
                        }
                    })
                } else {
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        }
        fetchUserData();
    }, []);

    return (
        <div id={styles.feed}>
            <Head>
                <title>Feed</title>
            </Head>
            <div id={styles.sideBar}>
                {userData && (
                    <div id={styles.profile}>
                        <a href='/usuario'>
                            <img src={userData.profilePicUrl} id={styles.pfp}></img>
                            <p>{userData.nome}</p>
                        </a>
                    </div>
                )}
                <p id={styles.criarSala} onClick={criarSala}>Criar nova sala</p>
                <div id={styles.sala}>
                    <h3></h3>
                    <p></p>
                </div>
            </div>
            <div id={styles.contend}>
                <div className={styles.posts}>
                    <p></p>
                    <img></img>
                </div>
            </div>
        </div>
    )
}