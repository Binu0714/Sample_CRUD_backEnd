import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});