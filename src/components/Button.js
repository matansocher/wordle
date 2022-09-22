
import { getClass } from '../services/words.service';

function Button({ button, handleClick, isGameEnded }) {
  const { value, isDelete = false, isEnter = false, color = '' } = button;
  const isBigButton = !!isDelete || !!isEnter;
  const onClickFunction = isGameEnded ? () => {} : () => handleClick(button);
  return (
    <span className={`${isBigButton ? 'keyboard-button-big' : ''} ${getClass('keyboard-button', color)}`} onClick={onClickFunction}>{value}</span>
  );
}

export default Button;
