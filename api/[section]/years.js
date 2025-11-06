import { users } from "../users";

export default function handler(req, res) {
  const { section } = req.query;
  const sec = users.find(u => u.section === section);
  if (!sec) return res.status(404).json({ error: "القسم غير موجود" });

  const years = sec.years.map(y => y.year);
  res.status(200).json(years);
}
