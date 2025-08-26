import styles from './AuthInput.module.css';

const AuthInput = ({ id, label, type, name, placeholder, required = false, value, onChange, className }) => {
  return (
    <div className={`${styles.inputGroup} ${className || ''}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
};

export default AuthInput;