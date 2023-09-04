import styles from './Input.module.css'

export default function Input({
    type,
    text,
    name,
    placeholder,
    handleOnChange,
    value,
    multiple,
    readOnly
}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                {...(multiple ? {multiple} : '')}
                readOnly={readOnly}
            />
        </div>
    )
}