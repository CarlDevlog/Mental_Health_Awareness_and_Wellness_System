/* UI + logic. Sections: helpers, login/sign up, student screens, clinic screens, router. */
const $app = document.getElementById("app");
const MOODS = [
  { name: "Happy", cls: "happy", em: "😊" },
  { name: "Okay", cls: "okay", em: "😐" },
  { name: "Sad", cls: "sad", em: "😔" },
  { name: "Stressed", cls: "stressed", em: "😣" },
];
const MOOD_COLOR = {
  Happy: "#f5d94e",
  Okay: "#7fc4f5",
  Sad: "#a995f0",
  Stressed: "#f08a8a",
};
const MOOD_EM = { Happy: "😊", Okay: "😐", Sad: "😔", Stressed: "😣" };
const CHECKLIST = [
  ["water", "💧", "Drink enough water"],
  ["sleep", "😴", "Get enough sleep"],
  ["move", "🚶", "Move or stretch"],
  ["meal", "🍚", "Eat a proper meal"],
  ["talk", "🗣️", "Talk to someone I trust"],
];
const DAILY_TIPS = [
  "It is okay to take a break. Rest is part of being productive.",
  "Small steps count. Finish one task, then take a breath.",
  "Talking to someone you trust can make a heavy day lighter.",
  "Drink water and stretch. Your body and mind are connected.",
  "You do not have to be perfect. Progress is enough.",
  "Write down three things you are grateful for today.",
  "Take 5 slow breaths before starting your next task.",
  "Comparing yourself to others rarely helps. Focus on your own pace.",
  "Getting enough sleep makes problems feel smaller.",
  "Asking for help is a sign of strength, not weakness.",
];
const SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
];
const QUIZ = [
  "I felt overwhelmed by schoolwork.",
  "I had trouble sleeping.",
  "I felt nervous or on edge.",
  "I found it hard to focus on my studies.",
  "I felt down or lost interest in things I enjoy.",
  "I avoided friends or family.",
];
const QUIZ_OPTS = ["Never", "Sometimes", "Often", "Almost always"];
const CRISIS = [
  "kill myself",
  "suicide",
  "end my life",
  "want to die",
  "ayoko na",
  "magpakamatay",
  "hurt myself",
  "self-harm",
  "no reason to live",
];
const HOTLINE = "0919-057-1553";
const EXERCISES = [
  {
    id: "box",
    title: "Box Breathing",
    icon: "🟦",
    circle: true,
    desc: "Breathe in, hold, breathe out, hold, each for 4 seconds. Helps calm stress and refocus before class or exams.",
    gen: {
      phases: [
        ["Breathe in", 4, "in"],
        ["Hold", 4, null],
        ["Breathe out", 4, "out"],
        ["Hold", 4, null],
      ],
      cycles: 7,
    },
  },
  {
    id: "478",
    title: "4-7-8 Breathing",
    icon: "🌬️",
    circle: true,
    desc: "Breathe in for 4, hold for 7, breathe out for 8. Good when you feel anxious or before sleep.",
    gen: {
      phases: [
        ["Breathe in", 4, "in"],
        ["Hold", 7, null],
        ["Breathe out", 8, "out"],
      ],
      cycles: 5,
    },
  },
  {
    id: "pmr",
    title: "Muscle Relaxation",
    icon: "💪",
    desc: "Tense and release muscle groups one by one to let go of body tension.",
    steps: [
      {
        title: "Hands",
        text: "Make tight fists for 5 seconds, then slowly open and relax your hands.",
        sec: 30,
      },
      {
        title: "Arms",
        text: "Bend your elbows and tense your arms for 5 seconds, then let them drop and relax.",
        sec: 30,
      },
      {
        title: "Shoulders",
        text: "Lift your shoulders up to your ears for 5 seconds, then drop them gently.",
        sec: 30,
      },
      {
        title: "Face",
        text: "Scrunch your face tightly for 5 seconds, then relax your forehead, eyes and jaw.",
        sec: 30,
      },
      {
        title: "Stomach",
        text: "Tighten your stomach muscles for 5 seconds, then release and breathe slowly.",
        sec: 30,
      },
      {
        title: "Legs and feet",
        text: "Press your feet down and tense your legs for 5 seconds, then relax completely.",
        sec: 30,
      },
    ],
  },
  {
    id: "stretch",
    title: "Neck and Shoulder Stretch",
    icon: "🤸",
    desc: "Gentle stretches for tension from long study hours. Move slowly and stop if anything hurts.",
    steps: [
      {
        title: "Neck tilt right",
        text: "Sit tall. Slowly tilt your right ear toward your right shoulder. Breathe.",
        sec: 20,
      },
      {
        title: "Neck tilt left",
        text: "Slowly tilt your left ear toward your left shoulder. Breathe.",
        sec: 20,
      },
      {
        title: "Shoulder rolls back",
        text: "Roll both shoulders slowly backward in big circles.",
        sec: 30,
      },
      {
        title: "Shoulder rolls forward",
        text: "Roll both shoulders slowly forward in big circles.",
        sec: 30,
      },
      {
        title: "Chest opener",
        text: "Clasp your hands behind your back and gently lift them while opening your chest.",
        sec: 30,
      },
      {
        title: "Forward fold",
        text: "Sitting, let your head and arms hang forward. Relax your neck.",
        sec: 30,
      },
    ],
  },
  {
    id: "scan",
    title: "Body Scan Meditation",
    icon: "🧘",
    desc: "Slowly notice how each part of your body feels, without judging.",
    steps: [
      {
        title: "Settle in",
        text: "Sit or lie down comfortably. Close your eyes and take three slow breaths.",
        sec: 20,
      },
      {
        title: "Feet and legs",
        text: "Notice your feet and legs. Feel the weight and any tension. Let it soften.",
        sec: 40,
      },
      {
        title: "Belly and chest",
        text: "Notice your breathing in your belly and chest. No need to change it.",
        sec: 40,
      },
      {
        title: "Arms and hands",
        text: "Notice your shoulders, arms and hands. Let them feel heavy and loose.",
        sec: 30,
      },
      {
        title: "Face and head",
        text: "Relax your jaw, eyes and forehead. Soften your whole face.",
        sec: 30,
      },
      {
        title: "Whole body",
        text: "Feel your whole body at rest. Take a deep breath and slowly open your eyes.",
        sec: 20,
      },
    ],
  },
  {
    id: "ground",
    title: "Grounding 5-4-3-2-1",
    icon: "🌿",
    desc: "Use your five senses to come back to the present when thoughts are racing.",
    steps: [
      {
        title: "5 things you can SEE",
        text: "Look around and name five things you can see.",
        sec: 24,
      },
      {
        title: "4 things you can TOUCH",
        text: "Notice four things you can feel, like your clothes or the chair.",
        sec: 24,
      },
      {
        title: "3 things you can HEAR",
        text: "Listen for three sounds near and far.",
        sec: 24,
      },
      {
        title: "2 things you can SMELL",
        text: "Notice two scents around you, or recall two favorite smells.",
        sec: 24,
      },
      {
        title: "1 thing you can TASTE",
        text: "Notice one taste in your mouth. Take a slow, deep breath.",
        sec: 24,
      },
    ],
  },
  {
    id: "mind1",
    title: "Mindful Minute",
    icon: "🕯️",
    circle: true,
    desc: "One quiet minute. Just breathe and notice, with nothing else to do.",
    steps: [
      {
        title: "Just breathe",
        text: "Sit comfortably. Focus on your breath. When your mind wanders, gently bring it back.",
        sec: 60,
      },
    ],
  },
  {
    id: "mind3",
    title: "Mindful Pause (3 min)",
    icon: "🌅",
    circle: true,
    desc: "Three quiet minutes to pause between classes or study sessions.",
    steps: [
      {
        title: "Pause and breathe",
        text: "Sit comfortably. Breathe slowly. Notice sounds, then your breath. Be kind to yourself.",
        sec: 180,
      },
    ],
  },
];
function exSteps(ex) {
  if (ex.steps) return ex.steps;
  const out = [];
  for (let c = 1; c <= ex.gen.cycles; c++)
    ex.gen.phases.forEach((ph) =>
      out.push({
        title: ph[0],
        text: "Round " + c + " of " + ex.gen.cycles,
        sec: ph[1],
        anim: ph[2],
      }),
    );
  return out;
}
const exMins = (ex) =>
  Math.max(1, Math.round(exSteps(ex).reduce((a, x) => a + x.sec, 0) / 60));

