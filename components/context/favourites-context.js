import { createContext, useReducer, useState } from "react";

export const FavoritesTeamsContext = createContext({
  favoriteTeam: [],
  addFavorite: ({ teamName, smallTeamName, teamLogo }) => {},
  deleteFavorite: (id) => {},
});

function favoritesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "DELETE":
      return state.filter((team) => team.id != action.payload);
    default:
      return state;
  }
}

function FavoritesTeamsContextProvider({ children }) {
  const [favoritesState, dispatch] = useReducer(favoritesReducer);

  function addFavorite(favoriteData) {
    dispatch({ type: "ADD", payload: favoriteData });
  }

  function deleteFavorite(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    favoriteTeam: favoritesState,
    addFavorite: addFavorite,
    deleteFavorite: deleteFavorite,
  };

  return (
    <FavoritesTeamsContext.Provider value={value}>
      {children}
    </FavoritesTeamsContext.Provider>
  );
}

export default FavoritesTeamsContextProvider;
