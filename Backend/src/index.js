const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

const userRouter = require("./routes/user");
const eduRouter = require("./routes/edu");
const unsplashHandler = require("./routes/unsplash/unsplash");
app.use("/images", unsplashHandler);

app.use("/user",userRouter);
app.use("/edu",eduRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