let tab = "home",
  clinicTab = "concerns",
  selectedMood = null,
  openResource = null,
  filter = "All",
  apFilter = "All",
  query = "";
let breathTimer = null,
  authMode = "login",
  lastCode = null,
  codeResult = undefined;
let run = null,
  runTimer = null;
let openChat = null,
  buddyQuery = "",
  chatAlert = false,
  showReport = false,
  quizResult = null;
const _t = new Date();
let calY = _t.getFullYear(),
  calM = _t.getMonth(),
  calSel = null;

const p2 = (n) => String(n).padStart(2, "0");
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const fmt = (d) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
const fmtTime = (iso) =>
  new Date(iso).toLocaleTimeString("en-PH", {
    hour: "numeric",
    minute: "2-digit",
  });
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2800);
}
function stopRun() {
  clearInterval(runTimer);
  runTimer = null;
}
function openExercise(id) {
  tab = "help";
  openResource = "ex:" + id;
  stopRun();
  run = null;
  render();
  window.scrollTo(0, 0);
}
function go(t) {
  tab = t;
  openResource = null;
  openChat = null;
  showReport = false;
  stopBreath();
  stopRun();
  run = null;
  render();
  window.scrollTo(0, 0);
}

function header(user) {
  const n = user ? Store.unread(user.id) : 0;
  return `<header class="top noprint"><span class="logo">💚</span><h1>Mental Health &amp; Wellness App</h1>
  ${
    user
      ? `<span class="who">${esc(user.name)}</span><button class="bell" id="bellBtn" aria-label="Notifications">🔔${n ? `<span class="badge">${n}</span>` : ""}</button>
  <button class="menu-btn" id="menuBtn" aria-label="Menu">☰</button>
  <div class="menu" id="menu"><div>${esc(user.name)}<br><small>${user.role === "clinic" ? "Clinic Personnel" : "Student · @" + esc(Store.user(user.id).nickname)} · ${esc(user.id)}</small></div>
  <button id="logoutBtn">Log out</button></div>`
      : ""
  }</header>`;
}
function bindHeader(user) {
  const b = document.getElementById("menuBtn");
  if (!b) return;
  b.onclick = (e) => {
    e.stopPropagation();
    document.getElementById("menu").classList.toggle("open");
  };
  document.onclick = () => {
    const m = document.getElementById("menu");
    if (m) m.classList.remove("open");
  };
  document.getElementById("bellBtn").onclick = () => {
    if (user.role === "clinic") {
      clinicTab = "notifs";
      render();
    } else go("notifs");
  };
  document.getElementById("logoutBtn").onclick = () => {
    closeCalm();
    stopRun();
    run = null;
    Store.logout();
    tab = "home";
    clinicTab = "concerns";
    selectedMood = null;
    authMode = "login";
    lastCode = null;
    codeResult = undefined;
    openChat = null;
    showReport = false;
    quizResult = null;
    buddyQuery = "";
    calSel = null;
    render();
  };
}

/* ---------- Breathing helper (used by Help page and Quick calm) ---------- */
function stopBreath() {
  clearInterval(breathTimer);
  breathTimer = null;
}
function bindBreath(btnId, circleId) {
  const bb = document.getElementById(btnId);
  if (!bb) return;
  bb.onclick = () => {
    const el = document.getElementById(circleId);
    if (breathTimer) {
      stopBreath();
      bb.textContent = "Start";
      el.textContent = "Press Start";
      el.classList.remove("in");
      return;
    }
    bb.textContent = "Stop";
    let inhale = true;
    const step = () => {
      el.classList.toggle("in", inhale);
      el.textContent = inhale ? "Breathe in..." : "Breathe out...";
      inhale = !inhale;
    };
    step();
    breathTimer = setInterval(step, 4000);
  };
}

/* ---------- Quick calm ("Need help now") ---------- */
function closeCalm() {
  stopBreath();
  const m = document.getElementById("modal");
  if (m) m.remove();
}
function openCalm() {
  closeCalm();
  const m = document.createElement("div");
  m.className = "modal";
  m.id = "modal";
  m.innerHTML = `<div class="sheet"><button class="close" id="mClose" aria-label="Close">✕</button>
  <h2 style="font-size:22px">You are not alone 💚</h2><p class="muted">Take a slow breath with the circle.</p>
  <div class="breath" id="mBreath">Press Start</div><button class="btn" id="mBreathBtn" style="max-width:260px;margin:10px auto">Start</button>
  <p class="muted" style="text-align:center">Grounding: name 5 things you can see, 4 you can touch, 3 you can hear.</p>
  <div class="hotline"><b>Need to talk to someone now?</b><div class="num">📞 ${HOTLINE}</div><span class="muted">Hopeline PH. If you are in danger, call right away.</span></div>
  <button class="btn ghost" id="mConcern">Send a concern to the clinic</button></div>`;
  document.body.appendChild(m);
  m.onclick = (e) => {
    if (e.target === m) closeCalm();
  };
  document.getElementById("mClose").onclick = closeCalm;
  document.getElementById("mConcern").onclick = () => {
    closeCalm();
    go("concerns");
  };
  bindBreath("mBreathBtn", "mBreath");
}

/* ---------- Login / Sign up ---------- */
function renderLogin() {
  const su = authMode === "signup";
  $app.innerHTML =
    header(null) +
    `<main class="login"><div class="logo">💚</div><h2>${su ? "Create your student account" : "Welcome! Please log in"}</h2>
  <form id="loginForm" autocomplete="off">
    ${su ? '<label for="nm">Full Name</label><input type="text" id="nm" required><label for="nk">Nickname (buddies will see this)</label><input type="text" id="nk" required maxlength="15" placeholder="e.g. mia_23">' : ""}
    <label for="uid">${su ? "Student ID" : "Student ID / Username"}</label><input type="text" id="uid" required>
    <label for="pw">Password</label><input type="password" id="pw" required minlength="${su ? 6 : 1}">
    ${su ? '<label for="pw2">Confirm Password</label><input type="password" id="pw2" required>' : ""}
    <button class="btn" type="submit">${su ? "Sign Up" : "Log In"}</button><div class="err" id="err"></div>
  </form>
  <p style="text-align:center">${su ? "Already have an account?" : "Don't have an account?"} <a href="#" id="switchAuth" style="color:var(--green-700);font-weight:700">${su ? "Log in" : "Sign up"}</a></p>
  ${
    su
      ? '<div class="demo">Use a fake ID and password for this prototype. Do not enter real passwords.</div>'
      : `<div class="demo"><b>Sample accounts (fictional)</b><br>Student: 2026-0001 / student123 (nickname sam)<br>Other students: 2026-0002 (juan), 2026-0003 (mia), same password<br>Clinic: clinic01 / clinic123</div>
  <button class="btn ghost" id="resetBtn" style="font-size:13px;padding:8px">Reset sample data</button>`
  }</main>`;
  const err = (m) => (document.getElementById("err").textContent = m);
  document.getElementById("switchAuth").onclick = (e) => {
    e.preventDefault();
    authMode = su ? "login" : "signup";
    renderLogin();
  };
  document.getElementById("loginForm").onsubmit = (e) => {
    e.preventDefault();
    const id = document.getElementById("uid").value,
      pw = document.getElementById("pw").value;
    if (su) {
      if (pw !== document.getElementById("pw2").value)
        return err("Passwords do not match.");
      const msg = Store.register(
        id,
        document.getElementById("nm").value,
        pw,
        document.getElementById("nk").value,
      );
      if (msg) return err(msg);
      Store.login(id, pw);
      toast("Account created. Welcome!");
      tab = "home";
      render();
      return;
    }
    if (!Store.login(id, pw))
      return err("Incorrect ID or password. Please try again.");
    tab = "home";
    clinicTab = "concerns";
    render();
  };
  const rb = document.getElementById("resetBtn");
  if (rb)
    rb.onclick = () => {
      Store.reset();
      toast("Sample data restored");
    };
}

