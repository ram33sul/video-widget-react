import { ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import useApi from '../../custom_hooks/api';
import Movie from '../../interfaces/Movie';
import styles from './widgets.module.css';
import Widget from '../widget/widget';
import Button from '../button/button';

export default function Widgets(){
    const [ movies, error, loading ] = useApi<Movie[]>('https://api.themoviedb.org/3/discover/movie');
    const [ page, setPage ] = useState<number>(0)
    const pageSize = 10;
    const wrapperRef = useRef<HTMLDivElement>(null)

    const widgetData = useMemo(() => {
        let moviesData: Movie[] = [];
        let data: ReactNode[] = [];
        let count = 0;
        movies?.forEach((movie) => {
            if(count === pageSize){
                data.push(<Widget movies={moviesData} />)
                moviesData = [];
                count = 0;
            }
            moviesData.push(movie)
            count++;
        })
        if(count !== 0){
            data.push(<Widget movies={moviesData} />)
        }
        return data;
    },[movies])

    const handleForward = () => {
        if(wrapperRef.current) {
            const itemWidth = wrapperRef.current.scrollWidth;
            setPage((prevPage) => prevPage + 1);
            wrapperRef.current.scrollLeft = (page + 1) * itemWidth;
          }
    }

    const handleBackward = () => {
        if(page > 0 && wrapperRef.current) {
            const itemWidth = wrapperRef.current.scrollWidth;
            setPage((prevPage) => prevPage - 1);
            wrapperRef.current.scrollLeft = (page - 1) * itemWidth;
          }
    }

    return (
        <div className={styles.container}>
            <Button type='backward' onClick={page === 0 ? () => {} : handleBackward} active={page !== 0} />
            <div className={styles.wrapper}>
                <div className={styles.heading}>
                    Trending Now
                </div>
                <div className={styles["widgets-wrapper"]} ref={wrapperRef} >
                    {
                        loading ? 'Loading' :
                        error ? 'Error occured. Please try again.' :
                        widgetData
                    }
                </div>
            </div>
            <Button type='forward' active={(page + 1) * pageSize < (movies?.length ?? 0)} onClick={((page + 1) * pageSize < (movies?.length ?? 0)) ? handleForward : () => {}} />
        </div>
    )
}