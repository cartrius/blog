import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/api/posts")
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="page">Loading...</p>;

    return (
        <div className="page">
            <h1 className="page-title">Blog Posts</h1>
            <div className="post-list">
                {posts.map(post => (
                    <div key={post.id} className="post-card">
                        <h2>
                            <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        </h2>
                        <div className="post-meta">
                            <span>By {post.author.username}</span>
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostList;
