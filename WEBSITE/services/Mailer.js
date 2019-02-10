var sendgrid = require("sendgrid");
var helper = sendgrid.mail;
var keys = require("../config/keys");

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email("no-reply@emaily.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = new helper.Email(recipients);

    this.addContent(this.body);
    this.addRecipients();
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    personalize.addTo(this.recipients);
    this.addPersonalization(personalize);
  }

  // async function to send the email
  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });
    console.log("send success!");
    var response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