/* ---------- Student shell ---------- */
function studentShell(user, body) {
  const tabs = [
    ["home", "🏠", "Home"],
    ["mood", "🙂", "Mood"],
    ["concerns", "💬", "Concerns"],
    ["buddies", "🤝", "Buddies"],
    ["visits", "📅", "Visits"],
    ["help", "📖", "Help"],
  ];
  $app.innerHTML =
    header(user) +
    `<div class="shell"><main><div class="content">${body}</div></main><nav class="bottom noprint">${tabs
      .map(
        (t) =>
          `<button data-tab="${t[0]}" class="${tab === t[0] ? "active" : ""}"><span>${t[1]}</span>${t[2]}</button>`,
      )
      .join("")}</nav></div>
  <button class="fab noprint" id="fab">🆘 <span>Need help now</span></button>`;
  document
    .querySelectorAll("nav.bottom button")
    .forEach((b) => (b.onclick = () => go(b.dataset.tab)));
  document.getElementById("fab").onclick = openCalm;
  bindHeader(user);
}
function statusPill(s) {
  const cls =
    {
      New: "new",
      Pending: "new",
      Reviewed: "rev",
      Approved: "ok",
      Rescheduled: "rev",
      "Needs Follow-up": "fu",
      Declined: "fu",
      Cancelled: "gray",
    }[s] || "rev";
  return `<span class="pill ${cls}">${esc(s)}</span>`;
}

