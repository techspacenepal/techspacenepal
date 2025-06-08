const sendEmail = async ({ email, subject, message }) => {
  console.log(`To: ${email}\nSubject: ${subject}\nMessage: ${message}`);
  return Promise.resolve(); // Simulate successful send
};

export default sendEmail;
