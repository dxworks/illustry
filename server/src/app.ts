import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import ProjectRoutes from './routes/project';
import IllustrationRoutes from './routes/illustrations'
import TimelineRoutes from './routes/timelineCompute'
import { connectMongoose } from './utils/dbconnection';
import { config } from "./config";
const app = express();

app.use(bodyParser.json());
connectMongoose();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.static(path.resolve(__dirname, 'static')))

app.use(IllustrationRoutes);
app.use(ProjectRoutes);
app.use(TimelineRoutes);
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});

app.listen(config.ILLUSTRY_SERVER_PORT, () => {
  return console.log(`server is listening on ${config.ILLUSTRY_SERVER_PORT}`);
});