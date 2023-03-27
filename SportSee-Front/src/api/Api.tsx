const API_URL = "http://localhost:3000";

/**
 *
 * @return {Object} Return the entire user object from API
 */

// GET USER INFOS (Calories, Proteines etc ...)
export const getUserInfos = (id: number | string | undefined) =>
  fetch(`${API_URL}/user/${id}`)
    .then((res) => res.json())
    .then((data) => data.data);

/**
 *
 * @return {Object} Return the activity data from API
 */

// GET USER ACTIVITY
export const getUserActivity = (id: number | string | undefined) =>
  fetch(`${API_URL}/user/${id}/activity`)
    .then((res) => res.json())
    .then((data) => data.data);

/**
 *
 * @return {Object} Return the average-sessions data from API
 */

//GET USER AVERAGE SESSION
export const getUserAverageSession = (id: number | string | undefined) =>
  fetch(`${API_URL}/user/${id}/average-sessions`)
    .then((res) => res.json())
    .then((data) => data.data);

/**
 *
 * @return {Object} Return the performance data from API
 */

// GET USER PERFORMANCE (Score)
export const getUserPerformance = (id: number | string | undefined) =>
  fetch(`${API_URL}/user/${id}/performance`)
    .then((res) => res.json())
    .then((data) => data.data);
