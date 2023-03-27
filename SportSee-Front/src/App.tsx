import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";
import {
  getUserInfos,
  getUserActivity,
  getUserAverageSession,
  getUserPerformance,
} from "./api/Api";
import { useParams} from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  interface DashboardData {
    dataActivity?: Object;
    dataInfos?: Object;
    dataProgression?: Object;
    dataPerformance?: Object;
  }

  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DashboardData>();

  useEffect(() => {
    const getData = async () => {
      try {
        let dataInfos = await getUserInfos(id);

        let dataActivity = await getUserActivity(id);

        let dataProgression = await getUserAverageSession(id);

        let dataPerformance = await getUserPerformance(id);

        setData({ dataInfos, dataActivity, dataProgression, dataPerformance });
      } catch (err) {
        console.log("Erreur :" + err);
      }
    };
    getData();
  }, [id]);

  return (
    <div className="App">
      <Header />
      <main>
        <Sidebar />
        <Dashboard data={data} />
      </main>
    </div>
  );
}

export default App;
