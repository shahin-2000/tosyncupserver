const app = require('./app');
const connectDB = require('./config/db');
const { port } = require('./config/config');

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();
