const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email("no-reply@emaily.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = new helper.Email(recipients);
    this.addClickTracking();

    this.addContent(this.body);
    this.addRecipients();
  }

  // formatAddresses(recipients) {
  //   // return recipients.map(({ email }) => {
  //   //   return new helper.Email(email);
  //   // });
  //   return new
  // }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    personalize.addTo(this.recipients);
    // this.recipients.forEach(recipient => {
    //   personalize.addTo(recipient);
    // });
    this.addPersonalization(personalize);
  }

  //构造需要时间
  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
