module.exports = email => {
  return `
  <html>
  <body>
  <div style="text-align: center;">

  <p>${email.body}</p>
  <div>
  </div>
  <div>
  </div>
  </div>
  </body>
  </html>
  `;
};
