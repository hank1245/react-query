import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import RQHeros from "./components/RQHeros";
import SuperHeroes from "./components/SuperHeroes";
import { ReactQueryDevtools } from "react-query/devtools";
import { RQHero } from "./components/RQHero";
import ParallelQueries from "./components/ParallelQueries";
import DynamicParallelQueries from "./components/DynamicParallelQueries";
import DependentQuery from "./components/DependentQuery";
import { PaginatedQuery } from "./components/PaginatedQuery";
import { InfiniteQuery } from "./components/InfiniteQuery";

function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/rq-infinite" element={<InfiniteQuery />} />
            <Route path="/rq-paginated" element={<PaginatedQuery />} />
            <Route
              path="/rq-dependent"
              element={<DependentQuery email="test@gmail.com" />}
            />
            <Route
              path="/rq-dynamic-parallel"
              element={<DynamicParallelQueries />}
            />
            <Route
              path="/rq-parallel"
              element={<ParallelQueries heroIds={[1, 3]} />}
            />
            <Route path="/rq-super-heroes/:heroId" element={<RQHero />} />
            <Route path="/super-heroes" element={<SuperHeroes />} />
            <Route path="/rq-super-heroes" element={<RQHeros />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
        </div>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
