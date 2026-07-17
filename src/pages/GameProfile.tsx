// import { useParams } from 'react-router-dom';

const GameProfile = () => {
  
  // const { uuid } = useParams<{ uuid: string }>();
  // const gameUrl = `https://www.warpedcitadel.com/games/${uuid}`;
  //TODO: scratch all this, this should call an api to fetch the proper URL for the iFrame. 
  
  // jared's temp game url for testing iframe
  const gameUrl = `https://www.warpedcitadel.com/games/019f590b-e855-73ce-aebb-2b1a3820ad64/files/Planet%20Game%20Tech%20Demo0.1%20-%20Web.zip/Planet%20Game%20Tech%20Demo0.1/index.html`;

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