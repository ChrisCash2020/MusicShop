import Artist from "./Artist";
export default function Shop() {
  return (
    <>
      <Artist name="Kanye West" />
      <Artist amount={3} name="PlayBoi Carti" />
      <Artist name="Drake" />
      <Artist amount={3} name="Jay Z" />
      <Artist name="Kendrick Lamar" />
      <Artist amount={3} name="J Cole" />
    </>
  );
}
