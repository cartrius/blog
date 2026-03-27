const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");

async function signup(req, res) {
    const { username, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { username, password: hashed }
    });

    res.json({ message: "User created", userId: user.id });
}

async function login(req, res) {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) { return res.status(400).json({ message: "Invalid username or password" }); }

    const match = await bcrypt.compare(password, user.password);

    if (!match) { return res.status(400).json({ message: "Invalid username or password" }); }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
}

module.exports = { signup, login };