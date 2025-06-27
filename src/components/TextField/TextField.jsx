import styles from "./TextField.module.css";

const TextField = ({ ...props }) => {
  return (
    <div className={styles.inputGroup}>
      <input {...props} />
    </div>
  );
};

export default TextField;
