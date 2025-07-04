export interface User {
  id: string;
  username: string;
  password: string;
  role: "guest" | "user" | "admin";
}

export function getStoredUser(): User | null {
  const data = localStorage.getItem("LoginUser");
  return data ? (JSON.parse(data) as User) : null;
}

export function saveUserFavorites(favorites: string[]) {
  const user = getStoredUser();
  if (!user) return [];
  const key = `favorites_${user?.id}`;
  localStorage.setItem(key, JSON.stringify(favorites));
}

export function getUserFavorites(): string[] {
  const user = getStoredUser();
  if (!user) return [];
  const key = `favorites_${user?.id}`;
  const storedFavorites = localStorage.getItem(key);
  return storedFavorites ? JSON.parse(storedFavorites) : [];
}
