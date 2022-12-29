const { pool } = require("../config/register_login_logout");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const logIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required to login!",
        });
    }

    if (email === " ") {
        return res.status(400).json({ message: "Email is required!" });
    }

    if (password === " ") {
        return res.status(400).json({ message: "Password is required!" });
    }

    try {
        const queryIsEmail = `SELECT * FROM users WHERE email = $1`;
        const paramsIsEmail = [email];

        const result = await pool.query(queryIsEmail, paramsIsEmail);

        if (!result.rowCount) {
            return res.status(404).json({
                message: "Invalid user data, check and try again.",
            });
        }

        const userFound = result.rows[0];

        const comparePassword = await bcrypt.compare(
            password,
            userFound.password
        );

        if (!comparePassword) {
            return res.status(400).json({
                message: "Invalid user data, check and try again.",
            });
        }

        const token = jwt.sign({ id: userFound.id }, "1234567890", {
            expiresIn: "1h",
        });

        const { password: _, ...userDataFound } = userFound;

        return res
            .status(200)
            .json({ user: { ...userDataFound }, token: token });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error, please wait and try again.",
        });
    }
};

module.exports = {
    logIn,
};
