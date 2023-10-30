import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(process.env.EMAIL_SERVER_PASSWORD as string);

async function sendEmail({ req, res, identifier, url }: any) {
  try {
    // console.log("REQ.BODY", req.body);
    await sendgrid.send({
      to: identifier, // Your email where you'll receive emails
      from: {
        email: "hello@talentstark.de",
        name: "talentstark",
      },
      subject: `talentstark`,
      dynamicTemplateData: {
        url: url,
        date: Date.now().toLocaleString,
      },
      templateId: "d-3a590fb83301446fa55a9d91fea30fb5",
    });
  } catch (error) {
    // console.log(error);
    // return res.status(error.statusCode || 500).json({ error: error.message });
  }

  // return res.status(200).json({ error: "" });
}

export default sendEmail;
