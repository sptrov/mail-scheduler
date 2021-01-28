const mailgun = require("mailgun-js");

module.exports = (config) => {
  const mg = mailgun({
    apiKey: config.mailgun.apiKey,
    domain: config.mailgun.domain
  });

  return {
    sendEMail: (emailDefinition) => {
      //field 'to' is left hardcoded from config for now because I am using the free acount 
      //which is sandboxed and can send emails to up to 3 verified!! email addresses
      const data = {
        from: "Mailgun Sandbox <postmaster@sandboxe38400d7bff1401f9bc3ca117dbef6dd.mailgun.org>",
        to: config.mailgun.to,
        subject: emailDefinition.subject,
        text: emailDefinition.body
      };
      mg.messages().send(data, function (error, body) {
        console.log(body);
      });
    }
  }
}