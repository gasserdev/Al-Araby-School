import { users } from "../../users";

export default function handler(req, res) {
  const { section, year } = req.query;
  const sec = users.find(u => u.section === section);
  if (!sec) return res.status(404).json({ error: "القسم غير موجود" });

  const yr = sec.years.find(y => y.year === year);
  if (!yr) return res.status(404).json({ error: "السنة غير موجودة" });

  const classes = yr.classes.map(c => c.name);
  res.status(200).json(classes);
}
