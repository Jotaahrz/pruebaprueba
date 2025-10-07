import fs from 'fs'
import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let { exp, coins, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)

    exp = exp || '0'
    role = role || 'Novato'

    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0]
    const _uptime = process.uptime() * 1000
    const uptime = clockString(_uptime)

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered).length
    const readMore = '\u200b'.repeat(850)

    await m.react('🐼')

    const img = `https://files.catbox.moe/3i72ww.jpg`

let tags = {};
let emojis = {
  main: "🤍",
  info: "🐼",
  config: "🔧",
  dl: "⚡",
  search: "✨",
  ia: "🤖",
  frases: "✍️",
  converter: "🔄",
  tools: "🛠️",
  gc: "👾",
  efectos: "🪻",
  fun: "😂",
  game: "🎯",
  anime: "🍬",
  maker: "🌷",
  sticker: "⚡",
  rpg: "💸",
  rg: "🪴",
  owner: "🤓"
};

const tagTitles = {
  main: "Menus",
  info: "Info",
  config: "Ajustes",
  dl: "Download",
  search: "Search",
  ia: "Inteligencias",
  frases: "Frases",
  converter: "Converters",
  tools: "Herramientas",
  gc: "Grupos",
  efectos: "Efectos",
  fun: "Diversión",
  game: "Juegos",
  anime: "Random",
  maker: "Maker",
  sticker: "Sticker",
  rpg: "Rpg",
  rg: "Registro",
  owner: "Owner"
};

for (let key in emojis) {
  tags[key] = ` *${tagTitles[key]}* ${emojis[key]}`;
}

    let defaultMenu = {


    before: `ㅤ       ゛〻 🐼 𝙈𝙚𝙣𝙪 𝙅𝙤𝙩𝙖 𝘽𝙤𝙩  ˎˊ˗

⚡︎ : ̗̀𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝒑𝒆𝒓𝒓𝒙 ${taguser} 👋
✗ ೃ‧₊› ${saludo} ⋆ 
> ¹¹ ࣪ ¹¹ Iᥒ thιs ωoɾᥣᏧ ιt's ȷυst υs 💐
₊      ・      ₊               ₊            °        ☆    ₊          ⋆.       ₊        ★                       ⊹    
       ⟡     ⊹             .        
. ∧,,,∧☆    ₊          ⋆.       ₊        
(  ̳• · • ̳)☆    ₊          ⋆.       ₊   ★               
/    づ♡ һᥲ᥎ᥱ ᥲ ᥒіᥴᥱ ძᥲᥡ ✨
${readMore}
˚⊱ - -    ⃟𝘾𝙤𝙢𝙖𝙣𝙙𝙤𝙨 - - ⊰˚•°. *࿐`,

      header: category => `╭┈┈ ✘「${category}」┈┈ ✘`,
      body: (cmd, emoji) => `┊: ̗̀${emoji} ${cmd}`,
      footer: '╰┄┄┈┈┈┄✘┈┈┈┈┈┈  ',
      after: `\n> ${dev}☄. *. ⋆`
  }

    let help = Object.values(global.plugins)
      .filter(plugin => !plugin.disabled)
      .map(plugin => ({
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags]
      }))

    let groupsByTag = {}
    for (let tag in emojis) {
      groupsByTag[tag] = help.filter(plugin => plugin.tags.includes(tag))
    }

    let menuText = [
      defaultMenu.before,
      ...Object.keys(tags).map(tag =>
        [
          defaultMenu.header(tags[tag]),
          groupsByTag[tag].flatMap(plugin => plugin.help.map(cmd => defaultMenu.body(usedPrefix + cmd, emojis[tag]))).join('\n'),
          defaultMenu.footer
        ].join('\n')
      ),
      defaultMenu.after
    ].join('\n')


   await conn.sendMessage(m.chat, {
    image: { url: img },
    caption: menuText,
    mentions: [m.sender, creadorM],
    gifPlayback: true
  }, { quoted: fkontak })

  } catch (e) {
    console.error(e)
    await m.reply('*❌ Hubo un error al generar el menú.*')
  }
}


handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|cmd)$/i;
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}