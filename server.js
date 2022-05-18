import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import morgan from 'morgan';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import brandRoute from './routes/brandRoute.js';
import productRoute from './routes/productRoute.js';
import purchaseRoute from './routes/purchaseRoute.js';
import saleRoute from './routes/saleRoute.js';
import dashRoute from './routes/dashRoute.js';
import expenseRoute from './routes/expenseRoute.js';
import customerRoute from './routes/customerRoute.js';
import userRoute from './routes/userRoute.js';
import storeRoute from './routes/storeRoute.js';
import employeeRoute from './routes/employeeRoute.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'POS API',
			version: '0.0.1',
		},
	},
	apis: ['app.js', './routes/*.js', './models/*.js', './swagger/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(cors());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.use('/auth', authRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/brands', brandRoute);
app.use('/api/products', productRoute);
app.use('/api/purchases', purchaseRoute);
app.use('/api/sales', saleRoute);
app.use('/api/dashboard', dashRoute);
app.use('/api/expenses', expenseRoute);
app.use('/api/customers', customerRoute);
app.use('/api/self', userRoute);
app.use('/api/store', storeRoute);
app.use('/api/employee', employeeRoute);

// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`));
