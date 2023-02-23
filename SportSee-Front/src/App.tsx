import DailyActivities from "./components/DailyActivities";
import Header from "./components/Header";
import SessionTime from "./components/SessionTime";
import Sidebar from "./components/Sidebar";
import Title from "./components/Title";
import Performance from "./components/Performance";
import Score from "./components/Score";
import Infos from "./components/Infos";

function App() {
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
