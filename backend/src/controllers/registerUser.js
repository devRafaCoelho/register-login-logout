const { pool } = require("../config/register_login_logout");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || name === "" || name === " ") {
        return res.status(400).json({ message: "Name is required" });
    }

    if (!email || email === "" || email === " ") {
        return res.status(400).json({ message: "Email is required!" });
    }

    if (!password || password === "" || password === " ") {
        return res.status(400).json({ message: "Password is required!" });
    }

    try {
        const queryIsEmail = `SELECT * FROM users WHERE email = $1`;
        const paramsIsEmail = [email];

        const { rowCount: rowCountIsEmail } = await pool.query(
            queryIsEmail,
            paramsIsEmail
        );

        if (rowCountIsEmail > 0) {
            return res.status(400).json({
                message:
                    "Invalid registration data, please check and try again.",
            });
        }

        const passwordEncrypted = await bcrypt.hash(password, 10);

        const queryRegisterUser = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) returning *`;
        const paramsRegisterUser = [name, email, passwordEncrypted];

        const { rows, rowCount } = await pool.query(
            queryRegisterUser,
            paramsRegisterUser
        );

        if (rowCount <= 0) {
            return res.status(500).json({
                message: "Internal server error, please wait and try again.",
            });
        }
        const registeredUser = rows[0];
        const { password: _, ...registeredUserData } = registeredUser;

        return res.status(201).json(registeredUserData);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error, please wait and try again.",
        });
    }
};

module.exports = { registerUser };
