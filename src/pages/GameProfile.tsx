const GameProfile = () => {

  // TODO: Backend will provide dynamic url from an API
  const gameUrl = `https://www.warpedcitadel.com/games/019f4381-b78d-7acb-9f50-44fc2cdcc3b1/019f4428-d472-7368-a10b-0159e1f47161/notindex.html`; // hardcoded


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