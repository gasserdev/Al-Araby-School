import { users } from "./users";

export default function handler(req, res) {
  const sections = users.filter(u => u.section !== "manager").map(u => u.section);
  res.status(200).json(sections);
}
