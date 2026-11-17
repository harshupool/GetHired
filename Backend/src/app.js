const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const companyRoutes = require('./routes/company.routes')
const jobRoutes = require('./routes/job.routes')
const candidateRoutes = require('./routes/candidate.routes')
const applicationRoutes = require('./routes/application.routes')

const emailRoutes = require('./routes/email.routes')

const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
]
app.use(cors({
  origin: function(origin, callback){
    if(!origin || allowedOrigins.includes(origin)){
      callback(null, true);
    }else{
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
// const upload = multer({storage: multer.memoryStorage()});



app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/candidate', candidateRoutes);
app.use("/api/applications", applicationRoutes);

app.use("/api/email", emailRoutes);




module.exports = app;