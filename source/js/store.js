/* Data layer: all data lives in the browser (localStorage). SAMPLE DATA ONLY. */
const Store = (() => {
  const KEY = "mhwa_prototype_v3";
  const p2 = (n) => String(n).padStart(2, "0");
  const today = (offset = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.getFullYear() + "-" + p2(d.getMonth() + 1) + "-" + p2(d.getDate());
  };
  const dates = (n) => Array.from({ length: n }, (_, i) => today(-i)); // today first
  const nowIso = () => new Date().toISOString();

  const seed = () => ({
    users: [
      {
        id: "2026-0001",
        name: "Sample Student",
        nickname: "sam",
        role: "student",
        password: "student123",
      },
      {
        id: "2026-0002",
        name: "Juan Sample",
        nickname: "juan",
        role: "student",
        password: "student123",
      },
      {
        id: "2026-0003",
        name: "Maria Sample",
        nickname: "mia",
        role: "student",
        password: "student123",
      },
      {
        id: "clinic01",
        name: "Nurse Sample (Clinic)",
        nickname: "clinic",
        role: "clinic",
        password: "clinic123",
      },
    ],
    moods: [
      {
        id: 1,
        studentId: "2026-0001",
        mood: "Happy",
        date: today(-5),
        notes: "Good day in class",
      },
      {
        id: 2,
        studentId: "2026-0001",
        mood: "Okay",
        date: today(-4),
        notes: "",
      },
      {
        id: 3,
        studentId: "2026-0001",
        mood: "Stressed",
        date: today(-3),
        notes: "Many deadlines",
      },
      {
        id: 4,
        studentId: "2026-0001",
        mood: "Sad",
        date: today(-2),
        notes: "",
      },
      {
        id: 5,
        studentId: "2026-0001",
        mood: "Okay",
        date: today(-1),
        notes: "Felt better after lunch",
      },
      {
        id: 6,
        studentId: "2026-0002",
        mood: "Stressed",
        date: today(-2),
        notes: "",
      },
      {
        id: 7,
        studentId: "2026-0002",
        mood: "Sad",
        date: today(-1),
        notes: "",
      },
      { id: 8, studentId: "2026-0003", mood: "Okay", date: today(), notes: "" },
    ],
    concerns: [
      {
        id: 1,
        code: "MH-1001",
        studentId: null,
        message:
          "I have trouble sleeping because of my thesis and I feel anxious every morning.",
        date: today(-3),
        status: "New",
        response: "",
      },
      {
        id: 2,
        code: "MH-1002",
        studentId: "2026-0002",
        message:
          "I feel overwhelmed with schoolwork and would like to talk to someone.",
        date: today(-2),
        status: "Reviewed",
        response:
          "Thank you for reaching out. Please visit the clinic any weekday so we can talk in private.",
      },
      {
        id: 3,
        code: "MH-1003",
        studentId: null,
        message: "I have been feeling very lonely lately.",
        date: today(-1),
        status: "Needs Follow-up",
        response: "",
      },
    ],
    resources: [
      {
        id: 1,
        title: "Stress Management Tips",
        type: "Tip",
        description:
          "Break big tasks into small steps.\nPlan your day and take short breaks.\nDrink water, eat on time, and sleep 7-8 hours.\nAvoid cramming at night.\nTalk to someone you trust when things feel heavy.",
        contact: "",
      },
      {
        id: 2,
        title: "Deep Breathing Exercise",
        type: "Activity",
        description:
          "Breathe in slowly, then breathe out slowly. Follow the circle below and repeat for one minute.",
        contact: "",
      },
      {
        id: 3,
        title: "Grounding: 5-4-3-2-1",
        type: "Activity",
        description:
          "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This helps calm racing thoughts.",
        contact: "",
      },
      {
        id: 4,
        title: "Mental Wellness Information",
        type: "Information",
        description:
          "Mental wellness means taking care of your emotions, thoughts and relationships. Feeling stressed or sad sometimes is normal. If it lasts for weeks or affects your studies, sleep or appetite, reach out for help. This app does not diagnose; only a licensed professional can.",
        contact: "",
      },
      {
        id: 5,
        title: "Hopeline PH",
        type: "Hotline",
        description: "National mental health hotline.",
        contact: "0919-057-1553",
      },
      {
        id: 6,
        title: "Better Sleep Tips",
        type: "Tip",
        description:
          "Sleep and wake at the same time daily.\nPut your phone away 30 minutes before bed.\nAvoid coffee late in the afternoon.\nKeep your room dark and quiet.\nWrite tomorrow's to-do list so your mind can rest.",
        contact: "",
      },
      {
        id: 7,
        title: "Journaling Prompts",
        type: "Activity",
        description:
          "Write for 5 minutes about one of these:\n- Three things I am grateful for today.\n- Something that stressed me out and what I can control about it.\n- One small thing I did well this week.\n- What I would tell a friend who feels the way I do.",
        contact: "",
      },
      {
        id: 8,
        title: "Healthy Study Habits",
        type: "Tip",
        description:
          "Study in 25-minute blocks with 5-minute breaks.\nStart with the hardest task when you are fresh.\nMake a weekly plan instead of last-minute cramming.\nAsk classmates or teachers for help early.",
        contact: "",
      },
      {
        id: 9,
        title: "When to Reach Out for Help",
        type: "Information",
        description:
          "Consider talking to a professional if, for more than two weeks, you:\n- feel sad, anxious or empty most days\n- cannot sleep or sleep too much\n- lose interest in things you enjoy\n- have trouble focusing on your studies\n- want to avoid people\nIf you feel unsafe or in danger, call the hotline right away.",
        contact: "",
      },
    ],
    checks: {},
    friends: [
      {
        id: 1,
        a: "2026-0003",
        b: "2026-0001",
        status: "accepted",
        share: { "2026-0003": true, "2026-0001": false },
      },
      {
        id: 2,
        a: "2026-0002",
        b: "2026-0001",
        status: "pending",
        share: { "2026-0002": false, "2026-0001": false },
      },
    ],
    messages: [
      {
        id: 1,
        from: "2026-0003",
        to: "2026-0001",
        text: "Hi! How was your day?",
        time: nowIso(),
        read: true,
      },
      {
        id: 2,
        from: "2026-0001",
        to: "2026-0003",
        text: "Tiring but okay. Thanks for asking!",
        time: nowIso(),
        read: true,
      },
    ],
    reports: [],
    appointments: [
      {
        id: 1,
        studentId: "2026-0002",
        date: today(2),
        slot: "10:00 AM",
        reason: "I would like to talk about my school stress.",
        status: "Pending",
        note: "",
      },
      {
        id: 2,
        studentId: "2026-0001",
        date: today(3),
        slot: "2:00 PM",
        reason: "Follow-up chat about sleeping problems.",
        status: "Approved",
        note: "See you at the clinic. Bring your school ID.",
      },
    ],
    announcements: [
      {
        id: 1,
        title: "Wellness Week",
        body: "Join our free relaxation and stress management sessions at the clinic next week.",
        date: today(-1),
      },
      {
        id: 2,
        title: "Clinic hours",
        body: "The clinic is open Monday to Friday, 9:00 AM to 4:00 PM. Walk-ins are welcome.",
        date: today(-4),
      },
    ],
    quiz: {},
    exlog: [],
    gratitude: [],
    notifs: [
      {
        id: 1,
        userId: "2026-0001",
        text: "juan sent you a buddy request",
        go: "buddies",
        date: today(),
        read: false,
      },
      {
        id: 2,
        userId: "clinic01",
        text: "New appointment request from Juan Sample",
        go: "appointments",
        date: today(),
        read: false,
      },
    ],
    nextId: {
      mood: 9,
      concern: 4,
      friend: 3,
      msg: 3,
      appt: 3,
      ann: 3,
      notif: 3,
      report: 1,
      ex: 1,
      grat: 1,
    },
    session: null,
  });

  let db;
  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(db));
    } catch (e) {
      /* storage blocked */
    }
  };
  const load = () => {
    try {
      db = JSON.parse(localStorage.getItem(KEY));
    } catch (e) {
      db = null;
    }
    if (!db) {
      db = seed();
      save();
    }
    db.exlog = db.exlog || [];
    db.gratitude = db.gratitude || [];
    db.nextId.ex = db.nextId.ex || 1;
    db.nextId.grat = db.nextId.grat || 1;
  };
  load();

  const user = (id) => db.users.find((x) => x.id === id);
  const nick = (id) => {
    const u = user(id);
    return u ? u.nickname : id;
  };
  const nid = (k) => db.nextId[k]++;
  const notify = (userId, text, go) => {
    db.notifs.push({
      id: nid("notif"),
      userId,
      text,
      go,
      date: today(),
      read: false,
    });
  };
  const notifyClinic = (text, go) =>
    db.users
      .filter((u) => u.role === "clinic")
      .forEach((u) => notify(u.id, text, go));
  const relation = (a, b) =>
    db.friends.find(
      (f) => (f.a === a && f.b === b) || (f.a === b && f.b === a),
    ) || null;

  return {
    today,
    user,
    nick,
    login(id, password) {
      const u = db.users.find(
        (x) =>
          x.id.toLowerCase() === id.trim().toLowerCase() &&
          x.password === password,
      );
      if (!u) return null;
      db.session = { id: u.id, name: u.name, role: u.role };
      save();
      return db.session;
    },
    register(id, name, password, nickname) {
      id = id.trim();
      name = name.trim();
      nickname = nickname.trim();
      if (!/^[A-Za-z0-9_]{2,15}$/.test(nickname))
        return "Nickname must be 2-15 letters, numbers or underscore (no spaces).";
      if (db.users.some((x) => x.id.toLowerCase() === id.toLowerCase()))
        return "That Student ID is already registered.";
      if (
        db.users.some(
          (x) => x.nickname.toLowerCase() === nickname.toLowerCase(),
        )
      )
        return "That nickname is already taken. Please choose another.";
      db.users.push({ id, name, nickname, role: "student", password });
      save();
      return null;
    },
    logout() {
      db.session = null;
      save();
    },
    session() {
      return db.session;
    },
    reset() {
      db = seed();
      save();
    },

    // Student Moods
    saveMood(studentId, mood, notes) {
      const date = today();
      const existing = db.moods.find(
        (m) => m.studentId === studentId && m.date === date,
      );
      if (existing) {
        existing.mood = mood;
        existing.notes = notes;
      } else db.moods.push({ id: nid("mood"), studentId, mood, date, notes });
      save();
      return !!existing;
    },
    moodsFor(studentId) {
      return db.moods
        .filter((m) => m.studentId === studentId)
        .sort((a, b) => b.date.localeCompare(a.date));
    },
    todayMood(studentId) {
      return db.moods.find(
        (m) => m.studentId === studentId && m.date === today(),
      );
    },
    streak(studentId) {
      const have = new Set(
        db.moods.filter((m) => m.studentId === studentId).map((m) => m.date),
      );
      let i = have.has(today()) ? 0 : 1,
        n = 0;
      while (have.has(today(-i))) {
        n++;
        i++;
      }
      return n;
    },
    moodCounts(studentId, days) {
      const set = new Set(dates(days)),
        c = { Happy: 0, Okay: 0, Sad: 0, Stressed: 0 };
      db.moods
        .filter((m) => m.studentId === studentId && set.has(m.date))
        .forEach((m) => c[m.mood]++);
      return c;
    },
    lowMoodRun(studentId) {
      return [0, 1, 2].every((i) => {
        const m = db.moods.find(
          (x) => x.studentId === studentId && x.date === today(-i),
        );
        return m && (m.mood === "Sad" || m.mood === "Stressed");
      });
    },
    overview(days) {
      const set = new Set(dates(days)),
        c = { Happy: 0, Okay: 0, Sad: 0, Stressed: 0 };
      db.moods.filter((m) => set.has(m.date)).forEach((m) => c[m.mood]++);
      return c;
    },
    weekly(studentId) {
      const days = dates(7).reverse();
      const entries = days.map(
        (d) =>
          db.moods.find((m) => m.studentId === studentId && m.date === d) ||
          null,
      );
      const care = days.map(
        (d) => (db.checks[studentId + "|" + d] || []).length,
      );
      return {
        days,
        entries,
        counts: this.moodCounts(studentId, 7),
        checkins: entries.filter(Boolean).length,
        exercises: this.exerciseStats(studentId).week,
        careDays: care.filter((n) => n > 0).length,
        careItems: care.reduce((a, b) => a + b, 0),
      };
    },

    // Self-care checklist
    checks(studentId) {
      return db.checks[studentId + "|" + today()] || [];
    },
    toggleCheck(studentId, key) {
      const k = studentId + "|" + today(),
        cur = db.checks[k] || [];
      db.checks[k] = cur.includes(key)
        ? cur.filter((x) => x !== key)
        : cur.concat(key);
      save();
    },

    // Mental Health Concerns
    addConcern(studentId, message, anonymous) {
      let code;
      do {
        code = "MH-" + (1000 + Math.floor(Math.random() * 9000));
      } while (db.concerns.some((c) => c.code === code));
      db.concerns.push({
        id: nid("concern"),
        code,
        studentId: anonymous ? null : studentId,
        message,
        date: today(),
        status: "New",
        response: "",
      });
      notifyClinic("New concern submitted (" + code + ")", "concerns");
      save();
      return code;
    },
    concerns() {
      return db.concerns.slice().sort((a, b) => b.id - a.id);
    },
    myConcerns(studentId) {
      return db.concerns
        .filter((c) => c.studentId === studentId)
        .sort((a, b) => b.id - a.id);
    },
    byCode(code) {
      return (
        db.concerns.find(
          (c) => c.code.toLowerCase() === code.trim().toLowerCase(),
        ) || null
      );
    },
    setStatus(id, status) {
      const c = db.concerns.find((x) => x.id === id);
      if (c) {
        c.status = status;
        save();
      }
    },
    respond(id, text) {
      const c = db.concerns.find((x) => x.id === id);
      if (!c) return;
      c.response = text;
      if (c.status === "New") c.status = "Reviewed";
      if (c.studentId)
        notify(
          c.studentId,
          "The clinic replied to your concern " + c.code,
          "concerns",
        );
      save();
    },
    studentName(id) {
      const u = user(id);
      return u ? u.name : id;
    },

    // Wellness Resources
    resources() {
      return db.resources;
    },

    // Buddies
    search(me, q) {
      q = q.trim().toLowerCase();
      if (!q) return [];
      return db.users
        .filter(
          (u) =>
            u.role === "student" &&
            u.id !== me &&
            (u.nickname.toLowerCase().includes(q) || u.id.toLowerCase() === q),
        )
        .slice(0, 8);
    },
    relation,
    sendRequest(me, other) {
      if (relation(me, other))
        return "You already have a request or buddy with this person.";
      db.friends.push({
        id: nid("friend"),
        a: me,
        b: other,
        status: "pending",
        share: { [me]: false, [other]: false },
      });
      notify(other, nick(me) + " sent you a buddy request", "buddies");
      save();
      return null;
    },
    respondRequest(frId, accept) {
      const f = db.friends.find((x) => x.id === frId);
      if (!f) return;
      if (accept) {
        f.status = "accepted";
        notify(f.a, nick(f.b) + " accepted your buddy request", "buddies");
      } else db.friends = db.friends.filter((x) => x.id !== frId);
      save();
    },
    removeBuddy(frId) {
      const f = db.friends.find((x) => x.id === frId);
      if (!f) return;
      db.messages = db.messages.filter(
        (m) =>
          !(
            (m.from === f.a && m.to === f.b) ||
            (m.from === f.b && m.to === f.a)
          ),
      );
      db.friends = db.friends.filter((x) => x.id !== frId);
      save();
    },
    setShare(frId, me, val) {
      const f = db.friends.find((x) => x.id === frId);
      if (f) {
        f.share[me] = !!val;
        save();
      }
    },
    buddies(me) {
      return db.friends
        .filter((f) => f.status === "accepted" && (f.a === me || f.b === me))
        .map((f) => ({ fr: f, other: user(f.a === me ? f.b : f.a) }));
    },
    incoming(me) {
      return db.friends
        .filter((f) => f.status === "pending" && f.b === me)
        .map((f) => ({ fr: f, other: user(f.a) }));
    },
    outgoing(me) {
      return db.friends
        .filter((f) => f.status === "pending" && f.a === me)
        .map((f) => ({ fr: f, other: user(f.b) }));
    },
    buddyMood(me, other) {
      // visible only if the buddy chose to share
      const f = relation(me, other);
      if (!f || f.status !== "accepted") return { shared: false };
      if (!f.share[other]) return { shared: false };
      return { shared: true, mood: this.todayMood(other) || null };
    },
    messagesBetween(a, b) {
      return db.messages.filter(
        (m) => (m.from === a && m.to === b) || (m.from === b && m.to === a),
      );
    },
    sendMessage(from, to, text) {
      db.messages.push({
        id: nid("msg"),
        from,
        to,
        text,
        time: nowIso(),
        read: false,
      });
      notify(to, "New message from " + nick(from), "buddies");
      save();
    },
    unreadFrom(me, other) {
      return db.messages.filter(
        (m) => m.to === me && m.from === other && !m.read,
      ).length;
    },
    markRead(me, other) {
      db.messages.forEach((m) => {
        if (m.to === me && m.from === other) m.read = true;
      });
      save();
    },
    report(me, other) {
      db.reports.push({
        id: nid("report"),
        reporter: me,
        reported: other,
        date: today(),
      });
      notifyClinic(
        "A buddy chat was reported: " + nick(me) + " reported " + nick(other),
        "concerns",
      );
      save();
    },

    // Appointments
    addAppointment(studentId, date, slot, reason) {
      db.appointments.push({
        id: nid("appt"),
        studentId,
        date,
        slot,
        reason,
        status: "Pending",
        note: "",
      });
      notifyClinic(
        "New appointment request from " + this.studentName(studentId),
        "appointments",
      );
      save();
    },
    appointmentsFor(sid) {
      return db.appointments
        .filter((a) => a.studentId === sid)
        .sort((a, b) => (b.date + b.slot).localeCompare(a.date + a.slot));
    },
    allAppointments() {
      return db.appointments
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date) || b.id - a.id);
    },
    slotTaken(date, slot, exceptId) {
      return db.appointments.some(
        (a) =>
          a.id !== exceptId &&
          a.date === date &&
          a.slot === slot &&
          (a.status === "Approved" || a.status === "Rescheduled"),
      );
    },
    updateAppointment(id, patch) {
      const a = db.appointments.find((x) => x.id === id);
      if (!a) return;
      Object.assign(a, patch);
      if (patch.status && patch.status !== "Cancelled")
        notify(
          a.studentId,
          "Your appointment was " +
            patch.status.toLowerCase() +
            " (" +
            a.date +
            ", " +
            a.slot +
            ")",
          "visits",
        );
      save();
    },

    // Announcements
    announcements() {
      return db.announcements.slice().sort((a, b) => b.id - a.id);
    },
    addAnnouncement(title, body) {
      db.announcements.push({ id: nid("ann"), title, body, date: today() });
      db.users
        .filter((u) => u.role === "student")
        .forEach((u) => notify(u.id, "New announcement: " + title, "home"));
      save();
    },
    deleteAnnouncement(id) {
      db.announcements = db.announcements.filter((a) => a.id !== id);
      save();
    },

    // Notifications
    notifsFor(uid) {
      return db.notifs
        .filter((n) => n.userId === uid)
        .sort((a, b) => b.id - a.id);
    },
    unread(uid) {
      return db.notifs.filter((n) => n.userId === uid && !n.read).length;
    },
    markNotif(id) {
      const n = db.notifs.find((x) => x.id === id);
      if (n) {
        n.read = true;
        save();
      }
    },
    markAllNotifs(uid) {
      db.notifs.forEach((n) => {
        if (n.userId === uid) n.read = true;
      });
      save();
    },

    // Wellness exercises
    logExercise(sid, exId, title, mins) {
      db.exlog.push({
        id: nid("ex"),
        studentId: sid,
        exId,
        title,
        mins,
        date: today(),
      });
      save();
    },
    exerciseStats(sid) {
      const wk = new Set(dates(7)),
        mine = db.exlog.filter((e) => e.studentId === sid),
        w = mine.filter((e) => wk.has(e.date));
      return {
        today: mine.filter((e) => e.date === today()).length,
        week: w.length,
        minutes: w.reduce((a, e) => a + e.mins, 0),
        total: mine.length,
      };
    },
    recentExercises(sid, n) {
      return db.exlog
        .filter((e) => e.studentId === sid)
        .sort((a, b) => b.id - a.id)
        .slice(0, n);
    },
    addGratitude(sid, items) {
      db.gratitude.push({
        id: nid("grat"),
        studentId: sid,
        date: today(),
        items,
      });
      save();
    },
    gratitudeFor(sid) {
      return db.gratitude
        .filter((g) => g.studentId === sid)
        .sort((a, b) => b.id - a.id);
    },

    // Stress self-check (result only)
    saveQuiz(sid, score, level) {
      db.quiz[sid] = { date: today(), score, level };
      save();
    },
    lastQuiz(sid) {
      return db.quiz[sid] || null;
    },
  };
})();
