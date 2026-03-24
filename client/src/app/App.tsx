import routes from "./router.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthProvider } from "@/context/auth/AuthProvider.tsx";

const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
