import App, { Container } from 'next/app';
import { AppProvider } from '../components/Context';

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </Container>
    );
  }
}

export default CustomApp;
