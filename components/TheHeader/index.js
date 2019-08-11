import Nav from './Nav';
import SignupStatus from './SigninStatus';

function TheHeader() {
  return (
    <header className="Header">
      <div className="Header__inner">
        <SignupStatus />
        <Nav />
      </div>
    </header>
  );
}

export default TheHeader;
