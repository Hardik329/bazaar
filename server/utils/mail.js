import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "alt.hardik@gmail.com",
    pass: "gaykaqrxcxnwerkn",
  },
});

export const forgotPass = async (to, link) => {
  const mailOptions = {
    from: "alt.hardik@gmail.com",
    to: to,
    subject: "Reset password",
    text:
      "To reset your password click on this link: " +
      link +
      "\nThis link will expire in 10 minutes. Do not share this with anyone!",
  };

  await transporter.sendMail(
    mailOptions,
    function (error, info) {
      if (error) {
        throw error;
      }
    }
    // } else {
    //   //   console.log('Email sent: ', info.response);
    //   return null;
    // }
  );
};
