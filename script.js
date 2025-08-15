const QUOTES = [
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
  { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "What we think, we become.", author: "Buddha" },
  { text: "Stay hungry. Stay foolish.", author: "Steve Jobs" },
  { text: "If you can dream it, you can do it.", author: "Walt Disney" },
  { text: "Well done is better than well said.", author: "Benjamin Franklin" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Fall seven times and stand up eight.", author: "Japanese Proverb" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Greed is good. (Kidding—be kind.)", author: "💡" },
  { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
  { text: "Little by little, one travels far.", author: "J.R.R. Tolkien" },
  { text: "If it matters to you, you’ll find a way.", author: "Unknown" },
  { text: "Perfection is achieved when there is nothing left to take away.", author: "Antoine de Saint-Exupéry" },
  { text: "Courage is grace under pressure.", author: "Ernest Hemingway" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { text: "Great things are done by a series of small things brought together.", author: "Vincent van Gogh" },
  { text: "If opportunity doesn’t knock, build a door.", author: "Milton Berle" },
  { text: "Move fast and build things (responsibly).", author: "—" },
  { text: "A year from now you may wish you had started today.", author: "Karen Lamb" },
  { text: "The only way out is through.", author: "Robert Frost" },
  { text: "Ship early, ship often.", author: "Product Wisdom" },
  { text: "The obstacle is the way.", author: "Stoic Saying" },
  { text: "Focus is a superpower.", author: "—" },
  { text: "If you’re going through hell, keep going.", author: "Winston Churchill" },
  { text: "Make each day your masterpiece.", author: "John Wooden" },
  { text: "Done is better than perfect.", author: "Sheryl Sandberg" },
  { text: "Discipline equals freedom.", author: "Jocko Willink" },
  { text: "Be curious, not judgmental.", author: "Walt Whitman" },
  { text: "The hard part isn’t learning a skill; it’s unlearning your limits.", author: "—" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
  { text: "Courage is the commitment to begin without any guarantee of success.", author: "Johann W. von Goethe" },
  { text: "Progress over perfection.", author: "—" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { text: "Make it simple, but significant.", author: "Don Draper" },
  { text: "If not now, when?", author: "Hillel the Elder" }
];

const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const newBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy");
const toastEl = document.getElementById("toast");

const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

let queue = shuffle(QUOTES);
let idx = -1;

function nextQuote() {
  idx++;
  if (idx >= queue.length) {
    queue = shuffle(QUOTES);
    idx = 0;
  }
  const { text, author } = queue[idx];
  quoteEl.classList.remove("quote");
  void quoteEl.offsetWidth;
  quoteEl.classList.add("quote");

  quoteEl.textContent = `“${text}”`;
  authorEl.textContent = author ? `— ${author}` : "";
  updateTweetLink(text, author);
}

async function copyCurrent(){
  const txt = `${quoteEl.textContent} ${authorEl.textContent}`.trim();
  try{
    await navigator.clipboard.writeText(txt);
    showToast("Copied!");
  } catch {
    showToast("Copy failed");
  }
}

let toastTimer;
function showToast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1400);
}

// ===== Events =====
newBtn.addEventListener("click", nextQuote);
copyBtn.addEventListener("click", copyCurrent);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    nextQuote();
  } else if (e.key.toLowerCase() === "c") {
    copyCurrent();
  }
});

nextQuote();
