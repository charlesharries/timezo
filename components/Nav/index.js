import Link from 'next/link';
import { useContext } from 'react';
import { AppContext } from '~store/app';
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
          {user ? (
            <Link href="/signin">
              <a className="Nav__link link">Sign in</a>
            </Link>
          ) : (
            <Link href="/">
              <a className="Nav__link link">Sign up</a>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
