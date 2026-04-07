import app from "./app";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server running on port ${PORT}!`)
});