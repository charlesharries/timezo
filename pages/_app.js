import App, { Container } from 'next/app';
import { AppProvider } from '../components/Context';

class CustomApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        <AppProvider>
          <Component {...this.props} />
        </AppProvider>
      </Container>
    );
  }
}

export default CustomApp;
