//authors and their info
async function getAuthors() {
  return (author = await d3.csv("./perreoversoDB/artistas.csv"));
}

//songs and their info
async function getSongs() {
  return (songs = await d3.csv("./perreoversoDB/Canciones.csv"));
}
//Songs and the authors that wrote them joined by ID (for author names in the cards)
async function getSongPerformers(params) {
  return (songPerformers = await d3.csv(
    "./perreoversoDB/CantanteCancionRelacion_rows.csv"
  ));
}

//The relaltion between songs and authors that have been referenced by other songs (connect author card to their performed songs)
async function getAuthorSongRelations() {
  const authorSongRelations = await d3.csv(
    "./perreoversoDB/ReferenciasAutor_Cancion.csv"
  );
  let fixedParamsRelations = authorSongRelations.map((relation) => {
    return {
      id: relation.id,
      IDSource: relation.IDAutor,
      IDTarget: relation.IDCancion,
      isSongReference: relation.isSongReference,
    };
  });
  return fixedParamsRelations;
}
//the relation between songs and authors they explicitly mention by name
async function getSongArtistRelations() {
  return (songAuthorRelations = await d3.csv(
    "./perreoversoDB/ReferenciasCancion_Artista.csv"
  ));
}
//the relation between songs and other songs they mention in their lyrics
async function getSongSongRelations() {
  return (songSongRelations = await d3.csv(
    "./perreoversoDB/ReferenciasCancion.csv"
  ));
}
