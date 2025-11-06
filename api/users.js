const users = [
{
  "section": "لوجيستيات",
  "years": [
    {
      "year": "الثانية",
      "classes": [
        {
          "name": "2A",
          "students": [
            {
              "id": 1,
              "fullname": "كريم محمد",
              "password": "123456789",
              "banned": false,
              "grades": {
                "العربية": 92,
                "الإنجليزية": 88,
                "رياضيات": 79,
                "دين": 85,
                "لوجستيات": 94
              },
              "schedule": [
                { "day": "الأحد", "subject": "عربي", "time": "8:00 - 9:00" },
                { "day": "الإثنين", "subject": "إنجليزي", "time": "9:00 - 10:00" },
                { "day": "الثلاثاء", "subject": "رياضيات", "time": "10:00 - 11:00" },
                { "day": "الأربعاء", "subject": "علوم", "time": "11:00 - 12:00" }
              ]
            }
          ],
          "teachers": [
            {
              "id": 4,
              "fullname": "محمد صلاح",
              "password": "123456785",
              "banned": false,
              "isHOD": false,
              "rating": 4.2,
              "classes": [
                { "name": "1A", "year": "الأولى" },
                { "name": "2A", "year": "الثانية" }
              ],
              "schedule": [
                { "day": "الأحد", "subject": "فزياء", "time": "8:00 - 9:00" },
                { "day": "الإثنين", "subject": "رياضيات", "time": "9:00 - 10:00" }
              ]
            }
          ]
        }
      ]
    }
  ]
},
{
  "section": "اداب",
  "years": [
    {
      "year": "الأولى",
      "classes": [
        {
          "name": "1B",
          "students": [
            {
              "id": 9,
              "fullname": "إياد طارق",
              "password": "9988776655",
              "banned": false,
              "grades": {
                "العربية": 93,
                "الإنجليزية": 89,
                "رياضيات": 86,
                "علوم": 91
              },
              "schedule": [
                { "day": "الأحد", "subject": "عربي", "time": "8:00 - 9:00" },
                { "day": "الإثنين", "subject": "إنجليزي", "time": "9:00 - 10:00" },
                { "day": "الثلاثاء", "subject": "رياضيات", "time": "10:00 - 11:00" },
                { "day": "الأربعاء", "subject": "علوم", "time": "11:00 - 12:00" }
              ]
            }
          ],
          "teachers": [
            {
              "id": 11,
              "fullname": "سارة مصطفى",
              "password": "12344321",
              "banned": false,
              "isHOD": false,
              "rating": 4.4,
              "classes": [
                { "name": "1B", "year": "الأولى" }
              ],
              "schedule": [
                { "day": "الأحد", "subject": "عربي", "time": "8:00 - 9:00" }
              ]
            }
          ]
        }
      ]
    },
    {
      "year": "الثانية",
      "classes": [
        {
          "name": "2B",
          "students": [
            {
              "id": 2,
              "fullname": "جاسر زايد",
              "password": "1234567890",
              "banned": false,
              "grades": {
                "العربية": 95,
                "الإنجليزية": 91,
                "رياضيات": 84,
                "علوم": 89
              },
              "schedule": [
                { "day": "الأحد", "subject": "عربي", "time": "8:00 - 9:00" },
                { "day": "الإثنين", "subject": "إنجليزي", "time": "9:00 - 10:00" },
                { "day": "الثلاثاء", "subject": "رياضيات", "time": "10:00 - 11:00" },
                { "day": "الأربعاء", "subject": "علوم", "time": "11:00 - 12:00" }
              ]
            }
          ],
          "teachers": [
            {
              "id": 5,
              "fullname": "محمد عادل",
              "password": "123456786",
              "banned": false,
              "isHOD": true,
              "rating": 4.8,
              "classes": [
                { "name": "2B", "year": "الثانية" },
                { "name": "3A", "year": "الثالثة" }
              ],
              "schedule": [
                { "day": "الأحد", "subject": "عربي", "time": "8:00 - 9:00" }
              ]
            }
          ]
        }
      ]
    },
    {
      "year": "الثالثة",
      "classes": [
        {
          "name": "3A",
          "students": [
            {
              "id": 7,
              "fullname": "لامار حسن",
              "password": "987654321",
              "banned": false,
              "grades": {
                "العربية": 89,
                "الإنجليزية": 85,
                "رياضيات": 90,
                "علوم": 93
              },
              "schedule": [
                { "day": "الأحد", "subject": "عربي", "time": "8:00 - 9:00" },
                { "day": "الإثنين", "subject": "إنجليزي", "time": "9:00 - 10:00" },
                { "day": "الثلاثاء", "subject": "رياضيات", "time": "10:00 - 11:00" },
                { "day": "الأربعاء", "subject": "علوم", "time": "11:00 - 12:00" }
              ]
            }
          ],
          "teachers": []
        }
      ]
    }
  ]
},
{
  "section": "فزياء",
  "years": [
    {
      "year": "الأولى",
      "classes": [
        {
          "name": "1A",
          "students": [
            {
              "id": 3,
              "fullname": "مالك عمرو",
              "password": "123456789002",
              "banned": false,
              "grades": {
                "العربية": 87,
                "الإنجليزية": 90,
                "رياضيات": 92,
                "علوم": 94
              },
              "schedule": [
                { "day": "الأحد", "subject": "فزياء", "time": "8:00 - 9:00" },
                { "day": "الإثنين", "subject": "رياضيات", "time": "9:00 - 10:00" },
                { "day": "الثلاثاء", "subject": "عربي", "time": "10:00 - 11:00" },
                { "day": "الأربعاء", "subject": "إنجليزي", "time": "11:00 - 12:00" }
              ]
            }
          ],
          "teachers": []
        }
      ]
    },
    {
      "year": "الثانية",
      "classes": [
        {
          "name": "2A",
          "students": [
            {
              "id": 8,
              "fullname": "نور أحمد",
              "password": "1122334455",
              "banned": false,
              "grades": {
                "العربية": 85,
                "الإنجليزية": 80,
                "رياضيات": 95,
                "علوم": 97
              },
              "schedule": [
                { "day": "الأحد", "subject": "فزياء", "time": "8:00 - 9:00" },
                { "day": "الإثنين", "subject": "رياضيات", "time": "9:00 - 10:00" },
                { "day": "الثلاثاء", "subject": "عربي", "time": "10:00 - 11:00" },
                { "day": "الأربعاء", "subject": "إنجليزي", "time": "11:00 - 12:00" }
              ]
            }
          ],
          "teachers": [
            {
              "id": 4,
              "fullname": "محمد صلاح",
              "password": "123456785",
              "banned": false,
              "isHOD": false,
              "rating": 4.2,
              "classes": [
                { "name": "1A", "year": "الأولى" },
                { "name": "2A", "year": "الثانية" }
              ],
              "schedule": [
                { "day": "الأحد", "subject": "فزياء", "time": "8:00 - 9:00" }
              ]
            }
          ]
        }
      ]
    },
    {
      "year": "الثالثة",
      "classes": [
        {
          "name": "3B",
          "students": [
            {
              "id": 10,
              "fullname": "لُجين عمر",
              "password": "5566778899",
              "banned": false,
              "grades": {
                "العربية": 88,
                "الإنجليزية": 91,
                "رياضيات": 90,
                "علوم": 96
              },
              "schedule": [
                { "day": "الأحد", "subject": "فزياء", "time": "8:00 - 9:00" },
                { "day": "الإثنين", "subject": "رياضيات", "time": "9:00 - 10:00" },
                { "day": "الثلاثاء", "subject": "عربي", "time": "10:00 - 11:00" },
                { "day": "الأربعاء", "subject": "إنجليزي", "time": "11:00 - 12:00" }
              ]
            }
          ],
          "teachers": [
            {
              "id": 12,
              "fullname": "يوسف محمود",
              "password": "22334455",
              "banned": false,
              "isHOD": true,
              "rating": 4.9,
              "classes": [
                { "name": "3B", "year": "الثالثة" }
              ],
              "schedule": [
                { "day": "الأحد", "subject": "فزياء", "time": "8:00 - 9:00" }
              ]
            }
          ]
        }
      ]
    }
  ]
},
{
  "section": "manager",
  "users": [
    {
      "id": 6,
      "fullname": "أحمد حاتم",
      "password": "1234567877",
      "banned": false
    }
  ]
}
]
;
export default function handler(req, res) {
  res.status(200).json(users);
}
