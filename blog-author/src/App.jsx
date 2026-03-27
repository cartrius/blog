import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />
                <Route path="/posts/new" element={
                    <ProtectedRoute><NewPost /></ProtectedRoute>
                } />
                <Route path="/posts/:id/edit" element={
                    <ProtectedRoute><EditPost /></ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default App;