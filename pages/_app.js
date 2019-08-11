import App, { Container } from 'next/app';
import axios from 'axios';
import nookies from 'next-cookies';
import { AppProvider } from '../store/app';

class CustomApp extends App {
  static async getInitialProps({ ctx }) {
    try {
      const { token } = nookies(ctx);

      const { data: user } = await axios({
        method: 'get',
        url: 'http://localhost:7777/api/users/me',
        headers: {
          Cookie: `token=${token}`,
        },
      });

      if (user.error) {
        return { user: null, err: user.error };
      }

      return { user };
    } catch (err) {
      console.log(err);
      return { user: null, err };
    }
  }

  render() {
    const { Component, pageProps, user, err } = this.props;

    if (err) {
      console.log(err);
    }

    return (
      <Container>
        <AppProvider user={user}>
          <Component {...pageProps} />
        </AppProvider>
      </Container>
    );
  }
}

export default CustomApp;
