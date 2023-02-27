import DailyActivities from "./components/DailyActivities";
import Header from "./components/Header";
import SessionTime from "./components/SessionTime";
import Sidebar from "./components/Sidebar";
import Title from "./components/Title";
import Performance from "./components/Performance";
import Score from "./components/Score";
import Infos from "./components/Infos";
import { useState, useEffect } from "react";
import { getUserInfos, getUserActivity, getUserAverageSession, getUserPerformance } from "./api/Api";
import { useParams } from "react-router-dom";

function App() {

  const param = useParams();
  const [userInfos, setUserInfos] = useState()
  const [userActivity, setUserActivity] = useState()
  const [userProgression, setUserProgression] = useState()
  const [userPerformance, setUserPerformance] = useState()

  useEffect(() => {
    const getData = async () => {
      try {
        let dataInfos = await getUserInfos(param.id)
        setUserInfos(dataInfos);
        
        let dataActivity = await getUserActivity(param.id);
        setUserActivity(dataActivity);

        let dataProgression = await getUserAverageSession(param.id);
        setUserProgression(dataProgression);

        let dataPerformance = await getUserPerformance(param.id);
        setUserPerformance(dataPerformance);

      } catch (err) {
        console.log("Error :" + err)
      }
    }
    getData()
  }, [param.id])

  return (
    <div className="App">
      <Header />
      <main>
        <Sidebar />
        <section className="dashboard">
          <Title />
          <DailyActivities />
          <SessionTime />
          <Performance />
          <Score />
          <Infos /> 
        </section>
      </main>
    </div>
  );
}

export default App;
