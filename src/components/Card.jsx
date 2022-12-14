import { Link } from 'react-router-dom'

export default function Card(props) {
  return (
    <>
      <Link
        to={`/artist=${props.name}&album=${props.album.name}`}
        state={props.album}
      >
        <div className='album'>
          <img src={props.album.albumCover} />
          <div>
            <h1 className='albumName'>{props.album.name}</h1>
          </div>
          <p>$19.99</p>
        </div>
      </Link>
    </>
  )
}
