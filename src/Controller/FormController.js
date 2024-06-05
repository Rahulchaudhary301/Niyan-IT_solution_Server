const nodemailer = require("nodemailer");

const { config } = require('dotenv')

config({ path: "../config/config.env" })

const emailId = process.env.GMAIL_ID;
const password = process.env.PASSWORD;





const FormData = async (req, res) => {
    try {
        const { name, email, contactNumber, services, message } = req.body;

        console.log("Rahul bbbbbbbbbbb")

        const transporter = nodemailer.createTransport({
            // host: 'smtp.ethereal.email',
            service: "gmail",
            auth: {
                user: emailId,
                pass: password
            }
        });


        const recipients = ["rahulchaudhary301@gmail.com","sheetalpandey555@gmail.com", "niyanitsolutions@gmail.com"];

        const info = await transporter.sendMail({
            from: emailId,
            to: recipients.join(','),
            subject: "Hello ✔",
            // text: Text,
            html: `<b>Hello Sir/Ma'am , this is Clients message 
           <h3>Name : ${name}</h3>
           <h3>Contact Number : ${contactNumber}</h3>
           <h3>Email address : ${email}</h3>
           <h3>Services : ${services}</h3>
           
           <h3>Message : ${message}</h3>
           </b>`,
        });


        const inf = await transporter.sendMail({
            from: "niyanitsolutions@gmail.com",
            to: email,
            subject: "successfull submit JSfood ✔",
            // text: Text,
            html: `<b>Hello Sir/Ma'am ,  ${name}
           <p> Thanks you sir/ma'am , your Niyan IT Solutions form has been submitted successfully.. </p>
           <p> I will Contact You as soon as Possible... </p>
           </b>`,
        });


        res.status(201).send({ status: true, data: info.messageId });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}





const CareerData = async (req, res) => {
    try {
        const { firstName, lastName, email, position, message } = req.body;
        const file = req.file;
        const pdfPath = req.file.path;


        // if (!pdfPath) {
        //     return res.status(400).send('No file uploaded.');
        // }

        // if (!file) {
        //     return res.status(400).send('No file uploaded.');
        // }

       
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: emailId,
                pass: password
            }
        });

        const recipients = ['rahulchaudhary301@gmail.com','sheetalpandey555@gmail.com', 'niyanitsolutions@gmail.com'];

        const info = await transporter.sendMail({
            from: 'your-email@example.com', // replace with your email
            to: recipients.join(','),
            subject: 'Job Application',
            html: `<b>Hello Sir/Ma'am, this is a job application</b>
                   <h3>Name: ${firstName} ${lastName}</h3>
                   <h3>Position: ${position}</h3>
                   <h3>Email address: ${email}</h3>
                   <h3>Message: ${message}</h3>`,
            attachments: [
                {
                    filename: file.originalname,
                    contentType: file.mimetype,
                    path: pdfPath
                }
            ]
        });


        // const inf = await transporter.sendMail({
        //     from: "niyanitsolutions@gmail.com",
        //     to: email,
        //     subject: "successfull submit Niyan IT Solutions ✔",
        //     // text: Text,
        //     html: `<b>Hello Sir/Ma'am ,  ${name}
        //    <p> Thanks you sir/ma'am , for applying a role of ${position} at Niyan IT Solutions form has been submitted successfully.. </p>
        //    <p> I will Contact You as soon as Possible... </p>
        //    </b>`,
        // });

        const inf = await transporter.sendMail({
            from: "niyanitsolutions@gmail.com",
            to: email,
            subject: "Successful Submission at Niyan IT Solutions ✔",
            // text: Text,
            html: `<b>Hello Sir/Ma'am, ${firstName} ${lastName}</b>
                   <p>Thanks you, sir/ma'am, for applying for the role of ${position} at Niyan IT Solutions. Your form has been submitted successfully.</p>
                   <p>I will contact you as soon as possible.</p>`
        });



       
        res.send('Form submited successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email.');
    }
};










module.exports = { FormData, CareerData }