import { useEffect, useState } from "react";
import { key } from "../apiKey";
import Card from "./Card";
import { useParams } from "react-router-dom";

function Artist(props) {
  const { id } = useParams();
  const amount = props.amount === undefined ? 5 : props.amount;
  const [albumsArray, setAlbumsArray] = useState([]);
  const [artist, setArtist] = useState();
  async function getAlbums() {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${
        id || props.name
      }&api_key=${key}&format=json`
    );
    let data = await res.json();
    const albums = data.topalbums.album.slice(0, amount).map((obj) => ({
      name: obj.name,
      artistName: obj.artist.name,
      albumCover: obj.image[3]["#text"],
      logo: obj.image[0]["#text"],
      score: 0,
    }));
    setArtist(albums[0].artistName);
    setAlbumsArray(albums);
  }
  useEffect(() => {
    getAlbums();
  }, [id]);
  const albumCards = albumsArray.map((album) => (
    <Card key={album.name} album={album} name={id || props.name} />
  ));
  return (
    <div className="margin">
      <h1 className="artist">{artist}</h1>
      <div className="albums">{albumCards}</div>
    </div>
  );
}

export default Artist;
