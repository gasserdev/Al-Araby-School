import { users } from './users';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const newUser = req.body;

    const lastUserId = Math.max(...users.flatMap(sec => {
      if(sec.users) return sec.users.map(u => u.id);
      if(sec.years) return sec.years.flatMap(y => y.classes.flatMap(c => [...c.students.map(s => s.id), ...c.teachers.map(t => t.id)]));
      return [];
    }));
    newUser.id = lastUserId + 1;

    if(newUser.role === 'student') {
      const section = users.find(s => s.section === newUser.section);
      if(!section) return res.status(400).json({error: 'Section not found'});
      const year = section.years.find(y => y.year === newUser.year);
      if(!year) return res.status(400).json({error: 'Year not found'});
      const classObj = year.classes.find(c => c.name === newUser.class);
      if(!classObj) return res.status(400).json({error: 'Class not found'});

      classObj.students.push(newUser);
    } else if(newUser.role === 'teacher') {
      const section = users.find(s => s.section === newUser.section);
      if(!section) return res.status(400).json({error: 'Section not found'});
      newUser.classes.forEach(cls => {
        const year = section.years.find(y => y.year === cls.year);
        if(year) {
          const classObj = year.classes.find(c => c.name === cls.name);
          if(classObj) classObj.teachers.push(newUser);
        }
      });
    } else if(newUser.role === 'manager') {
      const managerSection = users.find(s => s.section === 'manager');
      managerSection.users.push(newUser);
    }

    return res.status(201).json(newUser);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
