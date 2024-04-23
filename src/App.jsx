import "./App.css";
import { useVenues } from "./store";

function App() {
  const settransparentHeader = useVenues((state) => state.setTransparentHeader);
  settransparentHeader(true);
  return (
    <>
      <div className="min-h-56">Hello</div>
      <div className="min-h-56">Hello</div>
      <div className="min-h-56">Hello</div>
      <div className="min-h-56">Hello</div>
      <div className="min-h-56">Hello</div>
      <div className="min-h-56">Hello</div>
    </>
  );
}

export default App;
