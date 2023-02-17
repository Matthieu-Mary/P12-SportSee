import Header from "./components/Header";
import SessionTime from "./components/SessionTime";
import Sidebar from "./components/Sidebar";
import Title from "./components/Title";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Sidebar />
        <section className="dashboard">
          <Title />
          <SessionTime />
        </section>
      </main>
    </div>
  );
}

export default App;
