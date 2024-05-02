/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const supabaseUrl = "https://fmjvfztmpxupfifftygz.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtanZmenRtcHh1cGZpZmZ0eWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4ODE2ODAsImV4cCI6MjAyMzQ1NzY4MH0.jMGJWCTk1m3VSjL_xfUbvN8ooZktYvWCJuMq6Tdf4_o";

const supabaseAPI = supabase.createClient(supabaseUrl, SUPABASE_KEY);

async function getSongs() {
  let { data: fetchedSongs, error } = await supabaseAPI
    .from("Canciones")
    .select("cancion_id,Nombre,AlbumPic,Autor(autor_id,Nombre)");
  if (error) return console.log(error);
  let organizedSongs = fetchedSongs.map((song) => {
    let artistas = [];
    artistas = song.Autor.map((data) => {
      return {
        idAutor: data.autor_id,
        NombreAutor: data.Nombre,
      };
    });

    return {
      cancion_id: song.cancion_id,
      Nombre: song.Nombre,
      Autor: artistas,
      AlbumPic: song.AlbumPic,
    };
  });
  return organizedSongs;
}

async function getAuthors() {
  let { data: fetchedAuthors, error } = await supabaseAPI
    .from("Autor")
    .select("autor_id,Nombre,Foto");
  if (error) return console.log(error);
  return fetchedAuthors;
}

async function getSongSongRelations() {
  let { data: relations, error } = await supabaseAPI
    .from("ReferenciasCancion")
    .select("id,AudioSource,IDSource,IDTarget,Verso,isSongReference");
  if (error) return console.log(error);
  return relations;
}

async function getArtistRelations() {
  let { data: relation, error } = await supabaseAPI
    .from("IntraArtistasRelacion")
    .select("id,ArtistaSource,ArtistaTarget,Relacion");
  if (error) return console.log(error);
  return relation;
}

async function getSongArtistRelations() {
  let { data: relations, error } = await supabaseAPI
    .from("ReferenciasCancion_Artista")
    .select("id,AudioSource,IDSource,IDTarget,Verso,isSongReference");
  if (error) return console.log(error);
  return relations;
}

async function getAuthorGroupRelations() {
  let { data: relations, error } = await supabaseAPI
    .from("Relacion_Autor_Grupo")
    .select("*");
  if (error) return console.log(error);
  return relations;
}

async function getAuthorSongRelations() {
  let { data: relations, error } = await supabaseAPI
    .from("ReferenciasAutor_Cancion")
    .select("*");
  if (error) return console.log(error);
  const formattedData = relations.map((link) => {
    return {
      id: link.id,
      IDSource: link.IDAutor,
      IDTarget: link.IDCancion,
      isSongReference: link.isSongReference,
    };
  });
  return formattedData;
}
