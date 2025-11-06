import { users } from "../../../users";

export default function handler(req, res) {
  const { section, year, class: className } = req.query;
  const sec = users.find(u => u.section === section);
  if (!sec) return res.status(404).json({ error: "القسم غير موجود" });

  const yr = sec.years.find(y => y.year === year);
  if (!yr) return res.status(404).json({ error: "السنة غير موجودة" });

  const cls = yr.classes.find(c => c.name === className);
  if (!cls) return res.status(404).json({ error: "الفصل غير موجود" });

  res.status(200).json({
    students: cls.students || [],
    teachers: cls.teachers || []
  });
}
