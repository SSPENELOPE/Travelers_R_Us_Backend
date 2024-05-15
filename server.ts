import express, { Express } from 'express';
import db from './config/connection';

db.on('error', (error: any) => console.error(error))

db.once('open', () => console.log("Connected to db"));

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, async () => {
    console.log(`Now listening on port: ${PORT}`);
});