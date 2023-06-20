const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/blog");
        if (conn.connection.readyState === 1) {
            console.log("DB connection is successfully");
        } else {
            console.log("DB is connecting");
        }
    } catch (error) {
        console.log("DB connection is failed!");
        console.log(error);
    }
};

module.exports = dbConnect;