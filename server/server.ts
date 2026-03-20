import app from "./app";

const PORT = 5173;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log("Server running!")
});