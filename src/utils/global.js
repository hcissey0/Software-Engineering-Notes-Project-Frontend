export const DOMAIN = 'http://10.132.235.181:8000'; // actual backend domain
// export const DOMAIN = 'https://software-engineering-notes-project-backend.vercel.app'; // actual backend domain

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

export const colors = ['blue', 'orange', 'green', 'pink', 'indigo', 'purple','red', 'yellow', 'sky', 'stone'];
export const getRandomColor = ()=> {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

export const saveLastVisited = ()=>{
   localStorage.setItem('last_visited',  window.location.href);
};

export const useSetting = (key)=>{
    const settings = JSON.parse(localStorage.getItem('settings')); 
    return settings[key];
};

export const isOwner = ()=>{
  return localStorage.getItem('get_notes_for') == localStorage.getItem('username');  
};

export const debounce = (func, delay)=>{
    let timer;
    return function(...args) { 
      console.log(timer);
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
