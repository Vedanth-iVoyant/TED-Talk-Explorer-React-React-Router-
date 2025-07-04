export interface User {
  id: string;
  username: string;
  password: string;
  role: "guest" | "user" | "admin";
}

export const users: User[] = [
  {
    id: "u1",
    username: "guest",
    password: "guest123",
    role: "guest",
  },
  {
    id: "u2",
    username: "user",
    password: "user123",
    role: "user",
  },
  {
    id: "u3",
    username: "admin",
    password: "admin123",
    role: "admin",
  },
];
