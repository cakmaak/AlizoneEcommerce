import { useEffect, useState } from "react";
import Toast from "./components/ui/Toast";
import AppRouter from "./routes/AppRouter";

function App() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handler = (e) => setToast(e.detail);
    window.addEventListener("toast", handler);
    return () => window.removeEventListener("toast", handler);
  }, []);

  return (
    <>
      <AppRouter />
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

export default App;
