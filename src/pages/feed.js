import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/feed.module.css'

import { App } from "./api/firebase";
import { storage } from "./api/firebase";

import { ref, get, getDatabase, set, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';


export default function feed() {

    const [userData, setUserData] = useState(null);

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
                            window.location.href = '/registro';
                        }
                    })
                } else {
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div id={styles.feed}>
            <Head>
                <title>Feed</title>
            </Head>
            <div id={styles.sideBar}>
            {userData&&(
                <div id={styles.profile}>
                    <img src={userData.profilePicUrl} id={styles.pfp}></img>
                </div>
            )}
            <div id={styles.criarSala}></div>    
                <div id={styles.sala}></div>
            </div>
            <div id={styles.contend}>
                
            </div>
        </div>
    )
}