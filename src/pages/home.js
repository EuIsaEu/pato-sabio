import styles from '@/styles/Home.module.css'
import { useEffect, useState } from "react";
import { storage } from "./api/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
import Header from '../components/header'


export default function App() {
  const [imageUpload, setImageUpload] = useState(null)
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/")
  const uploadImage = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
      })

    }).catch((error) => {
      console.error('Erro ao enviar a imagem:', error);
    })
  };

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
      <Header />
      <input type="file" onChange={(event) => { setImageUpload(event.target.files[0]) }} />
      <button onClick={uploadImage}>Upload Image</button>
      <a href='/login'>Login</a>

      {imageList.map((url) => {
        return <img src={url} className={styles.imagem} />;
      })}
    </div>
  );
}


