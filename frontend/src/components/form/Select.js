import styles from './Select.module.css'

export default function Select({ text, name, options, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value || ''}
            >
                <option>Selecione uma Opção</option>
                {options.map((option) => (
                    <option value={option} key={option} >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}