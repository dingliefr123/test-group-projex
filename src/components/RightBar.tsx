import styles from "./index.module.scss";

const RightBar: React.FC = () => {
  return (
    <div className={styles["right-bar-container"]}>
      <h2 className={styles.list}>SÉLECTION</h2>
      <div></div>
      <div>
        <div className={styles["btn"]}>Confirmer</div>
      </div>
    </div>
  );
};

export default RightBar;
