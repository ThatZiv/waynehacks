// email templates
import constants from "./constants";

export const emailTemplate = (subject: string, content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WayneHacks</title>
</head>
<body>
 <div>
    <img src="https://i.imgur.com/ZFQDy2F.png" alt="WayneHacks banner" style="width: 100%; height: auto;" />
   	<h1>${subject}</h1>
    <div>${content}</div>
    <hr>
    <p>Best,</p>
    <img src="https://i.imgur.com/wIYr25r.png" alt="WayneHacks logo" width="150" height="auto" />
    <p>WayneHacks Team</p>
    
    <a href="${constants.linkedin}"><img width="50" height="auto" alt="LinkedIn" src="https://cdn.jsdelivr.net/gh/dmhendricks/signature-social-icons/icons/round-flat-filled/50px/linkedin.png"></a>
    <a href="${constants.instagram}"><img width="50" height="auto" alt="Instagram" src="https://cdn.jsdelivr.net/gh/dmhendricks/signature-social-icons/icons/round-flat-filled/50px/instagram.png"></a>
    <a href="${constants.discord}"><img width="50" height="auto" alt="Discord" src="https://cdn.jsdelivr.net/gh/dmhendricks/signature-social-icons/icons/round-flat-filled/50px/discord.png"></a>
    <br><br>
    <i>For any questions, comments, or concerns, reach out to us at <a href="mailto:${constants.supportEmail}">${constants.showcaseEmail}</a>. For more information, check out the <a href="${constants.infoPacket}">information packet</a>.</i>
 </div>
</body>
</html>
`;
