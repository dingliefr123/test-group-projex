import { LeftBarEnum, LeftBarItem } from "../typing";
import styles from "./index.module.scss";
import { RightIcon } from "../icons";

const Item: React.FC<{
  idx: LeftBarEnum;
  activeIdx: LeftBarEnum;
  title: string;
  setActiveIdx: (idx: LeftBarEnum) => void;
}> = ({ idx, activeIdx, title, setActiveIdx }) => {
  const activeClass = idx === activeIdx ? styles.active : "";
  const className = [styles["bar-item"], activeClass].join(" ");
  const onClick = () => setActiveIdx(idx);
  return (
    <div
      className={className}
      onClick={onClick}
      data-testid="left-bar-item"
    >
      {title}
      <RightIcon />
    </div>
  );
};

const LeftBar: React.FC<{
  activeIdx: LeftBarEnum;
  setActiveIdx: (idx: LeftBarEnum) => void;
}> = ({ activeIdx, setActiveIdx }) => {
  return (
    <div className="big-text" data-testid="left-bar">
      {LeftBarItem.map((title, idx) => (
        <Item
          key={idx}
          idx={title}
          title={title}
          activeIdx={activeIdx}
          setActiveIdx={setActiveIdx}
        />
      ))}
    </div>
  );
};

export default LeftBar;
