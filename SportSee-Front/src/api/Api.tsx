// GET USER INFOS (Calories, Proteines etc ...)
export const getUserInfos = (id: number | string | undefined) =>
  fetch("http://localhost:3000/user/" + id)
    .then((res) => res.json())
    .then((data) => data.data);

// GET USER ACTIVITY
export const getUserActivity = (id: number | string | undefined) =>
  fetch("http://localhost:3000/user/" + id + "/activity")
    .then((res) => res.json())
    .then((data) => data.data);

//GET USER AVERAGE SESSION
export const getUserAverageSession = (id: number | string | undefined) =>
  fetch("http://localhost:3000/user/" + id + "/average-sessions")
    .then((res) => res.json())
    .then((data) => data.data);

// GET USER PERFORMANCE (Score)
export const getUserPerformance = (id: number | string | undefined) =>
  fetch("http://localhost:3000/user/" + id + "/performance")
    .then((res) => res.json())
    .then((data) => data.data.data);
