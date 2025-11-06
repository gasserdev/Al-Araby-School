export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      message: "API شغال تمام",
      users: [
        { fullname: "أحمد علي", role: "teacher", section: "فزياء" },
        { fullname: "سارة محمد", role: "student", year: "الثانية", section: "اداب" }
      ]
    });
  }

  if (req.method === "POST") {
    const body = await req.json();
    return res.status(201).json({
      message: "تم استلام البيانات",
      data: body
    });
  }

  return res.status(405).json({ message: "الطريقة غير مدعومة" });
}
