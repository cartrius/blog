import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/api/posts/${id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title);
                setContent(data.content);
                setPublished(data.published);
            });
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();

        await fetch(`http://localhost:3000/api/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, content, published })
        });

        navigate("/");
    }

    return (
        <div className="form-page">
            <h1>Edit Post</h1>
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
                <label className="publish-toggle">
                    <input
                        type="checkbox"
                        checked={published}
                        onChange={e => setPublished(e.target.checked)}
                    />
                    Published
                </label>
                <div className="form-footer">
                    <button className="btn btn-primary" type="submit">Save Changes</button>
                    <Link to="/" className="btn btn-ghost">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export default EditPost;
