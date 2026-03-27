import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        await fetch("http://localhost:3000/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, content })
        });

        navigate("/");
    }

    return (
        <div className="form-page">
            <h1>New Post</h1>
            <form className="post-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Post title"
                    />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Write your post..."
                    />
                </div>
                <div className="form-footer">
                    <button className="btn btn-primary" type="submit">Create Post</button>
                    <Link to="/" className="btn btn-ghost">Cancel</Link>
                </div>
            </form>
        </div>
    )
}

export default NewPost;
