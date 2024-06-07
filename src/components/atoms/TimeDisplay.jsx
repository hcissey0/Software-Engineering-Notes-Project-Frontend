import React from 'react'


const TimeDisplay = ({ timeString }) => {

    const time = new Date(timeString);
    const now = new Date();
    const diff = now - time;
    const intervals = [
        { name: 'year', seconds: 31536000 },
        { name: 'month', seconds: 2592000 },
        { name: 'day', seconds: 86400 },
        { name: 'hour', seconds: 3600 },
        { name: 'minute', seconds: 60 },
        { name: 'second', seconds: 1 }
    ];

    for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i];
        const count = Math.floor(diff / interval.seconds);
        if (count > 0) {
        return <span>{`${count} ${interval.name}${count > 1 ? 's' : ''} ago`} </span>;
        }
    }

    return <span>{'just now'}</span>;

}

export default TimeDisplay
