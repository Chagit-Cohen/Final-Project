import { AuthProvider } from "./Authoration/AuthContext";
import Router from "./Routes/router";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
