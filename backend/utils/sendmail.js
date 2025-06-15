import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false,
  auth: {
    user: "4422b5162050ba",
    pass: "bb664ffa797c61",
  },
});

const generateMailFormate = ({
  useremail,
  intro,
  instrution,
  redirectLink,
  color,
  buttontxt,
}) => {
  let email = {
    body: {
      name: useremail,
      intro: intro,
      action: {
        instructions: instrution,
        button: {
          color: !color ? "#22BC66" : color,
          text: buttontxt,
          link: redirectLink,
        },
      },
    },
  };

  return email;
};

const sendMail = async ({ to, subject, body }) => {
  let mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Advance Todo",
      link: "https://mailgen.js/",
      logo: "https://mailgen.js/img/logo.png",
    },
  });
  const emailBody = mailGenerator.generate(body);
  const emailText = mailGenerator.generatePlaintext(body);

  const info = await transporter.sendMail({
    from: "Advance todo",
    to,
    subject,
    text: emailText,
    html: emailBody,
  });
  console.log("Email send:", info.messageId);
};

export { generateMailFormate, sendMail };

// (async()=> {
//     const emailContent = generateVerificationMailFormate("pappuuser10@gmail.com", "Welcome to Advance Todo!", "To get Started, please Click the button below to confim your account", "https://google.com");

//     await sendMail({
//         to: "pappuuser10@gmail.com",
//         subject: "Verify your advance todo account!",
//         body: emailContent,
//     })

// })()
