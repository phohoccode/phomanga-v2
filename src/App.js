import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import DefaultLayout from "./layout/DefaultLayout"
import publicRoutes from "../src/routers";

function App() {
  return (
    <Router>
        <Routes>
            {publicRoutes.map((route, index) => {
                const Page = route.component
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <DefaultLayout>
                                <Page/>
                            </DefaultLayout>
                        }
                    />
                )
            })}
        </Routes>
    </Router>
  );
}

export default App;
