// export const DOMAIN = 'http://localhost:8000'; // actual backend domain
export const DOMAIN = 'https://software-engineering-notes-project-backend.vercel.app'; // actual backend domain
export const JSON_DOMAIN = 'Http://localhost:3000'; // json server domain
export const FRONTEND_DOMAIN = 'http://localhost:5173'; // frontend domain

export const truncateText = (text) => {
    const words = text.split(' '); // an array of all words
    const maxWords = 4; // total number of words before ellipsis
    let truncatedText = words.slice(0, maxWords).join(' '); // part before truncation
   //  const part2 = words.slice(maxWords).join(' '); // part after truncation
    if(truncatedText.length > 20)truncatedText = truncatedText.slice(0, 20);
    return truncatedText;
}