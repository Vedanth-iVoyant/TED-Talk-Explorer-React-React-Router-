export interface User {
  id: string;
  username: string;
  password: string;
  role: "guest" | "user" | "admin";
}

export const users: User[] = [
  {
    id: "u1",
    username: "user",
    password: "user123",
    role: "user",
  },
  {
    id: "u2",
    username: "admin",
    password: "admin123",
    role: "admin",
  },
];
