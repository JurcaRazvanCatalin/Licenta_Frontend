import axios from "axios";

export function deleteFavoritePlayer(id) {
  axios.delete(
    `https://licenta-cbmr-default-rtdb.firebaseio.com/favoritesPlayers/${id}.json`
  );
}

export function deleteFavorite(id) {
  return axios.delete(
    `https://licenta-cbmr-default-rtdb.firebaseio.com/favoritesTeams/${id}.json`
  );
}
