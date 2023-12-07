import styles from '@/styles/allUsers.module.css'
import { useEffect, useState } from "react";
import { App, storage } from "./api/firebase";

import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { ref as dataRef, get, getDatabase, set, update } from "firebase/database";



export default function allUsers() {
    const [imageList, setImageList] = useState([]);
    const [userList, setUserList] = useState([])

    const db = getDatabase(App);

    const imageListRef = ref(storage, "usuarios/")
    const dbRef = dataRef(db, 'usuarios/');

    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            var data = snapshot.val();

            for (const id in data) {
                if (data.hasOwnProperty(id)) {
                    const usuario = data[id];

                    // Acesse as propriedades do usuário
                    const nomeDoUsuario = usuario.nome;
                    const idDoUsuario = usuario.id;

                    console.log(`ID: ${idDoUsuario}, Nome: ${nomeDoUsuario}`);
                }
            }

        } else {
            console.log('usuario ja existe')
        }

    })

    useEffect(() => {
        setImageList([]);
        listAll(imageListRef).then((response) => {
            // Usa Promise.all para aguardar todas as promessas de download URL
            Promise.all(response.items.map((item) => getDownloadURL(item)))
                .then((urls) => {
                    // Atualiza a lista de imagens
                    setImageList(urls);
                })
                .catch((error) => {
                    console.error('Erro ao obter URLs de download:', error);
                });
        });

    }, [])


    return (
        <div className={styles.App}>
            {imageList.map((url) => {
                return <img src={url} className={styles.imagem} />;
            })}
            {userList.map((data) => {
                return <p>{data}</p>
            })}
        </div>
    );
}


