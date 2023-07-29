import Movie from '../../interfaces/Movie';
import styles from './widget.module.css';
import Card from '../card/card';
import useMediaQuery from '../../custom_hooks/mediaQuery';

interface WidgetProps {
    movies: Movie[]
}
export default function Widget({ movies }: WidgetProps){

    const match = useMediaQuery('(max-width: 768px)')

    return (
        <div className={styles.container}>
            {
                movies?.map((movie) => {
                    return <Card {...movie} key={movie.id} style={{width: match ? '50%' : '20%'}} />
                })
            }
        </div>
    )
}