import styles from './RoundedImage.module.css'

export default function RoundedImage({src, alt, width}) {
    return (
        <img 
            className={`${styles.rounded_img} ${styles[width]}`}
            src={src}
            alt={alt}
        />
    )
}