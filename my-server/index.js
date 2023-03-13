const express=require("express")
const app=express()
const port=3000
const morgan=require("morgan")
const bodyParser=require("body-parser")
app.use(bodyParser.json())
app.use(morgan("combined"))
app.get("/",(req,res)=>{
res.send("Hello Restful API")
})
app.listen(port,()=>{
console.log(`My Server listening on port ${port}`)
})
const cors=require("cors")
app.use(cors())
let database=[
    {"BookId":"b1","BookName":"Kỹ thuật lập trình cơ bản","Price":70,"Mota":"Sách lập trình hay","updateDate":Date(Date.now),"quantity":10,"MaCD":5,"MaNXB":15,"Image":"meme.jpg"},
    {"BookId":"b2","BookName":"Kỹ thuật lập trình nâng cao","Price":100,"Mota":"Sách lập trình hay","updateDate":Date(Date.now),"quantity":10,"MaCD":5,"MaNXB":15,"Image":"meme.jpg"},
    {"BookId":"b3","BookName":"Máy học cơ bản","Price":200,"Mota":"Sách lập trình hay","updateDate":Date(Date.now),"quantity":10,"MaCD":5,"MaNXB":15,"Image":"meme.jpg"},
    {"BookId":"b4","BookName":"Máy học nâng cao","Price":300,"Mota":"Sách lập trình hay","updateDate":Date(Date.now),"quantity":10,"MaCD":5,"MaNXB":15,"Image":"meme.jpg"},
    {"BookId":"b5","BookName":"Lập trình Robot cơ bản","Price":250,"Mota":"Sách lập trình hay","updateDate":Date(Date.now),"quantity":10,"MaCD":5,"MaNXB":15,"Image":"meme.jpg"},
]
app.get("/books",cors(),(req,res)=>{
    res.send(database)
})
app.get("/books/:id",cors(),(req,res)=>{
    id=req.params["id"]
    let p=database.find(x=>x.BookId==id)
    res.send(p)
})
app.post("/books",cors(),(req,res)=>{
    //put json book into database
    database.push(req.body);
    //send message to client(send all database to client)
    res.send(database)
})
app.put("/books",cors(),(req,res)=>{
    book=database.find(x=>x.BookId==req.body.BookId)
    if(book!=null)
    {
        book.BookName=req.body.BookName
        book.Price=req.body.Price
        book.Image=req.body.Image
        book.Mota=req.body.Mota
        book.updateDate=req.body.updateDate
        book.quantity=req.body.quantity
        book.MaCD=req.body.MaCD
        book.MaNXB=req.body.MaNXB
    }
    res.send(database)
})
app.delete("/books/:id",cors(),(req,res)=>{
    id=req.params["id"]
    database = database.filter(x => x.BookId !== id);
    res.send(database)
})
