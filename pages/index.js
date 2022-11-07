import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/cssReset";
import Menu from "../src/components/Menu";
import {StyledTimeline} from "../src/components/TimeLine"

function HomePage() { 
  return (
    <>
      <CSSReset />
      <div>
        <Menu />
        <Header />
        <TimeLine playlists = {config.playlists} />
      </div>
    </>
  );
}

export default HomePage;


const StyledHeader = styled.div`
   img { 
     width: 80px;
     height: 80px;
     border-radius: 50%;
    }
   .user-info{
    margin-top: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem 2rem;
    gap: 1rem;
     }
     `

function Header() {
  return (
    <StyledHeader>
      {/* <img src="banner" /> */}
      <div className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </div>
    </StyledHeader>
  );
}

function TimeLine(propriedade) {
  const playlistNames = Object.keys(propriedade.playlists) 
  return (
    <StyledTimeline>
      {playlistNames.map((playlistNames) => {
        const videos = propriedade.playlists[playlistNames];
        return (
          <section>
            <h2>{playlistNames}</h2>
            <div>
              {videos.map((video) => {
                return (
                  <a href={video.url}>
                    <img src={video.thumb} />
                    <span>{video.title}</span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}
