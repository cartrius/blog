require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/authRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");

const app = express();

app.use(cors({
    origin: [
        "https://blog-reader.vercel.app",
        "https://blog-author.vercel.app"
    ]
}));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));