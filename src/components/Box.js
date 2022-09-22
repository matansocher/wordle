
import { getClass } from '../services/words.service';

function Box({ box }) {
  const letter = box?.value || '';
  const color = box?.color || '';

  return (
    <span className={`${getClass('board-box', color)}`}>{letter}</span>
  );
}

export default Box;
