import styled from "styled-components"
import config from "../../config.json"

const Fav = styled.div`
width: 100%;
height: auto;
display: flex;
flex-direction: column;
padding: 1rem;

    h2{
        padding: 1rem;
        margin-bottom: 0.5rem;
    }
`

const CardFavoritos = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  gap: 1rem;
  align-items: center;
  a {
    width: 120px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;    
    flex-wrap: wrap;

    img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
    span {
      margin-top: 6px;
      width: 100%;
      text-align: center;
      color: black;
    }
  }
`;


const Favoritos = () => {
    return(
    <Fav>
        <h2>Canais Favoritos</h2>
        <CardFavoritos>
            {config.favoritos.map((favorito)=>{
                return(
                    <a key={favorito.url} href={favorito.url}>
                        <img src={favorito.picture}/>
                        <span>{favorito.nickname}</span>
                    </a>
                )
            })}
        </CardFavoritos>
    </Fav>
    )
}

export default Favoritos