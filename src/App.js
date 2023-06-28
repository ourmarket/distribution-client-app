import { AppRouter } from "./router/AppRouter";
import { useLocations } from "./hooks/useLocations";

function App() {
  useLocations();
  return <AppRouter />;
}

export default App;
