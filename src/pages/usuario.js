import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Usuario.module.css';

import { App } from "./api/firebase";
import { storage } from "./api/firebase";

import { ref, get, getDatabase, set, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';

export function usuario() {
    const [userData, setUserData] = useState(null);

    function enviar(file) {

        const db = getDatabase(App);
        const imageRef = storageRef(storage, `usuarios/${file.name + v4()}`);
        const storedUser = localStorage.getItem('userID');
        const dbRef = ref(db, 'usuarios/' + storedUser);

        uploadBytes(imageRef, file).then((snapshot) => {

            getDownloadURL(snapshot.ref).then((url) => {

                get(dbRef).then((snapshot) => {

                    if (snapshot.exists()) {
                        var data = snapshot.val();
                        data.profilePicUrl = url

                        set(ref(db, 'usuarios/' + storedUser), data);
                        setUserData(data);
                    } else {
                        console.log('usuario ja existe')
                    }

                })

            })

        })
    }

    function mudarStatus() {
        const novoStatus = prompt('digite novo status')

        try {
            const storedUser = localStorage.getItem('userID');
            if (storedUser) {
                const userID = storedUser;

                const db = getDatabase(App);
                const userRef = ref(db, 'usuarios/' + userID);

                get(userRef).then((snapshot) => {

                    if (novoStatus != null) {
                        const data = snapshot.val();
                        data.status = novoStatus;
                        set(ref(db, 'usuarios/' + storedUser), data);
                        location.reload()

                    } else {

                    }
                })
            } else {
                window.location.href = '/login'
            }
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        }

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
                            console.log('usuario não logado')
                            window.location.href = '/login'
                        }
                    })
                } else {
                    window.location.href = '/login'
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <Head>
                {userData && (
                    <title>{userData.nome}</title>
                )}
            </Head>
            <div id={styles.usuarioDados}>
                <a href='/feed' id={styles.feed}>Acessar feed</a>
                {userData && (
                    <div id={styles.pfpNome}>
                        <div id={styles.fotoCam}>
                            <img src={userData.profilePicUrl} id={styles.pfp}></img>
                            <input id={styles.escolherImg} type='file' onChange={(event) => { enviar(event.target.files[0]) }} ></input>
                        </div>
                        <p id={styles.nome}>{userData.nome}</p>
                        <p onClick={mudarStatus} id={styles.recado}>{userData.status}</p>
                    </div>
                )}
            </div>
            <div id={styles.posts}>

            </div>
        </>
    )
}


export default usuario;

