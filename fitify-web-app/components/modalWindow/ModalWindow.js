import styles from "./ModalWindow.module.css";

const ModalWindow = ({ chooseOption, title }) => {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.headerContainer}>
          <button
            onClick={() => chooseOption(false)}
            className={styles.titleCloseBtn}
          >
            X
          </button>
          <div className={styles.title}>
            <h1>Are you sure you want to delete {title}?</h1>
          </div>
        </div>
        <div className={styles.footer}>
          <button
            onClick={() => chooseOption(false)}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
          <button
            onClick={() => chooseOption(true)}
            className={styles.confirmBtn}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
