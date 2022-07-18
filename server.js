import express from 'express'
import {writeFile} from 'fs';
const app = express();
import path from 'path'
const { default: store } = await import("./db/db.json", {
    assert: {
      type: "json",
    }});

console.log("store: ", store)
import {fileURLToPath} from 'url';
import { workerData } from 'worker_threads';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3000;




app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/notes', (req,res) =>{

res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

app.get('/api/notes', (req,res) =>{
res.json(store)

})

app.post('/api/notes', ({body}, res) => {
    
    body.id = store.length;

    store.push(body);
    writeFile("./db/db.json", JSON.stringify(store), err => {
        if(err) throw err;
        res.json(store);
    })
console.log("store:", store)

})

app.delete('/api/notes/:id', (req,res) =>{

    let newStore = store.filter(obj=> obj.id != req.params.id);
    writeFile("./db/db.json", JSON.stringify(newStore), err => {
        if(err) throw err;
        res.json(newStore);
    })
} )








app.listen(PORT, () =>
console.log(`Server listening at port ${PORT}`)
)
