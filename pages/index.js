import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu/Menu";
import { StyledTimeline } from "../src/components/TimeLine";
import Favoritos from "../src/components/favoritos";
import { videoService } from "../src/sevice/VideoService";


function HomePage() {
  const service = videoService();
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playlist,setPlaylist] = React.useState({})

  React.useEffect(()=>{
    service.getAllVideos().then((dados) => {
      const novasPlaylists = { ...playlist };
      dados.data.forEach((video) => {
        if (!novasPlaylists[video.playlist]) {
          novasPlaylists[video.playlist] = [];
        }
        novasPlaylists[video.playlist].push(video);
      });
      setPlaylist(novasPlaylists);
    });
  },[])

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <TimeLine searchValue={valorDoFiltro} playlists={playlist} />
        <Favoritos />
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1}; 
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem 2rem;
    border-top: 1rem;
    gap: 1rem;
  }
`;

const StyledBanner = styled.div`
  background-color:Blue;
  height: 230px;
  background-image:url(${({bg})=>bg}); 
`;

function Header() {
  return (
    <>
      <StyledBanner bg = {config.bg} />
      <StyledHeader>
        <div className="user-info">
          <img src={`https://github.com/${config.github}.png`} />
          <div>
            <h2>{config.name}</h2>
            <p>{config.job}</p>
          </div>
        </div>
      </StyledHeader>
    </>
  );
}

function TimeLine({ searchValue, ...propriedade }) {
  const playlistNames = Object.keys(propriedade.playlists);
  return (
    <StyledTimeline>
      {playlistNames.map((playlistNames) => {
        const videos = propriedade.playlists[playlistNames];
        return (
          <section key={playlistNames}>
            <h2>{playlistNames}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized);
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
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
