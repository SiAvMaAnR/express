import express from 'express';
import indexRouter from "./routes/index";
import "dotenv/config";

const app: any = express();
const port: number = parseInt(process.env.PORT) || 3000;
const host: string = process.env.HOST || "127.0.0.1";

app.use(express.static(`${__dirname}/assets`));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', indexRouter);

app.listen(port, host, () => {
  console.log(`Success! Server is listening on ${port}`);
});

