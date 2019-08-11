import Link from 'next/link';
import { useContext } from 'react';
import { AppContext } from '~store/app';
import Signout from '~components/Signout';
import './style.css';

function Nav() {
  const [state] = useContext(AppContext);

  const { user } = state;

  return (
    <nav className="Nav">
      <ul className="Nav__list">
        <li className="Nav__item">
          <Link href="/">
            <a className="Nav__link link">Home</a>
          </Link>
        </li>
        <li className="Nav__item">
          {user && Object.keys(user).length ? (
            <Signout />
          ) : (
            <Link href="/signin">
              <a className="Nav__link link">Sign in</a>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
