import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createTransport } from 'nodemailer'; // Import createTransport from nodemailer
dotenv.config();

const PORT = 1111;

const app = express();

app.use(express.json());
app.use(cors());

app.post('/sendmail', async (req, res) => {
  const { name, email, message } = req.body;

  // Check if email exists in the database

  var transporter = createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PSW,
    },
  });

  var mailOptions = {
    from: process.env.MAIL,
    to: process.env.MAIL,
    subject: 'Email From the Portfolio',
    html: `<h1>Message for You</h1>
    <br/>
    <h2>Name : ${name}</h2>
    <br/>
    <h2>Email : ${email}</h2>
    <br/>
    <h2>Message : ${message}</h2>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'A Message has been sent to your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello! User This is a Success message from Email Server');
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
