function Error(props) {
  console.log(props);

  return (
    <main className="Error">
      <h1>Error</h1>
      <pre>{JSON.stringify(props)}</pre>
    </main>
  );
}

export default Error;
