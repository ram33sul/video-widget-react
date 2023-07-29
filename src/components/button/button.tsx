import { ReactNode } from 'react';
import styles from './button.module.css';

interface ButtonProps {
    type: 'forward' | 'backward';
    onClick?: () => void;
    active: boolean;
}

export default function Button({type, onClick, active}: ButtonProps){
    return (
        <button className={styles.button} onClick={onClick} style={type === 'backward' ? { transform: 'rotate(180deg)', opacity: active ? 1 : 0.5 }: {opacity: active ? 1 : 0.5}}>
            &#8594;
        </button>
    )
}