/* eslint-disable no-unused-vars */
function initialDataSetup(
  songs,
  authors,
  songRelations,
  songArtistRelations,
  authorSongRelations,
  authorGroupRelations
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
  const modifiedIDAuthorGroupLinks = authorGroupRelations.map((relation) => {
    return {
      ...relation,
      IDSource: "a" + relation.IDSource,
      IDTarget: "a" + relation.IDTarget,
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
    modifiedIDSongAuthorLinks,
    modifiedIDAuthorGroupLinks
  );
  return [joinedNodes, joinedLinks];
}

function prepareNodes(nodes) {
  const preparedNodes = nodes.map((node) => {
    const img = new Image();
    if (node.cancion_id.includes("c")) {
      img.src = `public/images/albums/${node.AlbumPic}`;
    } else {
      img.src = `public/images/artistas/${node.AlbumPic}`;
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
