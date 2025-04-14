

const { cmd } = require("../command");

// Command: biblelist
cmd({
    pattern: "biblelist",
    alias: ["biblebooks", "listbible", "blist"], // Ajout des alias
    desc: "Get the complete list of books in the Bible.",
    category: "fun",
    react: "📜",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        // Liste des livres de la Bible
        const bibleList = `
────────────
   📜 Old Testament
📌───────────
> ★│1. Genesis
> ★│2. Exodus
> ★│3. Leviticus
> ★│4. Numbers
> ★│5. Deuteronomy
> ★│6. Joshua
> ★│7. Judges
> ★│8. Ruth
> ★│9. 1 Samuel
> ★│10. 2 Samuel
> ★│11. 1 Kings
> ★│12. 2 Kings
> ★│13. 1 Chronicles
> ★│14. 2 Chronicles
> ★│15. Ezra
> ★│16. Nehemiah
> ★│17. Esther
> ★│18. Job
> ★│19. Psalms
> ★│20. Proverbs
> ★│21. Ecclesiastes
> ★│22. Song of Solomon
> ★│23. Isaiah
> ★│24. Jeremiah
> ★│25. Lamentations
> ★│26. Ezekiel
> ★│27. Daniel
> ★│28. Hosea
> ★│29. Joel
> ★│30. Amos
> ★│31. Obadiah
> ★│32. Jonah
> ★│33. Micah
> ★│34. Nahum
> ★│35. Habakkuk
> ★│36. Zephaniah
> ★│37. Haggai
> ★│38. Zechariah
> ★│39. Malachi
────────────

────────────
  📖 New Testament
📌───────────
> ★│1. Matthew
> ★│2. Mark
> ★│3. Luke
> ★│4. John
> ★│5. Acts
> ★│6. Romans
> ★│7. 1 Corinthians
> ★│8. 2 Corinthians
> ★│9. Galatians
> ★│10. Ephesians
> ★│11. Philippians
> ★│12. Colossians
> ★│13. 1 Thessalonians
> ★│14. 2 Thessalonians
> ★│15. 1 Timothy
> ★│16. 2 Timothy
> ★│17. Titus
> ★│18. Philemon
> ★│19. Hebrews
> ★│20. James
> ★│21. 1 Peter
> ★│22. 2 Peter
> ★│23. 1 John
> ★│24. 2 John
> ★│25. 3 John
> ★│26. Jude
> ★│27. Revelation
 ────────────
 `;

        // Remplacer ce lien par l'URL de l'image que tu m'enverras
        const imageUrl = "https://github.com/Mrhanstz/VORTEX-XMD/raw/refs/heads/main/HansTz/HansTz.jpg"; // Remplace "TON_LIEN_IMAGE_ICI" par ton lien d'image

        // Vérifier si le message de la commande est correctement reçu
        if (!m.chat) {
            return reply("❌ *An error occurred: Invalid chat.*");
        }

        // Envoi de la réponse avec l'image et la liste des livres de la Bible
        await conn.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: `📖 *BIBLE LIST BY VORTEX XMD*:\n\n` +
                     `Here is the complete list of books in the Bible:\n\n` +
                     bibleList.trim() // Ajout du texte des livres de la Bible
        }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply("❌ *An error occurred while fetching the Bible list. Please try again.*");
    }
});
