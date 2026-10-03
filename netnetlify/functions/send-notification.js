// ✅ Netlify Function - Send Push Notification + Discord
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { title, message, type, link } = JSON.parse(event.body);

  // ✅ Discord Notification
  const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;
  
  if (DISCORD_WEBHOOK) {
    const discordMessage = `**${title}**\n\n${message}\n\n${link ? `🔗 ${link}` : ''}`;
    
    try {
      await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: discordMessage,
          username: 'WHITE X STORE'
        })
      });
    } catch (error) {
      console.error('Discord error:', error);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
