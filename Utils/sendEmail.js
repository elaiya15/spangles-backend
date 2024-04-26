const nodemailer = require ("nodemailer");

async function SendEmail(res, email, subject, text) {
	try {
	  const transporter = nodemailer.createTransport({
		host: process.env.HOST,
		service: process.env.SERVICE,
		port: Number(process.env.EMAIL_PORT),
		secure: Boolean(process.env.SECURE),
		auth: {
		  user: process.env.USER,
		  pass: process.env.PASS,
		},
	  });
  
	  await transporter.sendMail({
		from: process.env.USER,
		to: email,
		subject: subject,
		text: text,
	  });
  
	  return res.status(201).json({ message: "Email Sent Successful" });
	} catch (error) {
	  return res.status(404).json({ message: "Email Not Sent" });
	}
  }
  
module.exports = SendEmail;
