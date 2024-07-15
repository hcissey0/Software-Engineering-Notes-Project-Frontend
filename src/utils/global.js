export const DOMAIN = 'http://localhost:8000'; // actual backend domain
export const JSON_DOMAIN = 'Http://localhost:3000'; // json server domain

export const truncateText = (text) => {
    const words = text.split(' '); // an array of all words
    const maxWords = 4; // total number of words before ellipsis
    const truncatedText = words.slice(0, maxWords).join(' '); // part before truncation
   //  const part2 = words.slice(maxWords).join(' '); // part after truncation
    return truncatedText;
}