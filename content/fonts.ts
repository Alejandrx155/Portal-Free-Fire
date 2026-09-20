export type FontStyle = {
  id: string;
  label: string;
  desc: string;
  lower: string;
  upper: string;
  digits: string;
};

const DIGITS = "0123456789";

export const FONT_STYLES: FontStyle[] = [
  {
    id: "fullwidth",
    label: "Ancho completo",
    desc: "Letras y números de ancho completo (estilo japonés).",
    lower: "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ",
    upper: "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ",
    digits: "０１２３４５６７８９",
  },
  {
    id: "smallcaps",
    label: "Versalitas (small caps)",
    desc: "Todo en mayúscula pequeña: ideal para líderes de clasificación.",
    lower: "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡʏᴢ",
    upper: "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡʏᴢ",
    digits: DIGITS,
  },
  {
    id: "circled",
    label: "Círculos",
    desc: "Letras dentro de círculos: Ⓐⓑⓒ.",
    lower: "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ",
    upper: "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ",
    digits: "⓪①②③④⑤⑥⑦⑧⑨",
  },
  {
    id: "squared",
    label: "Cuadrados",
    desc: "Letras dentro de cuadros: 🄰🄱🄲.",
    lower: "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉",
    upper: "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉",
    digits: DIGITS,
  },
  {
    id: "double-struck",
    label: "Doble trazo",
    desc: "Letras matemáticas de doble trazo: 𝔸𝕓𝕔.",
    lower: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫",
    upper: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ",
    digits: "𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡",
  },
  {
    id: "fraktur",
    label: "Gótica (fraktur)",
    desc: "Letra gótica oscura: 𝔄𝔅ℭ.",
    lower: "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷",
    upper: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ",
    digits: DIGITS,
  },
  {
    id: "script",
    label: "Cursiva manuscrita",
    desc: "Estilo manuscrito elegante: 𝒜𝒷𝒸.",
    lower: "𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏",
    upper: "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵",
    digits: DIGITS,
  },
  {
    id: "monospace",
    label: "Monoespaciada",
    desc: "Fuente de máquina: 𝚊𝚋𝚌.",
    lower: "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣",
    upper: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉",
    digits: "𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿",
  },
  {
    id: "bold-serif",
    label: "Negrita serif",
    desc: "Negrita clásica: 𝐀𝐁𝐂.",
    lower: "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳",
    upper: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙",
    digits: "𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
  },
  {
    id: "italic-serif",
    label: "Cursiva serif",
    desc: "Cursiva clásica: 𝐴𝐵𝐶.",
    lower: "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧",
    upper: "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍",
    digits: DIGITS,
  },
  {
    id: "sans-bold",
    label: "Negrita sans",
    desc: "Negrita moderna sin serif: 𝗔𝗕𝗖.",
    lower: "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇",
    upper: "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭",
    digits: DIGITS,
  },
  {
    id: "sans-italic",
    label: "Cursiva sans",
    desc: "Cursiva moderna sin serif: 𝘈𝘉𝘊.",
    lower: "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻",
    upper: "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡",
    digits: DIGITS,
  },
  {
    id: "superscript",
    label: "Superíndice",
    desc: "Letras elevadas: ᵃᵇᶜ.",
    lower: "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    digits: "⁰¹²³⁴⁵⁶⁷⁸⁹",
  },
];

export function toStyle(text: string, style: FontStyle): string {
  return [...text]
    .map((ch) => {
      const c = ch.charCodeAt(0);
      if (ch >= "a" && ch <= "z") return style.lower[c - 97] ?? ch;
      if (ch >= "A" && ch <= "Z") return style.upper[c - 65] ?? ch;
      if (ch >= "0" && ch <= "9") return style.digits[c - 48] ?? ch;
      return ch;
    })
    .join("");
}