import styles from "./ModalWindow.module.css";

const ModalWindow = ({ chooseOption, title }) => {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <button
            onClick={() => {
              chooseOption(false);
            }}
          >
            X
          </button>
        </div>
        <div className={styles.title}>
          <h1>Are you sure you want to delete {title}?</h1>
        </div>
        <div className={styles.footer}>
          <button
            onClick={() => {
              chooseOption(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={() => chooseOption(true)} id={"confirmBtn"}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
