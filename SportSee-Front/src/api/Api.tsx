const API_URL = 'http://localhost:3000'

// GET USER INFOS (Calories, Proteines etc ...)
export const getUserInfos = (id: number | string | undefined) =>
  fetch(`${API_URL}/user/${id}`)
    .then((res) => res.json())
    .then((data) => data.data)
    .catch(err => console.log(err));

// GET USER ACTIVITY
export const getUserActivity = (id: number | string | undefined) =>
  fetch(`${API_URL}/user/${id}/activity`)
    .then((res) => res.json())
    .then((data) => data.data)
    .catch(err => console.log(err));

//GET USER AVERAGE SESSION
export const getUserAverageSession = (id: number | string | undefined) =>
  fetch(`${API_URL}/user/${id}/average-sessions`)
    .then((res) => res.json())
    .then((data) => data.data)
    .catch(err => console.log(err));

// GET USER PERFORMANCE (Score)
export const getUserPerformance = (id: number | string | undefined) =>
  fetch(`${API_URL}/user/${id}/performance`)
    .then((res) => res.json())
    .then((data) => data.data.data)
    .catch(err => console.log(err));
