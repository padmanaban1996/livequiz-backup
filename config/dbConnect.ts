import mongoose from 'mongoose';

export async function dbConnect() {
    try {
        const db =  'mongodb+srv://root:root@cluster0.0stdj.mongodb.net/insightmirrorDB?retryWrites=true&w=majority';
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Mongo Db Atlas connected successfully');

    } catch (error) {
        console.log(error.message);
    }
}

// mongodb+srv://<username>:<password>@cluster0.0stdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority