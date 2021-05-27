const nodemailer = require("nodemailer");
const {connection} = require('../../config/mysql-config');

const from_email = 'dummy.email.342387@gmail.com';

module.exports.sendEmail = async (req, res) => {

    const {email, subject, body} = await req.body;

    try {

        // create transporter object with gmail service
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: from_email,
                pass: 'dummyEMAIL1',
            },
        });

        // send mail with defined transport object
        await transporter.sendMail({
            to: email,
            subject: subject,
            text: body,
        });

        // log success message
        console.log('Email successfully sent to %s', email);

        // insert email into the database
        const emailModel = {
            from_email: from_email,
            to_email: email,
            subject: subject,
            body: body,
            send_date: new Date().toISOString()
        };
        await connection.query('INSERT INTO emails SET ?', emailModel, (err, res) => {
            if (err) throw err;
            console.log('Last insert ID:', res.insertId);
        });

        // return response
        res.status(200).json({status: 200, message: `Email successfully sent to ${email}`});

    } catch (e) {
        console.log(e);
        if (e.code === 'EAUTH')
            res.status(400).json('Failed to send Email');
        else
            res.status(400).json('Email Sent but Failed to be saved into the database');
    }

}