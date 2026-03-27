import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/api/posts/all", {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setPosts(Array.isArray(data) ? data : []));
        }, [token]);

    async function handleDelete(id) {
        await fetch(`http://localhost:3000/api/posts/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        setPosts(posts.filter(post => post.id !== id));
    }

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <div className="dashboard-actions">
                    <Link to="/posts/new" className="btn btn-primary">New Post</Link>
                    <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <div className="post-list">
                {posts.length === 0 && (
                    <p className="empty-state">No posts yet. Create your first one!</p>
                )}
                {posts.map(post => (
                    <div key={post.id} className="post-card">
                        <div className="post-card-info">
                            <h2>{post.title}</h2>
                            <span className={`post-status ${post.published ? "published" : "draft"}`}>
                                {post.published ? "Published" : "Draft"}
                            </span>
                        </div>
                        <div className="post-card-actions">
                            <Link to={`/posts/${post.id}/edit`} className="btn btn-ghost btn-sm">Edit</Link>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(post.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
