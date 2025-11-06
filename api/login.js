import { users } from "./users";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { fullname, password } = req.body;
  let found = null;

  function search(usersArr) {
    for (let u of usersArr) {
      if (u.students) {
        for (let s of u.students) if (s.fullname === fullname && s.password === password) return s;
      }
      if (u.teachers) {
        for (let t of u.teachers) if (t.fullname === fullname && t.password === password) return t;
      }
    }
    return usersArr.find(u => u.fullname === fullname && u.password === password);
  }

  found = search(users);

  if (!found) return res.status(401).json({ error: "الاسم أو كلمة المرور خاطئة" });

  res.status(200).json(found);
}
