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

const popularVerses = [
  { book: "John", chapter: 3, verse: 16 },
  { book: "Jeremiah", chapter: 29, verse: 11 },
  { book: "Romans", chapter: 8, verse: 28 },
  { book: "Philippians", chapter: 4, verse: 13 },
  { book: "Genesis", chapter: 1, verse: 1 },
  { book: "Proverbs", chapter: 3, verse: 5 },
  { book: "Romans", chapter: 12, verse: 2 },
  { book: "Philippians", chapter: 4, verse: 6 },
  { book: "Matthew", chapter: 28, verse: 19 },
  { book: "Ephesians", chapter: 2, verse: 8 },
  { book: "Galatians", chapter: 5, verse: 22 },
  { book: "Romans", chapter: 8, verse: 38 },
  { book: "Isaiah", chapter: 41, verse: 10 },
  { book: "1 Corinthians", chapter: 13, verse: 4 },
  { book: "Romans", chapter: 15, verse: 13 },
  { book: "John", chapter: 14, verse: 6 },
  { book: "Isaiah", chapter: 9, verse: 6 },
  { book: "Psalms", chapter: 23, verse: 1 },
  { book: "Psalms", chapter: 46, verse: 1 },
  { book: "Colossians", chapter: 3, verse: 23 },
  { book: "Hebrews", chapter: 11, verse: 1 },
  { book: "James", chapter: 1, verse: 2 },
  { book: "1 Peter", chapter: 5, verse: 7 },
  { book: "1 John", chapter: 4, verse: 19 },
  { book: "Revelation", chapter: 21, verse: 4 },
  { book: "Matthew", chapter: 6, verse: 33 },
  { book: "Matthew", chapter: 11, verse: 28 },
  { book: "Joshua", chapter: 1, verse: 9 },
  { book: "Isaiah", chapter: 40, verse: 31 },
  { book: "Lamentations", chapter: 3, verse: 22 },
  { book: "Zephaniah", chapter: 3, verse: 17 },
];

const getVerseOfTheDay = (req, res) => {
  try {
    const language = req.query.language || "english";
    const langPath = language.toLowerCase();
    
    // Determine today's verse
    const day = new Date().getDate(); // 1-31
    const verseInfo = popularVerses[(day - 1) % popularVerses.length];
    const { book, chapter: chapNum, verse: verseNum } = verseInfo;

    const formattedBook = book.toLowerCase().replace(/\s+/g, "");
    const bookIndex = bibleBooksList.findIndex(
      (b) => b.toLowerCase().replace(/\s+/g, "") === formattedBook
    );

    let text = "";

    if (langPath === "english") {
      const filePath = path.join(__dirname, `../data/english/${formattedBook}.json`);
      const fallbackPath = path.join(__dirname, `../data/${formattedBook}.json`);
      const targetPath = fs.existsSync(filePath) ? filePath : fallbackPath;
      
      if (fs.existsSync(targetPath)) {
        const bibleBook = require(targetPath);
        const chapterVerses = bibleBook.filter((verse) => verse.chapterNumber == chapNum);
        
        // Find exact verse. English might have multiple values for same verse, so combine.
        const targetVerses = chapterVerses.filter(v => v.verseNumber == verseNum);
        text = targetVerses.map(v => v.value).join(" ").trim();
      }
    } else if (langPath === "tamil") {
      const dirPath = path.join(__dirname, `../data/tamil`);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        const foundFile = files.find(
          (f) => f.toLowerCase().replace(/\s+/g, "") === `${formattedBook}.json`
        );
        if (foundFile) {
          const bibleBook = require(path.join(dirPath, foundFile));
          const chapData = bibleBook.chapters?.find((c) => String(c.chapter) === String(chapNum));
          if (chapData && chapData.verses) {
            const verseObj = chapData.verses.find(v => String(v.verse) === String(verseNum));
            if (verseObj) text = verseObj.text.trim();
          }
        }
      }
    } else if (["hindi", "malayalam", "kannada", "gujarati"].includes(langPath)) {
      const filePath = path.join(__dirname, `../data/${langPath}/${langPath}.json`);
      if (fs.existsSync(filePath)) {
        const fullData = require(filePath);
        const bookData = fullData.Book && fullData.Book[bookIndex];
        if (bookData && bookData.Chapter) {
          const chapData = bookData.Chapter[chapNum - 1];
          if (chapData && chapData.Verse) {
            const verseObj = chapData.Verse[verseNum - 1];
            if (verseObj && verseObj.Verse) text = verseObj.Verse.trim();
          }
        }
      }
    }

    if (!text) {
      // Fallback
      text = "Verse text not found for this language.";
    }

    res.json({
      language: language.charAt(0).toUpperCase() + language.slice(1),
      book,
      chapter: chapNum,
      verseNumber: verseNum,
      text
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getVerseOfTheDay,
};
