import { ISender } from "../../../types/sender";
import "./styles.css";

const Sender: React.FC<ISender> = ({ name, postsCount }) => {
  return (
    <div className="sender-card">
      {name} <span>{postsCount}</span>
    </div>
  );
};
export default Sender;
