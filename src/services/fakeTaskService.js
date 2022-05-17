const tasks = [
  {
    _id: "618c3432eddf61c496096578",
    title: "Stay Hydrated",
    task: "Drink da dew",
    notes: "water water water",
    category: "DayToDay",
    tags: ["tag 1"],
    severity: "Priority",
    complete: false,
  },
  {
    _id: "618c3459eddf61c49609657a",
    title: "Dishes",
    task: "Do the dishes",
    notes: "unload dishwasher",
    category: "Home",
    tags: ["another tag"],
    severity: "Low",
    complete: false,
  },
  {
    _id: "618c345feddf61c49609657c",
    title: "Laundry",
    task: "Do Laundry",
    notes: "towels",
    category: "Home",
    tags: ["towels go in hot water"],
    severity: "Average",
    complete: false,
  },
  {
    _id: "618c3469eddf61c49609657e",
    title: "Report",
    task: "Make Employee Report",
    notes: "must be done by Friday",
    category: "Work",
    tags: ["still have 3 more to review"],
    severity: "High",
    complete: false,
  },
  {
    _id: "618c3474eddf61c496096580",
    title: "Brush Teeth",
    task: "Brush my Teeth",
    notes: "",
    category: "Home",
    tags: ["tag 2"],
    severity: "Priority",
    complete: true,
  },
];

export function getTasks() {
  console.log(tasks);
  return tasks;
}

export function getTask(id) {
  return tasks.find((t) => t._id === id);
}

export function saveTask(task) {
  let taskInDb = tasks.find((t) => t._id === task._id) || {};
  taskInDb.title = task.title;
  taskInDb.task = task.task;
  taskInDb.notes = task.notes;
  taskInDb.category = task.category;
  taskInDb.tags = task.tags;
  taskInDb.severity = task.severity;

  if (!taskInDb._id) {
    taskInDb._id = Date.now().toString();
    tasks.push(taskInDb);
  }
  console.log(taskInDb);
  return taskInDb;
}

export function deleteTask(id) {
  let taskInDb = tasks.find((t) => t._id === id);
  tasks.splice(tasks.indexOf(taskInDb), 1);
  return taskInDb;
}

export function getSeverities() {
  // I did this to make it easier to follow along the videos
    // I attempted to just have an array like ['Normal', ...], and was able to figure everything out
      // except how get the severity to show in the list group. I think it's because of the valueProperty
      // for the key, but nothing I tried worked
  // ['Low', 'Average', 'High', 'Priority'] when use DB
  const severities = [
    { _id: 1, name: 'Low' },
    { _id: 2, name: 'Average' },
    { _id: 3, name: 'High' },
    { _id: 4, name: 'Priority' }
  ];
  return severities;
}
