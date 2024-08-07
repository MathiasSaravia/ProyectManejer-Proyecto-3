const  mongoose  = require('mongoose');

const conectDB = async () => {
    try {

        mongoose.set('strictQuery', false);
        const connection = await mongoose.connect(process.env.DB_CONNECTION);  

        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB connected: ${url}`);

    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = conectDB