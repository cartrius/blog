import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const token = localStorage.getItem("token")

    useEffect(() => {
        fetch(`http://localhost:3000/api/posts/${id}`)
            .then(res => res.json())
            .then(data => {
                setPost(data);
                setLoading(false);
            });
    }, [id]);

    async function handleComment(e) {
        e.preventDefault();

        const res = await fetch(`http://localhost:3000/api/comments/post/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ content: comment })
        });

        const newComment = await res.json();

        setPost(prev => ({
            ...prev,
            comments: [...prev.comments, newComment]
        }));

        setComment("");
    }

    if (loading) return <p className="post-detail">Loading...</p>;
    if (!post) return <p className="post-detail">Post not found.</p>

    return (
        <div className="post-detail">
            <h1>{post.title}</h1>
            <div className="post-meta">
                <span>By {post.author.username}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="post-content">{post.content}</p>

            <hr className="divider" />

            <div className="comments-section">
                <h3>Comments ({post.comments.length})</h3>
                {post.comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <strong>{comment.author.username}</strong>
                        <p>{comment.content}</p>
                    </div>
                ))}

                {token && (
                    <form className="comment-form" onSubmit={handleComment}>
                        <textarea
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Write a comment..."
                        />
                        <div>
                            <button className="btn btn-primary" type="submit">Post Comment</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default PostDetail;
