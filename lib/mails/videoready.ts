export default function getMailTemplate(name : string, link : string) {
    const body = `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .accent {
                color: hsl(262.1, 83.3%, 57.8%);
                font-weight: bold;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                font-size: 16px;
                color: #fff;
                background-color: hsl(262.1, 83.3%, 57.8%);
                text-decoration: none;
                border-radius: 5px;
                width: 200px;
            }
            .around {
                text-align: center;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <h1>Hey there! 🎉</h1>
        <p>I'm Robin, and I'm super excited to let you know that your <span class="accent">Yogocap video</span> named "<span class="accent">${name}</span>" is now ready for download! 📹✨</p>
        <p>Thank you for submitting it, and I can't wait for you to see the final result. To get started, just click the button below:</p>
        <div class="around">
            <a href="${link}" class="button">Download Your Video</a>
        </div>
        <p>If you have any questions or need further assistance, feel free to write to <a href="mailto:support@yogocap.com">this email</a>. I'm here to help! 😊</p>
        <p>Best regards,<br><strong>Robin</strong> from <span class="accent">Yogocap</span></p>
    </body>
    </html>
    `;
    const subject = `Your Yogocap video "${name}" is ready for download! 🎉`;
    return { body, subject };
}