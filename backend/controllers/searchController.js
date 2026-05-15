const path = require("path");
const fs = require("fs");

const bibleBooksList = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
  "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
  "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes",
  "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
  "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
  "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians",
  "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter",
  "1 John", "2 John", "3 John", "Jude", "Revelation"
];

const searchBible = (req, res) => {
  try {
    const { q, language } = req.query;

    if (!q || !language) {
      return res.status(400).json({ message: "Search query 'q' and 'language' parameters are required" });
    }

    const searchQuery = q.toLowerCase();
    const langPath = language.toLowerCase();
    const results = [];
    const limit = parseInt(req.query.limit) || 50; // Limit results for performance

    if (langPath === "english") {
      for (let i = 0; i < bibleBooksList.length; i++) {
        if (results.length >= limit) break;
        const bookName = bibleBooksList[i];
        const formattedBook = bookName.toLowerCase().replace(/\s+/g, "");
        
        let filePath = path.join(__dirname, `../data/english/${formattedBook}.json`);
        if (!fs.existsSync(filePath)) {
          filePath = path.join(__dirname, `../data/${formattedBook}.json`);
        }
        
        if (fs.existsSync(filePath)) {
          const bibleBook = require(filePath);
          for (const verse of bibleBook) {
            if (verse.value && verse.value.toLowerCase().includes(searchQuery)) {
              results.push({
                language: "English",
                book: bookName,
                chapter: verse.chapterNumber,
                verseNumber: verse.verseNumber,
                text: verse.value.trim()
              });
              if (results.length >= limit) break;
            }
          }
        }
      }
    } else if (langPath === "tamil") {
      const dirPath = path.join(__dirname, `../data/tamil`);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        for (let i = 0; i < bibleBooksList.length; i++) {
          if (results.length >= limit) break;
          const bookName = bibleBooksList[i];
          const formattedBook = bookName.toLowerCase().replace(/\s+/g, "");
          
          const foundFile = files.find(
            (f) => f.toLowerCase().replace(/\s+/g, "") === `${formattedBook}.json`
          );

          if (foundFile) {
            const filePath = path.join(dirPath, foundFile);
            const bibleBook = require(filePath);
            if (bibleBook.chapters) {
              for (const chapter of bibleBook.chapters) {
                if (results.length >= limit) break;
                if (chapter.verses) {
                  for (const verse of chapter.verses) {
                    if (verse.text && verse.text.toLowerCase().includes(searchQuery)) {
                      results.push({
                        language: "Tamil",
                        book: bookName,
                        chapter: parseInt(chapter.chapter),
                        verseNumber: parseInt(verse.verse),
                        text: verse.text.trim()
                      });
                      if (results.length >= limit) break;
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else if (["hindi", "malayalam", "kannada", "gujarati"].includes(langPath)) {
      const filePath = path.join(__dirname, `../data/${langPath}/${langPath}.json`);
      if (fs.existsSync(filePath)) {
        const fullData = require(filePath);
        if (fullData.Book) {
          for (let i = 0; i < fullData.Book.length; i++) {
            if (results.length >= limit) break;
            const bookData = fullData.Book[i];
            const bookName = bibleBooksList[i];
            if (bookData && bookData.Chapter) {
              for (let c = 0; c < bookData.Chapter.length; c++) {
                if (results.length >= limit) break;
                const chapterData = bookData.Chapter[c];
                if (chapterData && chapterData.Verse) {
                  for (let v = 0; v < chapterData.Verse.length; v++) {
                    const verse = chapterData.Verse[v];
                    if (verse && verse.Verse && verse.Verse.toLowerCase().includes(searchQuery)) {
                      results.push({
                        language: langPath.charAt(0).toUpperCase() + langPath.slice(1),
                        book: bookName,
                        chapter: c + 1,
                        verseNumber: v + 1,
                        text: verse.Verse.trim()
                      });
                      if (results.length >= limit) break;
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      return res.status(400).json({ message: "Language not supported" });
    }

    res.json({
      query: q,
      language: language.charAt(0).toUpperCase() + language.slice(1),
      count: results.length,
      limit,
      results
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  searchBible,
};
