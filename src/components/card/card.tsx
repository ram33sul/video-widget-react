import { CSSProperties } from "react";
import styles from './card.module.css';

interface Props {
    title: string;
    backdrop_path: string;
    popularity: number;
    style: CSSProperties
}

export default function Card({title, backdrop_path, popularity, style}: Props){

    const imageUrl = `https://image.tmdb.org/t/p/w500${backdrop_path}`
    return (
        <div className={styles.container} style={style}>
            <div className={styles['image-wrapper']}>
                <img src={imageUrl} alt="" className={styles.image}/>
                <div className={styles.play}>Play</div>
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.popularity} >
                Popularity: <span>{popularity}</span>
            </div>
        </div>
    )
}