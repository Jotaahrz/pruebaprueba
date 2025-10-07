const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
  let chat = global.db.data.chats[m.chat];

  // Verificación de permisos
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  if (command === 'emotag') {
    // Configurar emoji o bandera
    const selectedEmoji = args[0] || '🐼🤍'; // Emoji predeterminado si no se especifica
    chat.emojiTag = selectedEmoji; // Guardar selección en la base de datos
    await conn.sendMessage(m.chat, { 
      text: `Emoji de mención actualizado a: ${selectedEmoji}` 
    });
    return;
  }

  // Configuración del emoji o bandera por defecto
  const emoji = chat.emojiTag || '🐼🤍';

  // Mapeo manual de prefijos de números a banderas (ISO 3166-1)
  const countryFlags = {
    '52': '🇲🇽', // México
    '57': '🇨🇴', // Colombia
    '54': '🇦🇷', // Argentina
    '34': '🇪🇸', // España
    '55': '🇧🇷', // Brasil
    '1':  '🇺🇸', // Estados Unidos
    '44': '🇬🇧', // Reino Unido
    '91': '🇮🇳', // India
    '502': '🇬🇹', // Guatemala
    '56': '🇨🇱', // Chile
    '51': '🇵🇪', // Perú
    '58': '🇻🇪', // Venezuela
    '505': '🇳🇮', // Nicaragua
    '593': '🇪🇨', // Ecuador
    '504': '🇭🇳', // Honduras
    '591': '🇧🇴', // Bolivia
    '53': '🇨🇺', // Cuba
    '503': '🇸🇻', // El Salvador
    '507': '🇵🇦', // Panamá
    '595': '🇵🇾', // Paraguay
  };

  // Función para obtener la bandera según el código de país
  const getCountryFlag = (id) => {
    const phoneNumber = id.split('@')[0];
    const prefixes = [3, 2, 1]; // Prioridad de longitud de prefijo

    for (const length of prefixes) {
      const phonePrefix = phoneNumber.slice(0, length);
      if (countryFlags[phonePrefix]) return countryFlags[phonePrefix];
    }

    return '🎌'; // Predeterminado
  };

  // Obtener mensaje adicional y grupo
  const pesan = args.join` `;
  const groupMetadata = await conn.groupMetadata(m.chat);
  const groupName = groupMetadata.subject;

  // Construir mensaje
  let teks = `*${groupName}*\n\n`;
  teks += `*ᴍɪᴇᴍʙʀᴏs : ${participants.length}*\n`;
  teks += `*ᴍᴇɴsᴀᴊᴇ:${pesan}*\n\n┌✧◦ *𝐌𝐄𝐍𝐂𝐈𝐎𝐍 𝐆𝐄𝐍𝐄𝐑𝐀𝐋* ◦✧\n`;

  for (const mem of participants) {
    const flagOrEmoji = emoji === '🏁' ? getCountryFlag(mem.id) : emoji; // Usar banderas si el emoji es 🏁
    teks += `╎${flagOrEmoji} @${mem.id.split('@')[0]}\n`;
  }

  teks += `╰——————✧◦♚◦✧——————⋆\n\n> ${dev}`;

  // Enviar mensaje con menciones
  await conn.sendMessage(m.chat, { 
    text: teks,
    mentions: participants.map((a) => a.id)
  });
};

handler.help = ['todos', 'emotag'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación|emotag|t|T)$/i;
handler.admin = true;
handler.group = true;

export default handler;