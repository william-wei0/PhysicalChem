import app from "./app";
import "dotenv/config";

const PORT = 5173;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server running on port ${PORT}!`)
});