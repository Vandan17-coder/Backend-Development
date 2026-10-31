const crypto = require("crypto");

function generateOtp() {
    return crypto.randomBytes(3).toString("hex");
}

function getOtpHtml(otp) {
    return `
        <html>
        <body>
            <h1>OTP Verification</h1>
            <p>Your OTP is: ${otp}</p>
        </body>
        </html>
    `
}

module.exports = { generateOtp, getOtpHtml }