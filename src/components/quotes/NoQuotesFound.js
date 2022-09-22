import classes from './NoQuotesFound.module.css';
import { Link } from 'react-router-dom';

const NoQuotesFound = () => {
  return (
    <div className={classes.noquotes}>
      <p>Нет цитат!</p>
      <Link className='btn' to="/new-quote">
        Добавить цитату
      </Link>
    </div>
  );
};

export default NoQuotesFound;
