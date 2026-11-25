/*
  email.js: puts the email address into every mail link when the page loads.
  The PRD says the address must never be written in the page's HTML, because
  spam bots scan pages for anything that looks like name@domain. So it's kept
  here in two pieces, each written backwards, and only joined in the
  visitor's browser. Without JavaScript, the mail links go to the contact
  card instead.
*/

// Each piece is reversed: split into letters, reverse the order, join again.
const unscramble = (text) => text.split('').reverse().join('');
const address = `${unscramble('0380iihcaasi')}@${unscramble('moc.liamg')}`;

// The mail icons (marked with data-email) and the "Email me" button.
document.querySelectorAll('[data-email], #email-button').forEach((link) => {
  link.href = `mailto:${address}`;
});
