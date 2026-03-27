const prisma = require("../prisma/client");

async function getComments(req, res) {
    const comments = await prisma.comment.findMany({
        where: { postId: parseInt(req.params.postId) },
        include: { author: { select: { username: true } } }
    });
    res.json(comments);
}

async function createComment(req, res) {
    const { content } = req.body;

    const comment = await prisma.comment.create({
        data: {
            content,
            authorId: req.user.id,
            postId: parseInt(req.params.postId)
        },
        include: { author: { select: { username: true } } }
    });

    res.status(201).json(comment)
}

async function deleteComment(req, res) {
    const comment = await prisma.comment.findUnique({
        where: { id: parseInt(req.params.id) }
    });

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.authorId !== req.user.id && req.user.role !== "AUTHOR") {
        return res.status(403).json({ message: "Not authorized" });
    }

    await prisma.comment.delete({ where: { id: parseInt(req.params.id) } });

    res.json({ message: "Comment deleted" });
}

module.exports = { getComments, createComment, deleteComment };