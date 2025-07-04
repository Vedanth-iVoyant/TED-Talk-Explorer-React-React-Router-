import React from "react";
import { getUserFavorites } from "../utils/storage";

export const Favorites = () => {
  const UserFavorites = getUserFavorites();
  return <div>{UserFavorites}</div>;
};
