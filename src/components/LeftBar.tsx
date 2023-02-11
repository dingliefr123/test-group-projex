import { LeftBarEnum, LeftBarItem } from '../typing';
import styles from './index.module.css';
const Item: React.FC<
  {
    idx: LeftBarEnum,
    activeIdx: LeftBarEnum,
    title: string,
    setActiveIdx: (idx: LeftBarEnum) => void
  }
> = ({ idx, activeIdx, title, setActiveIdx }) => {
  const activeClass = idx === activeIdx ? "active" : '';
  const className = [styles['bar-item'], activeClass].join(' ');
  const onClick = () => setActiveIdx(idx)
  return <div className={className} onClick={onClick}>{ title }</div> 
};

const LeftBar: React.FC<{
  activeIdx: LeftBarEnum,
  setActiveIdx: (idx: LeftBarEnum) => void
}> = ({ activeIdx, setActiveIdx }) => {
  return <div className='big-text'>
    {
      LeftBarItem.map((title, idx) =>
        <Item
          key={idx}
          idx={title}
          title={title}
          activeIdx={activeIdx}
          setActiveIdx={setActiveIdx}
      />)
    }
  </div>
};

export default LeftBar