/* ---------- Student: Home ---------- */
function studentHome(user) {
  const t = Store.todayMood(user.id);
  if (selectedMood === null && t) selectedMood = t.mood;
  const checks = Store.checks(user.id),
    streak = Store.streak(user.id);
  const dayNo = Math.floor(new Date().setHours(0, 0, 0, 0) / 864e5);
  const anns = Store.announcements().slice(0, 2);
  studentShell(
    user,
    `<h2>Welcome, ${esc(user.name.split(" ")[0])}!</h2><p class="sub">How are you feeling today?</p>
  ${!t ? '<div class="nudge">⏰ Daily reminder: you have not checked in today. Pick your mood below.</div>' : ""}
  ${Store.lowMoodRun(user.id) ? `<div class="nudge">💛 You have felt down for a few days in a row. You are not alone. You can <a href="#" data-go="concerns">send a concern</a>, <a href="#" data-go="visits">request an appointment</a> or <a href="#" data-go="help">open wellness support</a>.</div>` : ""}
  ${anns.map((a) => `<div class="nudge ann">📢 <b>${esc(a.title)}</b> <span class="muted">· ${fmt(a.date)}</span><br>${esc(a.body)}</div>`).join("")}
  <div class="grid2"><section>
    <div class="mood-grid">${MOODS.map((m) => `<button class="mood ${m.cls} ${selectedMood === m.name ? "selected" : ""}" data-mood="${m.name}"><span class="em">${m.em}</span>${m.name}</button>`).join("")}</div>
    <label for="notes">Optional note</label><textarea id="notes" style="min-height:70px" placeholder="Anything you want to remember about today?">${t ? esc(t.notes) : ""}</textarea>
    <button class="btn" id="saveMood">Save My Mood</button>
    ${t ? `<p class="muted" style="text-align:center">Today's mood saved: <b>${esc(t.mood)}</b>. You can change it anytime today.</p>` : ""}
  </section><section>
    <div class="card tipcard"><b>💡 Tip of the day</b><p style="margin:6px 0 0">${DAILY_TIPS[dayNo % DAILY_TIPS.length]}</p></div>
    ${(() => {
      const sg =
        { Stressed: "box", Sad: "gratitude", Okay: "stretch", Happy: "mind1" }[
          (t && t.mood) || selectedMood
        ] || "mind1";
      const e = EXERCISES.find((x) => x.id === sg);
      const nm = e ? e.title : "Gratitude Journal",
        ic = e ? e.icon : "📓";
      return `<div class="card"><b>🧘 Try this today</b><p style="margin:6px 0">${ic} ${nm}</p><button class="btn small" data-ex="${sg}">Start</button></div>`;
    })()}
    <div class="card"><b>🔥 Check-in streak</b><p style="margin:6px 0 0"><span class="big">${streak}</span> day${streak === 1 ? "" : "s"} in a row</p></div>
    <div class="card"><b>🌱 Today's self-care</b> <span class="muted" id="careCount">${checks.length}/${CHECKLIST.length} done</span>
      ${CHECKLIST.map((c) => `<label class="check small"><input type="checkbox" data-care="${c[0]}" ${checks.includes(c[0]) ? "checked" : ""}> ${c[1]} ${c[2]}</label>`).join("")}</div>
  </section></div>`,
  );
  document.querySelectorAll(".mood").forEach(
    (b) =>
      (b.onclick = () => {
        selectedMood = b.dataset.mood;
        document
          .querySelectorAll(".mood")
          .forEach((x) => x.classList.toggle("selected", x === b));
      }),
  );
  document.querySelectorAll("[data-go]").forEach(
    (a) =>
      (a.onclick = (e) => {
        e.preventDefault();
        go(a.dataset.go);
      }),
  );
  document
    .querySelectorAll("[data-ex]")
    .forEach((b) => (b.onclick = () => openExercise(b.dataset.ex)));
  document.querySelectorAll("[data-care]").forEach(
    (c) =>
      (c.onchange = () => {
        Store.toggleCheck(user.id, c.dataset.care);
        const n = Store.checks(user.id).length;
        document.getElementById("careCount").textContent =
          n + "/" + CHECKLIST.length + " done";
        if (n === CHECKLIST.length)
          toast("Great job taking care of yourself today! 🌟");
      }),
  );
  document.getElementById("saveMood").onclick = () => {
    if (!selectedMood) return toast("Please choose how you feel first");
    const updated = Store.saveMood(
      user.id,
      selectedMood,
      document.getElementById("notes").value.trim(),
    );
    toast(
      updated
        ? "Mood updated for today"
        : "Mood saved. Thank you for checking in!",
    );
    render();
  };
}

/* ---------- Student: Mood (calendar, charts, weekly report) ---------- */
function calendarHtml(user) {
  const map = {};
  Store.moodsFor(user.id).forEach((m) => (map[m.date] = m));
  const startDow = new Date(calY, calM, 1).getDay(),
    days = new Date(calY, calM + 1, 0).getDate();
  const title = new Date(calY, calM, 1).toLocaleDateString("en", {
    month: "long",
    year: "numeric",
  });
  let cells = "";
  for (let i = 0; i < startDow; i++)
    cells += '<div class="cal-cell empty"></div>';
  for (let d = 1; d <= days; d++) {
    const ds = calY + "-" + p2(calM + 1) + "-" + p2(d),
      m = map[ds];
    cells += `<button class="cal-cell ${ds === Store.today() ? "today" : ""} ${calSel === ds ? "sel" : ""}" data-day="${ds}" style="${m ? "background:" + MOOD_COLOR[m.mood] + "88" : ""}"><b>${d}</b>${m ? "<span>" + MOOD_EM[m.mood] + "</span>" : ""}</button>`;
  }
  const sel = calSel && map[calSel];
  return `<div class="cal-head"><button class="btn small ghost" id="calPrev" aria-label="Previous month">‹</button><b>${title}</b><button class="btn small ghost" id="calNext" aria-label="Next month">›</button></div>
  <div class="cal"><div class="dow">S</div><div class="dow">M</div><div class="dow">T</div><div class="dow">W</div><div class="dow">T</div><div class="dow">F</div><div class="dow">S</div>${cells}</div>
  <div class="legend">${MOODS.map((m) => `<span><i style="background:${MOOD_COLOR[m.name]}"></i>${m.name}</span>`).join("")}</div>
  ${calSel ? `<div class="card" style="margin-top:10px">${sel ? `${MOOD_EM[sel.mood]} <b>${esc(sel.mood)}</b> · ${fmt(calSel)}<br><span class="muted">${sel.notes ? esc(sel.notes) : "No note"}</span>` : `<span class="muted">${fmt(calSel)}: no check-in</span>`}</div>` : ""}`;
}
function weeklyReport(user) {
  const w = Store.weekly(user.id),
    tot = w.checkins;
  const score = { Happy: 4, Okay: 3, Sad: 2, Stressed: 1 };
  const avg = tot
    ? w.entries.filter(Boolean).reduce((a, e) => a + score[e.mood], 0) / tot
    : 0;
  const msg = !tot
    ? "No check-ins this week yet. Try saving your mood each day."
    : avg >= 3.3
      ? "It looks like a good week. Keep up the habits that help you feel well."
      : avg >= 2.3
        ? "A mixed week. Small breaks and talking to someone you trust can help."
        : "This week looked tough. You do not have to handle it alone. Consider talking to the clinic.";
  const top = tot
    ? Object.keys(w.counts).sort((a, b) => w.counts[b] - w.counts[a])[0]
    : "-";
  return `<button class="back noprint" id="repBack">← Back</button>
  <div class="report"><h2>Weekly Wellness Report</h2><p class="muted">${esc(user.name)} · ${fmt(w.days[0])} to ${fmt(w.days[6])}</p>
  <div class="stats"><div class="stat"><b>${w.checkins}/7</b>Days checked in</div><div class="stat"><b>${w.careDays}/7</b>Self-care days</div><div class="stat"><b>${w.exercises}</b>Exercises done</div><div class="stat"><b>${top === "-" ? "-" : MOOD_EM[top] + " " + top}</b>Most common mood</div></div>
  ${MOODS.map((m) => `<div class="hbar"><span>${m.em} ${m.name}</span><div><i style="width:${tot ? (w.counts[m.name] / tot) * 100 : 0}%;background:${MOOD_COLOR[m.name]}"></i></div><b>${w.counts[m.name]}</b></div>`).join("")}
  <div class="nudge ok" style="margin-top:14px">${msg}</div>
  <p class="muted">This report is for self-awareness only. It is not a diagnosis. Generated on ${fmt(Store.today())}.</p></div>
  <button class="btn noprint" id="printBtn">🖨️ Print / Save as PDF</button>`;
}
function studentMood(user) {
  if (showReport) {
    studentShell(user, weeklyReport(user));
    document.getElementById("repBack").onclick = () => {
      showReport = false;
      render();
    };
    document.getElementById("printBtn").onclick = () => window.print();
    return;
  }
  const all = Store.moodsFor(user.id);
  const score = { Happy: 4, Okay: 3, Sad: 2, Stressed: 1 };
  const last7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = Store.today(-i);
    last7.push({ d, m: all.find((x) => x.date === d) });
  }
  const counts = Store.moodCounts(user.id, 30),
    total = Object.values(counts).reduce((a, b) => a + b, 0);
  const top = total
    ? Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0]
    : "-";
  studentShell(
    user,
    `<h2>My Mood History</h2><p class="sub">Only you can see this page.</p>
  <div class="stats"><div class="stat"><b>${Store.streak(user.id)}</b>Day streak</div><div class="stat"><b>${total}</b>Check-ins (30 days)</div><div class="stat"><b>${top === "-" ? "-" : MOOD_EM[top] + " " + top}</b>Most common mood</div></div>
  <button class="btn ghost" id="repBtn" style="margin-top:0">📄 View weekly report</button>
  <div class="grid2"><section><h3>Mood calendar</h3>${calendarHtml(user)}
  <h3>Last 7 days</h3><div class="bars-wrap"><div class="bars">${last7.map((x) => `<div style="height:${x.m ? score[x.m.mood] * 25 : 6}%;background:${x.m ? MOOD_COLOR[x.m.mood] : "#e3ebe7"}" title="${x.m ? x.m.mood : "No entry"}"><small>${new Date(x.d + "T00:00:00").toLocaleDateString("en", { weekday: "short" })}</small></div>`).join("")}</div></div>
  </section><section><h3>Last 30 days</h3>${MOODS.map((m) => `<div class="hbar"><span>${m.em} ${m.name}</span><div><i style="width:${total ? (counts[m.name] / total) * 100 : 0}%;background:${MOOD_COLOR[m.name]}"></i></div><b>${counts[m.name]}</b></div>`).join("")}
  <h3>History</h3><div class="card">${all.length ? all.map((m) => `<div class="list-row"><span class="em">${MOOD_EM[m.mood]}</span><div><b>${esc(m.mood)}</b> · ${fmt(m.date)}<br><span class="muted">${m.notes ? esc(m.notes) : "No note"}</span></div></div>`).join("") : '<p class="muted">No mood entries yet. Save one on the Home tab.</p>'}</div></section></div>`,
  );
  document.getElementById("repBtn").onclick = () => {
    showReport = true;
    render();
    window.scrollTo(0, 0);
  };
  const shift = (d) => {
    calM += d;
    if (calM < 0) {
      calM = 11;
      calY--;
    }
    if (calM > 11) {
      calM = 0;
      calY++;
    }
    render();
  };
  document.getElementById("calPrev").onclick = () => shift(-1);
  document.getElementById("calNext").onclick = () => shift(1);
  document.querySelectorAll("[data-day]").forEach(
    (b) =>
      (b.onclick = () => {
        calSel = b.dataset.day;
        render();
      }),
  );
}

/* ---------- Student: Concerns ---------- */
function concernCard(c) {
  return `<div class="card"><span class="muted">${fmt(c.date)} · ${esc(c.code)}</span> ${statusPill(c.status)}<br>${esc(c.message)}
  ${c.response ? `<div class="reply"><b>Clinic reply:</b> ${esc(c.response)}</div>` : '<div class="muted" style="margin-top:6px">No reply yet.</div>'}</div>`;
}
function studentConcerns(user) {
  const mine = Store.myConcerns(user.id);
  studentShell(
    user,
    `<h2>Submit a Concern</h2><p class="sub">Share what you are feeling. You can submit your concern anonymously.</p>
  <div class="grid2"><section>
  ${lastCode ? `<div class="nudge ok">✅ Concern submitted. Your reference code is <b class="big">${lastCode}</b><br>Save it. Use it on this page to check the clinic's reply, even if you submitted anonymously.</div>` : ""}
  <label for="msg">Your Concern:</label><textarea id="msg" placeholder="Type your message here..."></textarea>
  <label class="check"><input type="checkbox" id="anon"> Submit Anonymously</label>
  <button class="btn" id="sendConcern">SUBMIT CONCERN</button>
  <p class="muted" style="margin-top:14px">Your concern is only visible to authorized clinic personnel. This app does not diagnose any condition.</p>
  </section><section>
  <div class="card"><b>🔎 Check a concern by code</b><div class="row"><input type="text" id="codeIn" placeholder="e.g. MH-1002"><button class="btn small" id="codeBtn">Check</button></div>
  ${codeResult === null ? '<p class="err">No concern found with that code.</p>' : codeResult ? `<div style="margin-top:10px"><span class="muted">${fmt(codeResult.date)}</span> ${statusPill(codeResult.status)}${codeResult.response ? `<div class="reply"><b>Clinic reply:</b> ${esc(codeResult.response)}</div>` : '<div class="muted" style="margin-top:6px">No reply yet. Please check again later.</div>'}</div>` : ""}</div>
  ${mine.length ? `<h3>My non-anonymous concerns</h3>${mine.map(concernCard).join("")}` : ""}
  </section></div>`,
  );
  document.getElementById("sendConcern").onclick = () => {
    const msg = document.getElementById("msg").value.trim();
    if (msg.length < 5) return toast("Please write your concern first");
    lastCode = Store.addConcern(
      user.id,
      msg,
      document.getElementById("anon").checked,
    );
    codeResult = undefined;
    toast("Concern submitted. Clinic personnel will review it.");
    render();
    window.scrollTo(0, 0);
  };
  document.getElementById("codeBtn").onclick = () => {
    codeResult = Store.byCode(document.getElementById("codeIn").value);
    lastCode = null;
    render();
  };
}

/* ---------- Student: Buddies ---------- */
function studentBuddies(user) {
  if (openChat) return studentChat(user);
  const bud = Store.buddies(user.id),
    inc = Store.incoming(user.id),
    out = Store.outgoing(user.id);
  const results = buddyQuery ? Store.search(user.id, buddyQuery) : null;
  const relText = (id) => {
    const f = Store.relation(user.id, id);
    return !f ? null : f.status === "accepted" ? "Buddy" : "Requested";
  };
  studentShell(
    user,
    `<h2>My Buddies</h2><p class="sub">Add a friend by nickname. You choose if they can see your mood.</p>
  <div class="grid2"><section>
    <div class="card"><b>➕ Add a buddy</b><div class="row"><input type="text" id="bq" placeholder="Search nickname or Student ID" value="${esc(buddyQuery)}"><button class="btn small" id="bqBtn">Search</button></div>
    ${results ? (results.length ? results.map((r) => `<div class="list-row"><span class="em">🙂</span><div style="flex:1"><b>@${esc(r.nickname)}</b></div>${relText(r.id) ? `<span class="pill rev">${relText(r.id)}</span>` : `<button class="btn small" data-add="${r.id}">Add</button>`}</div>`).join("") : '<p class="muted">No student found.</p>') : ""}</div>
    ${inc.length ? `<h3>Buddy requests</h3>${inc.map((r) => `<div class="card"><b>@${esc(r.other.nickname)}</b> wants to be your buddy<div class="row"><button class="btn small" data-acc="${r.fr.id}">Accept</button><button class="btn small ghost" data-dec="${r.fr.id}">Decline</button></div></div>`).join("")}` : ""}
    ${out.length ? `<h3>Sent requests</h3>${out.map((r) => `<div class="card">Waiting for <b>@${esc(r.other.nickname)}</b> ${statusPill("Pending")}</div>`).join("")}` : ""}
  </section><section><h3>Buddies (${bud.length})</h3>
    ${
      bud.length
        ? bud
            .map((b) => {
              const bm = Store.buddyMood(user.id, b.other.id),
                un = Store.unreadFrom(user.id, b.other.id);
              const moodTxt = !bm.shared
                ? "🔒 Mood not shared"
                : bm.mood
                  ? MOOD_EM[bm.mood.mood] + " Today: " + esc(bm.mood.mood)
                  : "No check-in today";
              return `<div class="card"><b>🙂 @${esc(b.other.nickname)}</b><br><span class="muted">${moodTxt}</span>
      <label class="check small"><input type="checkbox" data-share="${b.fr.id}" ${b.fr.share[user.id] ? "checked" : ""}> Share my mood with @${esc(b.other.nickname)}</label>
      <div class="row"><button class="btn small" data-chat="${b.other.id}">💬 Chat${un ? " (" + un + " new)" : ""}</button><button class="btn small ghost" data-rm="${b.fr.id}">Remove</button></div></div>`;
            })
            .join("")
        : '<p class="muted">No buddies yet. Search for a friend by nickname.</p>'
    }
    <p class="muted">Buddies only see your mood label for today, never your notes. The clinic cannot read buddy chats.</p>
  </section></div>`,
  );
  const doSearch = () => {
    buddyQuery = document.getElementById("bq").value;
    render();
  };
  document.getElementById("bqBtn").onclick = doSearch;
  document.getElementById("bq").onkeydown = (e) => {
    if (e.key === "Enter") doSearch();
  };
  document.querySelectorAll("[data-add]").forEach(
    (b) =>
      (b.onclick = () => {
        const m = Store.sendRequest(user.id, b.dataset.add);
        toast(m || "Buddy request sent");
        render();
      }),
  );
  document.querySelectorAll("[data-acc]").forEach(
    (b) =>
      (b.onclick = () => {
        Store.respondRequest(+b.dataset.acc, true);
        toast("Buddy added");
        render();
      }),
  );
  document.querySelectorAll("[data-dec]").forEach(
    (b) =>
      (b.onclick = () => {
        Store.respondRequest(+b.dataset.dec, false);
        render();
      }),
  );
  document.querySelectorAll("[data-share]").forEach(
    (c) =>
      (c.onchange = () => {
        Store.setShare(+c.dataset.share, user.id, c.checked);
        toast(c.checked ? "Mood sharing turned on" : "Mood sharing turned off");
      }),
  );
  document.querySelectorAll("[data-chat]").forEach(
    (b) =>
      (b.onclick = () => {
        openChat = b.dataset.chat;
        chatAlert = false;
        render();
        window.scrollTo(0, 0);
      }),
  );
  document.querySelectorAll("[data-rm]").forEach(
    (b) =>
      (b.onclick = () => {
        if (
          confirm("Remove this buddy? Your chat with them will be deleted.")
        ) {
          Store.removeBuddy(+b.dataset.rm);
          toast("Buddy removed");
          render();
        }
      }),
  );
}
function studentChat(user) {
  const other = Store.user(openChat);
  if (!other || !Store.relation(user.id, openChat)) {
    openChat = null;
    return studentBuddies(user);
  }
  Store.markRead(user.id, openChat);
  const msgs = Store.messagesBetween(user.id, openChat);
  studentShell(
    user,
    `<button class="back" id="back">← Back</button><h2>Chat with @${esc(other.nickname)}</h2>
  <div class="nudge">💛 Buddies are not professionals. For serious problems, talk to the clinic or call Hopeline PH at ${HOTLINE}.</div>
  ${chatAlert ? `<div class="nudge care">💚 It sounds like you may be going through something very hard. You matter. Please reach out now: call <b>${HOTLINE}</b> (Hopeline PH), or <a href="#" data-go="visits">request a clinic appointment</a>. If you are in danger, call right away.</div>` : ""}
  <div class="chatbox" id="chatbox">${msgs.length ? msgs.map((m) => `<div class="bub ${m.from === user.id ? "me" : "them"}">${esc(m.text)}<small>${fmtTime(m.time)}</small></div>`).join("") : '<p class="muted" style="margin:auto">Say hi 👋</p>'}</div>
  <div class="row"><input type="text" id="chatIn" maxlength="300" placeholder="Type a message..."><button class="btn small" id="sendBtn">Send</button></div>
  <button class="btn ghost small" id="reportBtn" style="margin-top:12px">🚩 Report this chat</button>`,
  );
  chatAlert = false;
  const box = document.getElementById("chatbox");
  box.scrollTop = box.scrollHeight;
  document.getElementById("back").onclick = () => {
    openChat = null;
    render();
  };
  const send = () => {
    const inp = document.getElementById("chatIn"),
      text = inp.value.trim();
    if (!text) return;
    Store.sendMessage(user.id, openChat, text);
    chatAlert = CRISIS.some((w) => text.toLowerCase().includes(w));
    render();
  };
  document.getElementById("sendBtn").onclick = send;
  document.getElementById("chatIn").onkeydown = (e) => {
    if (e.key === "Enter") send();
  };
  document.querySelectorAll("[data-go]").forEach(
    (a) =>
      (a.onclick = (e) => {
        e.preventDefault();
        go(a.dataset.go);
      }),
  );
  document.getElementById("reportBtn").onclick = () => {
    if (confirm("Report this chat to the clinic?")) {
      Store.report(user.id, openChat);
      toast("Reported. Thank you for keeping the community safe.");
    }
  };
}

/* ---------- Student: Visits (appointment requests) ---------- */
function studentVisits(user) {
  const mine = Store.appointmentsFor(user.id);
  studentShell(
    user,
    `<h2>Clinic Appointments</h2><p class="sub">Request a time to talk with clinic personnel.</p>
  <div class="grid2"><section>
    <label for="apDate">Preferred date</label><input type="date" id="apDate" min="${Store.today()}">
    <label for="apSlot">Preferred time</label><select id="apSlot">${SLOTS.map((s) => `<option>${s}</option>`).join("")}</select>
    <label for="apReason">Reason (short)</label><textarea id="apReason" style="min-height:90px" placeholder="What would you like to talk about?"></textarea>
    <button class="btn" id="apSend">Request Appointment</button>
    <p class="muted" style="margin-top:12px">Clinic hours: Monday to Friday. The clinic will approve, decline or suggest another time.</p>
  </section><section><h3>My requests</h3>
  ${
    mine.length
      ? mine
          .map(
            (
              a,
            ) => `<div class="card">📅 <b>${fmt(a.date)}</b> · ${esc(a.slot)} ${statusPill(a.status)}<br><span class="muted">${esc(a.reason)}</span>
    ${a.note ? `<div class="reply"><b>Clinic note:</b> ${esc(a.note)}</div>` : ""}
    ${a.status === "Pending" || a.status === "Approved" || a.status === "Rescheduled" ? `<button class="btn small ghost" data-cancel="${a.id}" style="margin-top:8px">Cancel request</button>` : ""}</div>`,
          )
          .join("")
      : '<p class="muted">No appointment requests yet.</p>'
  }
  </section></div>`,
  );
  document.getElementById("apSend").onclick = () => {
    const d = document.getElementById("apDate").value,
      s = document.getElementById("apSlot").value,
      r = document.getElementById("apReason").value.trim();
    if (!d) return toast("Please choose a date");
    if (d < Store.today()) return toast("Please choose today or a future date");
    if (r.length < 3) return toast("Please add a short reason");
    Store.addAppointment(user.id, d, s, r);
    toast("Appointment requested. Wait for the clinic to respond.");
    render();
  };
  document.querySelectorAll("[data-cancel]").forEach(
    (b) =>
      (b.onclick = () => {
        Store.updateAppointment(+b.dataset.cancel, { status: "Cancelled" });
        toast("Request cancelled");
        render();
      }),
  );
}

/* ---------- Student: Help (resources + stress self-check) ---------- */
function quizHtml() {
  if (quizResult) {
    const r = quizResult,
      tips = {
        Low: "Your stress seems low right now. Keep your healthy habits: sleep, water, breaks and talking to people you trust.",
        Moderate:
          "You may be feeling a moderate amount of stress. Try the breathing exercise, plan your tasks and rest. Talking to someone can help.",
        High: "You may be under a lot of stress. Please consider talking to the clinic. You are not alone, and asking for help is okay.",
      };
    return `<h2>Your result: ${r.level} stress</h2><div class="nudge ${r.level === "High" ? "care" : "ok"}">${tips[r.level]}</div>
    <p class="muted">Score ${r.score} out of ${QUIZ.length * 3}. This is a self-check only. It is <b>not</b> a diagnosis; only a licensed professional can diagnose.</p>
    ${r.level !== "Low" ? '<button class="btn" data-go="visits">Request a clinic appointment</button><button class="btn ghost" data-go="concerns">Send a concern</button>' : ""}
    <button class="btn ghost" id="retake">Retake</button>`;
  }
  return `<h2>Stress Self-Check</h2><p class="muted">In the past 2 weeks, how often did this happen to you? This is not a diagnosis.</p>
  ${QUIZ.map((q, i) => `<div class="q"><b>${i + 1}. ${q}</b><div class="opts">${QUIZ_OPTS.map((o, v) => `<label><input type="radio" name="q${i}" value="${v}">${o}</label>`).join("")}</div></div>`).join("")}
  <button class="btn" id="quizDone">See my result</button>`;
}
function studentHelp(user) {
  const res = Store.resources();
  const icon = { Tip: "🌿", Activity: "🪷", Information: "📘", Hotline: "📞" };
  const hot = res.find((r) => r.type === "Hotline");
  if (openResource) {
    if (
      openResource === "exercises" ||
      openResource === "gratitude" ||
      String(openResource).startsWith("ex:")
    )
      return studentExercises(user);
    if (openResource === "quiz") {
      studentShell(
        user,
        `<button class="back" id="back">← Back</button>${quizHtml()}`,
      );
      document.getElementById("back").onclick = () => {
        openResource = null;
        render();
      };
      document
        .querySelectorAll("[data-go]")
        .forEach((b) => (b.onclick = () => go(b.dataset.go)));
      const rt = document.getElementById("retake");
      if (rt)
        rt.onclick = () => {
          quizResult = null;
          render();
        };
      const qd = document.getElementById("quizDone");
      if (qd)
        qd.onclick = () => {
          let score = 0;
          for (let i = 0; i < QUIZ.length; i++) {
            const c = document.querySelector(`input[name=q${i}]:checked`);
            if (!c) return toast("Please answer all questions");
            score += +c.value;
          }
          const level = score <= 5 ? "Low" : score <= 11 ? "Moderate" : "High";
          Store.saveQuiz(user.id, score, level);
          quizResult = { score, level };
          render();
          window.scrollTo(0, 0);
        };
      return;
    }
    const r = res.find((x) => x.id === openResource);
    studentShell(
      user,
      `<button class="back" id="back">← Back</button><h2>${esc(r.title)}</h2><p class="pre">${esc(r.description)}</p>
    ${r.id === 2 ? `<div class="breath" id="breath">Press Start</div><button class="btn" id="breathBtn" style="max-width:300px;margin:14px auto">Start</button>` : ""}
    ${r.type === "Hotline" ? `<div class="hotline"><div class="num">📞 ${esc(r.contact)}</div><p class="muted">If you or someone you know is in danger, call right away.</p></div>` : ""}`,
    );
    document.getElementById("back").onclick = () => {
      stopBreath();
      openResource = null;
      render();
    };
    bindBreath("breathBtn", "breath");
    return;
  }
  const last = Store.lastQuiz(user.id);
  studentShell(
    user,
    `<h2>Mental Wellness</h2><p class="sub">Take care of yourself</p>
  <button class="item exer" id="exOpen"><span class="ic">🧘</span>Wellness Exercises<span class="chev">›</span></button>
  <button class="item quiz" id="quizOpen"><span class="ic">📝</span>Stress Self-Check${last ? ' <span class="muted">(last: ' + last.level + ")</span>" : ""}<span class="chev">›</span></button>
  <div class="res-grid">${res
    .filter((r) => r.type !== "Hotline")
    .map(
      (r) =>
        `<button class="item ${r.type === "Tip" ? "tip" : r.type === "Activity" ? "act" : "info"}" data-r="${r.id}"><span class="ic">${icon[r.type]}</span>${esc(r.title)}<span class="chev">›</span></button>`,
    )
    .join("")}</div>
  <div class="hotline"><h3>Need Additional Support?</h3><p class="muted" style="margin:0">You can reach the national mental health hotline.</p>
  <button class="btn danger small" id="hotBtn" style="margin-top:10px">View Mental Health Hotline</button></div>`,
  );
  document.querySelectorAll(".item[data-r]").forEach(
    (b) =>
      (b.onclick = () => {
        openResource = +b.dataset.r;
        render();
        window.scrollTo(0, 0);
      }),
  );
  document.getElementById("exOpen").onclick = () => {
    openResource = "exercises";
    render();
    window.scrollTo(0, 0);
  };
  document.getElementById("quizOpen").onclick = () => {
    openResource = "quiz";
    quizResult = null;
    render();
    window.scrollTo(0, 0);
  };
  document.getElementById("hotBtn").onclick = () => {
    openResource = hot.id;
    render();
  };
}

/* ---------- Student: Wellness exercises ---------- */
function paintRun() {
  if (!run || run.done) return;
  const st = run.steps[run.i],
    ex = run.ex;
  const set = (id, fn) => {
    const el = document.getElementById(id);
    if (el) fn(el);
  };
  set("exTitle", (el) => (el.textContent = st.title));
  set("exText", (el) => (el.textContent = st.text));
  set("exLeft", (el) => (el.textContent = run.left + "s"));
  set(
    "exCount",
    (el) =>
      (el.textContent = "Step " + (run.i + 1) + " of " + run.steps.length),
  );
  set(
    "exBar",
    (el) =>
      (el.style.width = Math.min(100, (run.elapsed / run.total) * 100) + "%"),
  );
  set("exCircle", (el) => {
    if (ex.circle) {
      el.textContent = st.title;
      el.style.transitionDuration = st.sec + "s";
      if (st.anim === "in") el.classList.add("in");
      else if (st.anim === "out") el.classList.remove("in");
    }
  });
}
function advanceRun(skipped) {
  if (skipped) run.elapsed += run.left;
  run.i++;
  if (run.i >= run.steps.length) {
    stopRun();
    run.done = true;
    const u = Store.session();
    Store.logExercise(u.id, run.ex.id, run.ex.title, exMins(run.ex));
    render();
    window.scrollTo(0, 0);
    return;
  }
  run.left = run.steps[run.i].sec;
  paintRun();
}
function tickRun() {
  if (!run || run.paused || run.done) return;
  run.left--;
  run.elapsed++;
  if (run.left <= 0) advanceRun(false);
  else paintRun();
}
function studentExercises(user) {
  if (openResource === "gratitude") return gratitudeView(user);
  if (String(openResource).startsWith("ex:"))
    return exerciseView(
      user,
      EXERCISES.find((x) => x.id === openResource.slice(3)),
    );
  const st = Store.exerciseStats(user.id),
    recent = Store.recentExercises(user.id, 5);
  studentShell(
    user,
    `<button class="back" id="back">← Back</button><h2>Wellness Exercises</h2><p class="sub">Short guided exercises you can do anywhere. Pick one that fits how you feel.</p>
  <div class="stats"><div class="stat"><b>${st.today}</b>Done today</div><div class="stat"><b>${st.week}</b>This week</div><div class="stat"><b>${st.minutes}</b>Minutes this week</div></div>
  <div class="res-grid">${EXERCISES.map((e) => `<div class="card excard"><b>${e.icon} ${esc(e.title)}</b> <span class="pill rev">${exMins(e)} min</span><p class="muted" style="margin:6px 0">${esc(e.desc)}</p><button class="btn small" data-ex="${e.id}">Start</button></div>`).join("")}
  <div class="card excard"><b>📓 Gratitude Journal</b> <span class="pill rev">3 min</span><p class="muted" style="margin:6px 0">Write down up to three good things from today. Only you can see your entries.</p><button class="btn small" id="gratOpen">Open</button></div></div>
  ${recent.length ? `<h3>Recently completed</h3><div class="card">${recent.map((r) => `<div class="list-row"><span class="em">✅</span><div><b>${esc(r.title)}</b> · ${r.mins} min<br><span class="muted">${fmt(r.date)}</span></div></div>`).join("")}</div>` : ""}
  <p class="muted">Stop any exercise if you feel dizzy or uncomfortable. These exercises support wellness and are not medical treatment.</p>`,
  );
  document.getElementById("back").onclick = () => {
    openResource = null;
    render();
  };
  document
    .querySelectorAll("[data-ex]")
    .forEach((b) => (b.onclick = () => openExercise(b.dataset.ex)));
  document.getElementById("gratOpen").onclick = () => {
    openResource = "gratitude";
    render();
    window.scrollTo(0, 0);
  };
}
function exerciseView(user, ex) {
  if (!ex) {
    openResource = "exercises";
    return studentExercises(user);
  }
  const toList = () => {
    stopRun();
    run = null;
    openResource = "exercises";
    render();
    window.scrollTo(0, 0);
  };
  if (run && run.done && run.ex.id === ex.id) {
    const st = Store.exerciseStats(user.id);
    studentShell(
      user,
      `<div class="exbox"><div class="exicon">🎉</div><h2>Well done!</h2><p>You completed <b>${esc(ex.title)}</b>. Notice how your body and mind feel now.</p>
    <p class="muted">${st.week} exercise${st.week === 1 ? "" : "s"} this week · ${st.minutes} minutes</p>
    <button class="btn" id="again">Do another exercise</button><button class="btn ghost" id="redo">Repeat this one</button></div>`,
    );
    document.getElementById("again").onclick = toList;
    document.getElementById("redo").onclick = () => {
      run = null;
      render();
    };
    return;
  }
  if (!run || run.ex.id !== ex.id) {
    const steps = exSteps(ex);
    studentShell(
      user,
      `<button class="back" id="back">← Exercises</button><h2>${ex.icon} ${esc(ex.title)}</h2><p>${esc(ex.desc)}</p>
    <p class="muted">About ${exMins(ex)} minute${exMins(ex) === 1 ? "" : "s"}. Find a comfortable place. Stop if you feel dizzy.</p>
    ${ex.steps && ex.steps.length > 1 ? `<div class="card"><b>What you will do</b>${ex.steps.map((x, i) => `<div class="list-row"><span class="em">${i + 1}</span><div>${esc(x.title)}</div></div>`).join("")}</div>` : ""}
    <button class="btn" id="startEx">Start</button>`,
    );
    document.getElementById("back").onclick = toList;
    document.getElementById("startEx").onclick = () => {
      run = {
        ex,
        steps,
        i: 0,
        left: steps[0].sec,
        paused: false,
        done: false,
        elapsed: 0,
        total: steps.reduce((a, x) => a + x.sec, 0),
      };
      render();
      window.scrollTo(0, 0);
    };
    return;
  }
  studentShell(
    user,
    `<div class="exbox">${ex.circle ? '<div class="breath" id="exCircle">Get ready</div>' : `<div class="exicon">${ex.icon}</div>`}
  <h2 id="exTitle"></h2><p id="exText" class="pre"></p><div class="big" id="exLeft"></div>
  <div class="progress"><i id="exBar"></i></div><p class="muted" id="exCount"></p>
  <div class="row" style="justify-content:center"><button class="btn small" id="exPause">${run.paused ? "Resume" : "Pause"}</button><button class="btn small ghost" id="exSkip">Skip step</button><button class="btn small danger" id="exStop">Stop</button></div></div>`,
  );
  paintRun();
  if (!runTimer) runTimer = setInterval(tickRun, 1000);
  document.getElementById("exPause").onclick = () => {
    run.paused = !run.paused;
    document.getElementById("exPause").textContent = run.paused
      ? "Resume"
      : "Pause";
  };
  document.getElementById("exSkip").onclick = () => advanceRun(true);
  document.getElementById("exStop").onclick = () => {
    if (confirm("Stop this exercise? It will not be counted as completed."))
      toList();
  };
}
function gratitudeView(user) {
  const list = Store.gratitudeFor(user.id);
  studentShell(
    user,
    `<button class="back" id="back">← Exercises</button><h2>📓 Gratitude Journal</h2><p class="sub">Write up to three good things from today, big or small. Only you can see this.</p>
  <div class="grid2"><section>${[1, 2, 3].map((i) => `<label for="g${i}">${i}. I am grateful for...</label><input type="text" id="g${i}" maxlength="120">`).join("")}
  <button class="btn" id="gratSave">Save entry</button></section>
  <section><h3>My entries</h3>${list.length ? list.map((g) => `<div class="card"><span class="muted">${fmt(g.date)}</span>${g.items.map((x) => `<div>💛 ${esc(x)}</div>`).join("")}</div>`).join("") : '<p class="muted">No entries yet.</p>'}</section></div>`,
  );
  document.getElementById("back").onclick = () => {
    openResource = "exercises";
    render();
  };
  document.getElementById("gratSave").onclick = () => {
    const items = [1, 2, 3]
      .map((i) => document.getElementById("g" + i).value.trim())
      .filter(Boolean);
    if (!items.length)
      return toast("Write at least one thing you are grateful for");
    Store.addGratitude(user.id, items);
    Store.logExercise(user.id, "gratitude", "Gratitude Journal", 3);
    toast("Saved. Great job! 🌟");
    render();
  };
}

/* ---------- Notifications (student and clinic) ---------- */
function notifsHtml(user) {
  const list = Store.notifsFor(user.id);
  return `<h2>Notifications</h2><p class="sub">${list.length ? "" : "You have no notifications yet."}</p>
  ${list.length ? '<button class="btn small ghost" id="markAll" style="margin-bottom:10px">Mark all as read</button>' : ""}
  ${list.map((n) => `<div class="notif ${n.read ? "" : "unread"}" data-n="${n.id}" data-go="${n.go}">${n.read ? "" : "🔵 "}${esc(n.text)}<br><span class="muted">${fmt(n.date)}</span></div>`).join("")}`;
}
function bindNotifs(user) {
  const ma = document.getElementById("markAll");
  if (ma)
    ma.onclick = () => {
      Store.markAllNotifs(user.id);
      render();
    };
  document.querySelectorAll(".notif").forEach(
    (n) =>
      (n.onclick = () => {
        Store.markNotif(+n.dataset.n);
        if (user.role === "clinic") {
          clinicTab = ["concerns", "appointments", "announcements"].includes(
            n.dataset.go,
          )
            ? n.dataset.go
            : "concerns";
          render();
        } else go(n.dataset.go);
      }),
  );
}
function studentNotifs(user) {
  studentShell(user, notifsHtml(user));
  bindNotifs(user);
}

/* ---------- Clinic ---------- */
function clinicShell(user, body) {
  const tabs = [
    ["concerns", "💬 Concerns"],
    ["appointments", "📅 Appointments"],
    ["announcements", "📢 Announcements"],
    ["notifs", "🔔 Notifications"],
  ];
  $app.innerHTML =
    header(user) +
    `<main class="clinic"><div class="content wide"><div class="filters ctabs">${tabs.map((t) => `<button class="${clinicTab === t[0] ? "active" : ""}" data-ct="${t[0]}">${t[1]}</button>`).join("")}</div>${body}</div></main>`;
  document.querySelectorAll("[data-ct]").forEach(
    (b) =>
      (b.onclick = () => {
        clinicTab = b.dataset.ct;
        render();
      }),
  );
  bindHeader(user);
}
function clinicConcerns(user) {
  const all = Store.concerns();
  let list = filter === "All" ? all : all.filter((c) => c.status === filter);
  if (query)
    list = list.filter((c) =>
      (c.message + " " + c.code).toLowerCase().includes(query.toLowerCase()),
    );
  const cnt = (s) => all.filter((c) => c.status === s).length;
  const ov = Store.overview(7),
    ovTotal = Object.values(ov).reduce((a, b) => a + b, 0);
  clinicShell(
    user,
    `<h2>Submitted Concerns</h2><p class="sub">Review concerns, reply, and update their status. Anonymous concerns do not show student identity.</p>
  <div class="stats"><div class="stat"><b>${all.length}</b>Total</div><div class="stat"><b>${cnt("New")}</b>New</div><div class="stat"><b>${cnt("Reviewed")}</b>Reviewed</div><div class="stat"><b>${cnt("Needs Follow-up")}</b>Needs follow-up</div></div>
  <div class="card"><b>📊 Student mood overview (last 7 days)</b> <span class="muted">Totals only, no student names</span>
  ${MOODS.map((m) => `<div class="hbar"><span>${m.em} ${m.name}</span><div><i style="width:${ovTotal ? (ov[m.name] / ovTotal) * 100 : 0}%;background:${MOOD_COLOR[m.name]}"></i></div><b>${ov[m.name]}</b></div>`).join("")}</div>
  <div class="toolbar"><div class="filters">${["All", "New", "Reviewed", "Needs Follow-up"].map((f) => `<button class="${filter === f ? "active" : ""}" data-f="${f}">${f}</button>`).join("")}</div>
  <input type="text" id="search" placeholder="Search concerns or code..." value="${esc(query)}"></div>
  <table class="resp"><thead><tr><th>Code</th><th>Date</th><th>From</th><th>Concern and reply</th><th>Status</th><th>Update</th></tr></thead><tbody>
  ${
    list
      .map(
        (
          c,
        ) => `<tr><td data-l="Code">${esc(c.code)}</td><td data-l="Date">${fmt(c.date)}</td><td data-l="From">${c.studentId ? esc(Store.studentName(c.studentId)) + '<br><span class="muted">' + esc(c.studentId) + "</span>" : "<i>Anonymous</i>"}</td>
  <td data-l="Concern">${esc(c.message)}${c.response ? `<div class="reply"><b>Your reply:</b> ${esc(c.response)}</div>` : ""}
    <details><summary>${c.response ? "Edit reply" : "Reply"}</summary><textarea id="rp${c.id}" style="min-height:70px">${esc(c.response)}</textarea><button class="btn small" data-reply="${c.id}" style="margin-top:6px">Send reply</button></details></td>
  <td data-l="Status">${statusPill(c.status)}</td>
  <td data-l="Update"><select data-id="${c.id}">${["New", "Reviewed", "Needs Follow-up"].map((s) => `<option ${s === c.status ? "selected" : ""}>${s}</option>`).join("")}</select></td></tr>`,
      )
      .join("") ||
    '<tr><td colspan="6" class="muted">No concerns found.</td></tr>'
  }
  </tbody></table>
  <p class="muted" style="margin-top:16px">Note: this system does not diagnose any condition. Concerns that need counseling should be handled by qualified professionals.</p>`,
  );
  document.querySelectorAll(".toolbar .filters button").forEach(
    (b) =>
      (b.onclick = () => {
        filter = b.dataset.f;
        render();
      }),
  );
  document.querySelectorAll("select[data-id]").forEach(
    (s) =>
      (s.onchange = () => {
        Store.setStatus(+s.dataset.id, s.value);
        toast("Status updated");
        render();
      }),
  );
  document.querySelectorAll("[data-reply]").forEach(
    (b) =>
      (b.onclick = () => {
        const txt = document
          .getElementById("rp" + b.dataset.reply)
          .value.trim();
        if (!txt) return toast("Please type a reply first");
        Store.respond(+b.dataset.reply, txt);
        toast("Reply sent");
        render();
      }),
  );
  const sb = document.getElementById("search");
  sb.oninput = () => {
    query = sb.value;
    render();
    const n = document.getElementById("search");
    n.focus();
    n.setSelectionRange(query.length, query.length);
  };
}
function clinicAppointments(user) {
  const all = Store.allAppointments();
  const list =
    apFilter === "All" ? all : all.filter((a) => a.status === apFilter);
  const cnt = (s) => all.filter((a) => a.status === s).length;
  clinicShell(
    user,
    `<h2>Appointment Requests</h2><p class="sub">Approve, decline or suggest another time. Students are notified.</p>
  <div class="stats"><div class="stat"><b>${all.length}</b>Total</div><div class="stat"><b>${cnt("Pending")}</b>Pending</div><div class="stat"><b>${cnt("Approved") + cnt("Rescheduled")}</b>Confirmed</div></div>
  <div class="filters">${["All", "Pending", "Approved", "Rescheduled", "Declined", "Cancelled"].map((f) => `<button class="${apFilter === f ? "active" : ""}" data-af="${f}">${f}</button>`).join("")}</div>
  <table class="resp"><thead><tr><th>Student</th><th>Date and time</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead><tbody>
  ${
    list
      .map(
        (
          a,
        ) => `<tr><td data-l="Student">${esc(Store.studentName(a.studentId))}<br><span class="muted">${esc(a.studentId)}</span></td><td data-l="When">${fmt(a.date)}<br>${esc(a.slot)}</td><td data-l="Reason">${esc(a.reason)}${a.note ? `<div class="reply"><b>Your note:</b> ${esc(a.note)}</div>` : ""}</td><td data-l="Status">${statusPill(a.status)}</td>
  <td data-l="Actions">${
    a.status === "Cancelled"
      ? '<span class="muted">Cancelled by student</span>'
      : `<input type="text" id="an${a.id}" placeholder="Note to student (optional)" value="${esc(a.note)}">
    <div class="row" style="flex-wrap:wrap"><button class="btn small" data-ap="${a.id}" data-act="Approved">Approve</button><button class="btn small danger" data-ap="${a.id}" data-act="Declined">Decline</button></div>
    <details><summary>Reschedule</summary><input type="date" id="rd${a.id}" min="${Store.today()}" value="${a.date}"><select id="rs${a.id}">${SLOTS.map((s) => `<option ${s === a.slot ? "selected" : ""}>${s}</option>`).join("")}</select><button class="btn small" data-rs="${a.id}" style="margin-top:6px">Save new time</button></details>`
  }</td></tr>`,
      )
      .join("") ||
    '<tr><td colspan="5" class="muted">No appointments found.</td></tr>'
  }
  </tbody></table>`,
  );
  document.querySelectorAll("[data-af]").forEach(
    (b) =>
      (b.onclick = () => {
        apFilter = b.dataset.af;
        render();
      }),
  );
  document.querySelectorAll("[data-ap]").forEach(
    (b) =>
      (b.onclick = () => {
        const id = +b.dataset.ap,
          a = Store.allAppointments().find((x) => x.id === id),
          note = document.getElementById("an" + id).value.trim();
        if (b.dataset.act === "Approved" && Store.slotTaken(a.date, a.slot, id))
          return toast("That time slot is already booked");
        Store.updateAppointment(id, { status: b.dataset.act, note });
        toast("Appointment " + b.dataset.act.toLowerCase());
        render();
      }),
  );
  document.querySelectorAll("[data-rs]").forEach(
    (b) =>
      (b.onclick = () => {
        const id = +b.dataset.rs,
          d = document.getElementById("rd" + id).value,
          s = document.getElementById("rs" + id).value,
          note = document.getElementById("an" + id).value.trim();
        if (!d) return toast("Choose a date");
        if (Store.slotTaken(d, s, id))
          return toast("That time slot is already booked");
        Store.updateAppointment(id, {
          status: "Rescheduled",
          date: d,
          slot: s,
          note,
        });
        toast("New time saved");
        render();
      }),
  );
}
function clinicAnnouncements(user) {
  const anns = Store.announcements();
  clinicShell(
    user,
    `<h2>Announcements</h2><p class="sub">Post wellness events or reminders. Students see them on their Home page.</p>
  <div class="grid2"><section><label for="anT">Title</label><input type="text" id="anT" maxlength="60"><label for="anB">Message</label><textarea id="anB" style="min-height:100px" maxlength="300"></textarea><button class="btn" id="anPost">Post announcement</button></section>
  <section><h3>Posted</h3>${anns.length ? anns.map((a) => `<div class="card">📢 <b>${esc(a.title)}</b> <span class="muted">· ${fmt(a.date)}</span><br>${esc(a.body)}<br><button class="btn small ghost" data-del="${a.id}" style="margin-top:8px">Delete</button></div>`).join("") : '<p class="muted">No announcements.</p>'}</section></div>`,
  );
  document.getElementById("anPost").onclick = () => {
    const t = document.getElementById("anT").value.trim(),
      b = document.getElementById("anB").value.trim();
    if (!t || !b) return toast("Please enter a title and a message");
    Store.addAnnouncement(t, b);
    toast("Announcement posted");
    render();
  };
  document.querySelectorAll("[data-del]").forEach(
    (b) =>
      (b.onclick = () => {
        Store.deleteAnnouncement(+b.dataset.del);
        render();
      }),
  );
}
function clinicNotifs(user) {
  clinicShell(user, notifsHtml(user));
  bindNotifs(user);
}
function renderClinic(user) {
  (
    ({
      concerns: clinicConcerns,
      appointments: clinicAppointments,
      announcements: clinicAnnouncements,
      notifs: clinicNotifs,
    })[clinicTab] || clinicConcerns
  )(user);
}

/* ---------- Router ---------- */
function render() {
  const u = Store.session();
  if (!u) return renderLogin();
  if (u.role === "clinic") return renderClinic(u);
  (
    ({
      home: studentHome,
      mood: studentMood,
      concerns: studentConcerns,
      buddies: studentBuddies,
      visits: studentVisits,
      help: studentHelp,
      notifs: studentNotifs,
    })[tab] || studentHome
  )(u);
}
render();
