const prisma = require("../prisma/client");

async function getAllPosts(req, res) {
    const posts = await prisma.post.findMany({
        where: { published: true },
        include: { author: { select: { username: true}}}
    });
    res.json(posts);
}

async function getAllPostsAdmin(req, res) {
    const posts = await prisma.post.findMany({
        include: { author: { select: { username: true } } }
    });
    res.json(posts);
}

async function getPost(req, res) {
    const post = await prisma.post.findUnique({
        where: { id: parseInt(req.params.id) },
        include: {
            author: { select: { username: true } },
            comments: { include: { author: { select: { username: true }}}}
        }
    })

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
}

async function createPost(req, res) {
    const { title, content } = req.body;

    const post = await prisma.post.create({
        data: {
            title,
            content,
            authorId: req.user.id
        }
    });

    res.status(201).json(post);
}

async function updatePost(req, res) {
    const { title, content, published } = req.body;

    const post = await prisma.post.update({
        where: { id: parseInt(req.params.id) },
        data: { title, content, published }
    });

    res.json(post);
}

async function deletePost(req, res) {
    await prisma.post.delete({
        where: { id: parseInt(req.params.id) }
    });

    res.json({ message: "Post deleted" });

}

module.exports = { getAllPosts, getAllPostsAdmin, getPost, createPost, updatePost, deletePost };