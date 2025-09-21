import nodemailer from 'nodemailer'

export const sendEmail = async ({to, subject, html}) => {
    const transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zezekhaled13@gmail.com',
            pass: 'llop rssz ywfk tfxt'
        }
    })
    await transpoter.sendMail({
        to,
        from: "'<e-commerce>'zezekhaled13@gmail.com",
        subject,
        html
    })
}