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

const getChapter = (req, res) => {
  try {
    const { language, book, chapter } = req.params;

    const formattedBook = book.toLowerCase().replace(/\s+/g, "");
    const bookIndex = bibleBooksList.findIndex(
      (b) => b.toLowerCase().replace(/\s+/g, "") === formattedBook
    );

    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }

    const chapNum = Number(chapter);
    let totalChapters = 0;
    let mergedVerses = [];
    let langPath = language.toLowerCase();

    if (langPath === "english") {
      const filePath = path.join(__dirname, `../data/english/${formattedBook}.json`);
      if (!fs.existsSync(filePath)) {
        // Fallback for flat structure
        const fallbackPath = path.join(__dirname, `../data/${formattedBook}.json`);
        if (fs.existsSync(fallbackPath)) {
          const bibleBook = require(fallbackPath);
          bibleBook.forEach((verse) => {
            if (verse.chapterNumber && verse.chapterNumber > totalChapters) {
              totalChapters = verse.chapterNumber;
            }
          });
          const chapterVerses = bibleBook.filter((verse) => verse.chapterNumber == chapNum);
          const combined = {};
          chapterVerses.forEach((v) => {
            if (!combined[v.verseNumber]) combined[v.verseNumber] = "";
            combined[v.verseNumber] += " " + v.value;
          });
          mergedVerses = Object.keys(combined).map((key) => ({
            verseNumber: Number(key),
            value: combined[key].trim(),
          }));
        } else {
          return res.status(404).json({ message: "English book not found" });
        }
      } else {
        const bibleBook = require(filePath);
        bibleBook.forEach((verse) => {
          if (verse.chapterNumber && verse.chapterNumber > totalChapters) {
            totalChapters = verse.chapterNumber;
          }
        });
        const chapterVerses = bibleBook.filter((verse) => verse.chapterNumber == chapNum);
        const combined = {};
        chapterVerses.forEach((v) => {
          if (!combined[v.verseNumber]) combined[v.verseNumber] = "";
          combined[v.verseNumber] += " " + v.value;
        });
        mergedVerses = Object.keys(combined).map((key) => ({
          verseNumber: Number(key),
          value: combined[key].trim(),
        }));
      }
    } else if (langPath === "tamil") {
      const dirPath = path.join(__dirname, `../data/tamil`);
      let foundFile = null;
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        foundFile = files.find(
          (f) => f.toLowerCase().replace(/\s+/g, "") === `${formattedBook}.json`
        );
      }

      if (!foundFile) {
        return res.status(404).json({ message: "Tamil book not found" });
      }

      const bibleBook = require(path.join(dirPath, foundFile));
      totalChapters = Number(bibleBook.count) || bibleBook.chapters.length;
      
      const chapData = bibleBook.chapters.find((c) => String(c.chapter) === String(chapNum));
      if (chapData && chapData.verses) {
        mergedVerses = chapData.verses.map((v) => ({
          verseNumber: Number(v.verse),
          value: v.text.trim(),
        }));
      }
    } else if (["hindi", "malayalam", "kannada", "gujarati"].includes(langPath)) {
      const filePath = path.join(__dirname, `../data/${langPath}/${langPath}.json`);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: `${langPath} data not found` });
      }
      
      const fullData = require(filePath);
      const bookData = fullData.Book[bookIndex];
      
      if (!bookData) {
        return res.status(404).json({ message: "Book not found in this language" });
      }
      
      totalChapters = bookData.Chapter.length;
      const chapData = bookData.Chapter[chapNum - 1]; // 0-indexed
      
      if (chapData && chapData.Verse) {
        mergedVerses = chapData.Verse.map((v, idx) => ({
          verseNumber: idx + 1,
          value: v.Verse.trim(),
        }));
      }
    } else {
      return res.status(400).json({ message: "Language not supported" });
    }

    if (mergedVerses.length === 0) {
      return res.status(404).json({ message: "Chapter not found or contains no verses" });
    }

    const capLanguage = language.charAt(0).toUpperCase() + language.slice(1);
    const capBook = bibleBooksList[bookIndex];

    res.json({
      language: capLanguage,
      book: capBook,
      chapter: chapNum,
      totalChapters,
      verses: mergedVerses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getChapter,
};