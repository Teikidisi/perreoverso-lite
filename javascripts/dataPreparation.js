/* eslint-disable no-unused-vars */
function initialDataSetup(
  songs,
  authors,
  songRelations,
  songArtistRelations,
  authorSongRelations
) {
  const modifiedIDSongs = songs.map((song) => {
    return {
      ...song,
      cancion_id: "c" + song.cancion_id,
    };
  });
  const modifiedIDAuthors = authors.map((author) => {
    return {
      ...author,
      autor_id: "a" + author.autor_id,
    };
  });
  const modifiedIDSongLinks = songRelations.map((relation) => {
    return {
      ...relation,
      IDSource: "c" + relation.IDSource,
      IDTarget: "c" + relation.IDTarget,
    };
  });
  const modifiedIDSongAuthorLinks = songArtistRelations.map((relation) => {
    return {
      ...relation,
      IDSource: "c" + relation.IDSource,
      IDTarget: "a" + relation.IDTarget,
    };
  });
  const modifiedIDAuthorSongLinks = authorSongRelations.map((relation) => {
    return {
      ...relation,
      IDSource: "a" + relation.IDSource,
      IDTarget: "c" + relation.IDTarget,
    };
  });

  const referencedAuthors = modifiedIDAuthors.filter((author) => {
    return modifiedIDSongAuthorLinks.find((link) => {
      return link.IDTarget === author.autor_id;
    });
  });

  const formattedAuthorsforSongNodes = referencedAuthors.map((author) => {
    return {
      cancion_id: author.autor_id,
      Nombre: author.Nombre,
      Autor: null,
      AlbumPic: author.Foto,
    };
  });
  const joinedNodes = modifiedIDSongs.concat(formattedAuthorsforSongNodes);
  const joinedLinks = modifiedIDSongLinks.concat(
    modifiedIDAuthorSongLinks,
    modifiedIDSongAuthorLinks
  );
  return [joinedNodes, joinedLinks];
}

function prepareNodes(nodes) {
  const preparedNodes = nodes.map((node) => {
    const img = new Image();
    if (node.cancion_id.includes("c")) {
      img.src = `https://storage.googleapis.com/perreoverso/ALBUMES/${node.AlbumPic}`;
    } else {
      img.src = `https://storage.googleapis.com/perreoverso/ARTISTAS/${node.AlbumPic}`;
    }
    let autorString = "";
    if (node.Autor != null) {
      for (let i = 0; i < node.Autor.length; i++) {
        autorString += node.Autor[i].NombreAutor;
        if (i != node.Autor.length - 1) {
          autorString += ", ";
        }
      }
    }

    return {
      pic: img,
      id: node.cancion_id,
      name: node.Nombre,
      autor: autorString,
    };
  });
  return preparedNodes;
}

function populateSongWithPerformers(authors, songs, performersRelation) {
  let organizedSongs = songs.map((song) => {
    const locatedRelations = performersRelation.filter(
      (x) => x.IDCancion == song.cancion_id
    );
    let totalRelationsForSong = locatedRelations.length;
    let artistas = [];
    for (const author of authors) {
      if (totalRelationsForSong != 0) {
        if (
          locatedRelations.find(
            (relation) => relation.IDAutor == author.autor_id
          ) != undefined
        ) {
          totalRelationsForSong -= 1;
          artistas.push({
            idAutor: author.autor_id,
            NombreAutor: author.Nombre,
          });
        }
      } else {
        break;
      }
    }

    return {
      cancion_id: song.cancion_id,
      Nombre: song.Nombre,
      Autor: artistas,
      AlbumPic: song.AlbumPic,
    };
  });
  return organizedSongs;
}
