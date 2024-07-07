
// Real api. Will be uncommented

// export default class API {
//     static url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api';

//     static async status() {
//         try {
//             const res = await fetch(`${API.url}/api/status/`);
//             const data = await res.json();
//             return data;
//         } catch (err) {
//             console.error(err);
//             return null;
//         }
//     }

//     static async getNotes() {
//         try {
//             const res = await fetch(`${API.url}/api/get-notes`);
//             const data = await res.json();

//             return data;
//         } catch (err) {
//             console.error(err);
//             return null;
//         }
//     }
// }


// export default class APIs {

//     static url = 'http://localhost:3000'
//     static async status() {
//         const res = await fetch(API.url + '/');
//         const data = await res.json();
//         return data;
//     }

//     static async getNotes() {
//         const res = await fetch(API.url + '/notes');
//         const data = await res.json();
//         return data;
//     }

//     static async getNote(id) {
//         const res = await fetch(API.url + '/notes/' + id);
//         const data = await res.json();
//         return data;
//     }

//     static async createNote(note) {
//         const res = await fetch(API.url + '/notes', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(note)
//         });
//         const data = await res.json();
//         return data;
//     }

//     static async getLabels() {
//         const res = await fetch(API.url + '/labels');
//         const data = await res.json();
//         return data;
//     }

//     static async getLabel(id) {
//         const res = await fetch(API.url + '/labels/' + id);
//         const data = await res.json();
//         return data;
//     }

//     static async createLabel(label) {
//         const res = await fetch(API.url + '/labels', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(label)
//         });
//         const data = await res.json();
//         return data;
//     }
// }

// fake api. Will be commented
export default class API {
    static async status() {
        return {
            status: 'OK'
        }
    }

    static async getNotes() {
        return [
            {
                id: '1',
                title: 'Python as a note',
                label:'code',
                author: '1',
                text: 'Python is a programming language',
                created: '2021-10-10T12:00:00.000Z',
                modified: '2021-10-10T12:00:00.000Z',
            },
            {
                id: '2',
                title: 'JavaScript as a note',
                label:'code',
                author: '1',
                text: 'JavaScript is a programming language',
                created: '2021-11-10T12:00:00.000Z',
                modified: '2021-11-10T12:00:00.000Z',
            },
            {
                id: '3',
                title: 'PHP as a note',
                label:'code',
                author: '1',
                text: 'PHP is a programming language',
                created: '2021-12-11T12:00:00.000Z',
                modified: '2021-12-11T12:00:00.000Z',
            },
            {
                id: '4',
                title: 'Java as a note',
                label:'code',
                author: '1',
                text: 'Java is a programming language',
                created: '2021-12-12T12:00:00.000Z',
                modified: '2021-12-12T12:00:00.000Z',
            },
            {
                id: '5',
                title: 'Ruby as a note',
                label:'code',
                author: '1',
                text: 'Ruby is a programming language',
                created: '2021-12-13T12:00:00.000Z',
                modified: '2021-12-13T12:00:00.000Z',
            },
            {
                id: '6',
                title: 'Go as a note',
                label:'code',
                author: '1',
                text: 'Go is a programming language',
                created: '2021-12-14T12:00:00.000Z',
                modified: '2021-12-14T12:00:00.000Z',
            },
            {
                id: '7',
                title: 'Rust as a note',
                label:'code',
                author: '1',
                text: 'Rust is a programming language',
                created: '2021-12-15T12:00:00.000Z',
                modified: '2021-12-15T12:00:00.000Z',
            },
            {
                id: '8',
                title: 'C++ as a note',
                label:'code',
                author: '1',
                text: 'C++ is a programming language',
                created: '2021-12-16T12:00:00.000Z',
                modified: '2021-12-16T12:00:00.000Z',
            },
            {
                id: '9',
                title: 'C# as a note',
                label:'code',
                author: '1',
                text: 'C# is a programming language',
                created: '2021-12-17T12:00:00.000Z',
                modified: '2021-12-17T12:00:00.000Z',
            },
            {
                id: '10',
                title: 'C as a note',
                label: 'code',
                author: '1',
                text: 'C is a programming language',
                created: '2021-12-18T12:00:00.000Z',
                modified: '2021-12-18T12:00:00.000Z',
            },
            {
                id: '11',
                title: 'Swift as a note',
                label: 'code',
                author: '1',
                text: 'Swift is a programming language',
                created: '2021-12-19T12:00:00.000Z',
                modified: '2021-12-19T12:00:00.000Z',
            },
        ]
    }
}
