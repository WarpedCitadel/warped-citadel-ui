const GameProfile = () => {

  // TODO: Backend will provide dynamic url from an API
  const gameUrl = `https://www.warpedcitadel.com/html/019f1969-525c-7c73-98f7-6fb8d3588fc8/notindex.html`; // hardcoded


  // Add gameprofile content on web page

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
  };

  const iframeStyle: React.CSSProperties = {
    width: '900px',
    height: '700px',
  };

  return (
    <div style={containerStyle}>
      <iframe
        src={gameUrl}
        title={`Gold Rush`}
        width="100%"
        height="700"
        style={iframeStyle}
      />
    </div>
  );
};

export default GameProfile;