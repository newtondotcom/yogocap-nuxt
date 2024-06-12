export default function getMailTemplateBuying(name: string, link: string) {
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
                text-color: white;
            }
            a {
                text-decoration: none;
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
    <h1>Hey there! 🎉</h1>
    <p>I'm Robin, and I'm super excited to let you know that your <span class="accent">Yogocap</span> buying is <span class="accent">validated</span> !</p>
    <p>Firstly, I wanted to personnally thank you.</p>
    <p>Secondly, you can enjoy it right now ✨ Have fun ! </p>
    <div class="around">
        < Nuxtlink href="${link}" class="button">Enjoy it</Nuxtlink>
    </div>
    <p>If you have any questions or need further assistance, feel free to write to < Nuxtlink href="mailto:support@yogocap.com">this email</Nuxtlink>. I'm here to help! 😊</p>
    <p> Thank you so much for your trust 🫂 </p>
    <p>Best regards,<br><strong>Robin</strong> from <span class="accent">Yogocap</span></p>  
    </body>
    </html>
    `;
    const subject = `Your buying is confirmed ! 💵`;
    return { body, subject };
}