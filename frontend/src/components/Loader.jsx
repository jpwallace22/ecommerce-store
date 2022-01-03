function Loader() {
  return (
    <div className="loader-container">
      <div className="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loader;
