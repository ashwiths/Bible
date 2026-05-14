// Sample Bible data for demo — replace with API in Phase 2
export const bibleData = {
  Genesis: {
    1: [
      { en: "In the beginning God created the heavens and the earth.", ta: "ஆதியிலே தேவன் வானத்தையும் பூமியையும் சிருஷ்டித்தார்." },
      { en: "Now the earth was formless and empty, darkness was over the surface of the deep.", ta: "பூமி ரூபமற்று வெறுமையாய் இருந்தது; ஆழத்தின்மேல் இருள் இருந்தது." },
      { en: "And God said, \"Let there be light,\" and there was light.", ta: "தேவன் வெளிச்சம் உண்டாகக்கடவது என்றார், வெளிச்சம் உண்டாயிற்று." },
      { en: "God saw that the light was good, and he separated the light from the darkness.", ta: "வெளிச்சம் நல்லது என்று தேவன் கண்டார்; அந்தகாரத்தை வெளிச்சத்தினின்று பிரித்தார்." },
      { en: "God called the light \"day,\" and the darkness he called \"night.\"", ta: "தேவன் வெளிச்சத்திற்கு பகல் என்று பேரிட்டார்; அந்தகாரத்திற்கு இரவு என்று பேரிட்டார்." },
    ],
  },
  Psalms: {
    23: [
      { en: "The Lord is my shepherd, I lack nothing.", ta: "கர்த்தர் என் மேய்ப்பர், என்னுடைய குறைவுகள் இராவு." },
      { en: "He makes me lie down in green pastures, he leads me beside quiet waters,", ta: "அவர் என்னை பசும்புல் வெளிகளிலே படுக்கப்பண்ணுகிறார்; அமர்ந்த தண்ணீர்களண்டை என்னை நடத்துகிறார்." },
      { en: "he refreshes my soul. He guides me along the right paths for his name's sake.", ta: "என் ஆத்துமாவை அவர் தேற்றுகிறார்; தமது நாமத்தினிமித்தம் என்னை நீதியின் வழிகளில் நடத்துகிறார்." },
      { en: "Even though I walk through the darkest valley, I will fear no evil, for you are with me.", ta: "மரணத்தின் நிழல் வாடியிலே நடந்தாலும் பொல்லாங்கை பயப்படேன்; நீர் என்னோடிருக்கிறீர்." },
      { en: "Surely your goodness and love will follow me all the days of my life.", ta: "என் ஆயுசு நாளெல்லாம் தயவும் கிருபையும் என்னைப் பின்தொடரும்." },
    ],
    119: [
      { en: "Your word is a lamp for my feet, a light on my path.", ta: "உம்முடைய வசனம் என் கால்களுக்கு தீபமும், என் பாதைக்கு வெளிச்சமுமாயிருக்கிறது." },
    ],
  },
  John: {
    3: [
      { en: "For God so loved the world that he gave his one and only Son,", ta: "தேவன், தம்முடைய ஒரேபேறான குமாரனை விசுவாசிக்கிறவன் எவனோ அவன் கெட்டுப்போகாமல்." },
      { en: "that whoever believes in him shall not perish but have eternal life.", ta: "நித்தியஜீவனை அடையும்படிக்கு, அவரை இந்த உலகத்திலே அனுப்பும் அளவிற்கு உலகத்தில் அவ்வளவு அன்பு கூர்ந்தார்." },
      { en: "For God did not send his Son into the world to condemn the world,", ta: "தேவன் தம்முடைய குமாரனை உலகத்தை ஆக்கினைக்குட்படுத்த அனுப்பவில்லை." },
      { en: "but to save the world through him.", ta: "அவராலே உலகம் இரட்சிக்கப்படுவதற்காக அனுப்பினார்." },
    ],
  },
};

export const books = Object.keys(bibleData);

export const featuredVerses = [
  { book: "John 3:16",   text: "For God so loved the world that he gave his one and only Son.", ta: "தேவன் உலகத்தில் அவ்வளவு அன்பு கூர்ந்தார்." },
  { book: "Psalm 23:1",  text: "The Lord is my shepherd, I lack nothing.", ta: "கர்த்தர் என் மேய்ப்பர், என்னுடைய குறைவுகள் இராவு." },
  { book: "Phil 4:13",   text: "I can do all this through him who gives me strength.", ta: "என்னை பலப்படுத்துகிற கிறிஸ்துவினால் எல்லாவற்றையும் செய்யக்கூடும்." },
  { book: "Jer 29:11",   text: "For I know the plans I have for you, plans to prosper you.", ta: "உங்களுக்கு நன்மை செய்யவும், உங்களுக்கு நம்பிக்கையான எதிர்காலம் கொடுக்கவும் நான் நினைக்கிறேன்." },
  { book: "Psalm 119:105", text: "Your word is a lamp for my feet, a light on my path.", ta: "உம்முடைய வசனம் என் கால்களுக்கு தீபமும், என் பாதைக்கு வெளிச்சமுமாயிருக்கிறது." },
  { book: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him.", ta: "தேவனிடத்தில் அன்புகூர்கிறவர்களுக்கு எல்லாவற்றிலும் நன்மையுண்டாகும்." },
];

export const readingPlans = [
  { icon: "📖", title: "Bible in a Year", desc: "Read through the entire Bible in 365 days with structured daily readings.", progress: 34 },
  { icon: "🙏", title: "Morning Devotions", desc: "Start each day with a short, powerful passage and reflection.", progress: 60 },
  { icon: "🕊️", title: "Psalms Journey", desc: "Experience all 150 Psalms in a 30-day guided journey.", progress: 10 },
  { icon: "✝️", title: "New Testament",   desc: "Complete the New Testament in 90 days.", progress: 0 },
];

export const dailyVerse = {
  text: "Your word is a lamp for my feet, a light on my path.",
  ta:   "உம்முடைய வசனம் என் கால்களுக்கு தீபமும், என் பாதைக்கு வெளிச்சமுமாயிருக்கிறது.",
  ref:  "Psalm 119:105",
};
