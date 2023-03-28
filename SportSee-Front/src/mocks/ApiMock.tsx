import { USER_MAIN_DATA } from "./InfosMock"
import { USER_ACTIVITY } from "./DailyActivityMock"
import { USER_PERFORMANCE } from "./PerformanceMock"
import USER_AVERAGE_SESSIONS from "./SessionTimeMock"
/**
 *
 * @return {Object} Return the mocked user object from Backend
 */
export const getUserInfos = () => JSON.parse(JSON.stringify(USER_MAIN_DATA[0]))
/**
 *
 * @return {Object} Return the activity mocked data from Backend
 */
export const getUserActivity = () => JSON.parse(JSON.stringify(USER_ACTIVITY[0]))
/**
 *
 * @return {Object} Return the average-sessions mocked data from Backend
 */
export const getUserAverageSession = () => JSON.parse(JSON.stringify(USER_AVERAGE_SESSIONS[0]))
/**
 *
 * @return {Object} Return the performance mocked data from Backend
 */
export const getUserPerformance = () => JSON.parse(JSON.stringify(USER_PERFORMANCE[0]))
