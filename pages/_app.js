import App, { Container } from 'next/app';
import axios from 'axios';
import nookies from 'next-cookies';
import { AppProvider } from '../store/app';
import TheHeader from '../components/TheHeader';

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const { token } = nookies(ctx);

    if (!token || !token.length) {
      return { user: null, err: { message: 'no token' }, pageProps };
    }

    const { data } = await axios({
      method: 'get',
      url: 'http://localhost:7777/api/users/me',
      headers: {
        Cookie: `token=${token}`,
      },
    });

    if (data.error) {
      return { user: null, err: data, pageProps };
    }

    return { user: data, pageProps };
  }

  render() {
    const { Component, pageProps, user, err } = this.props;

    return (
      <Container>
        <AppProvider user={user}>
          <TheHeader />
          <Component {...pageProps} />
        </AppProvider>
      </Container>
    );
  }
}

export default CustomApp;
