import { EventTable } from "./Custom/EventTable";
import { Sidebar } from "./Custom/Sidebar";

function App() {
  return (
    <>
      <div className="flex gap-5 justify-center items-start px-2 mt-10">
        <EventTable />
        <Sidebar />
      </div>
    </>
  );
}

export default App;
