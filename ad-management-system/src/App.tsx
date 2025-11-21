import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./constants/routes";
import { ListPage } from "./pages/ListPage/ListPage";
import { AdPage } from "./pages/AdPage/AdPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatsPage } from "./pages/StatsPage/StatsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path={AppRoutes.LIST} element={<ListPage />} />
        <Route path={AppRoutes.AD} element={<AdPage />} />
        <Route path={AppRoutes.STATS} element={<StatsPage />} />
        <Route path={AppRoutes.HOME} element={<Navigate to={AppRoutes.LIST} replace />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
