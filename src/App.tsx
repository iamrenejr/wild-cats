import { BrowserRouter, Routes, Route } from "react-router-dom";

// Global styles
import "./App.scss";

// Global context
import { GlobalContext } from "./lib/hooks/useGlobalContext/context";
import { useGlobalContext } from "./lib/hooks/useGlobalContext";

// Declare routes
import Homepage from "./pages/Homepage";
import SingleCatPage from "./pages/SingleCatPage";

const App = () => {
  const contextValues = useGlobalContext();
  return (
    <GlobalContext.Provider value={contextValues}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/single-cat-page" element={<SingleCatPage />} />
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

export default App;
