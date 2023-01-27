import  Express  from "express";
import bodyParser from "body-parser";
const PORT=3000;
const app=Express();
let commentList=[]
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.render('all',{Day:getdate(),comments:commentList});
})
app.post('/',(req,res)=>{
    let name=req.body.username;
    let newComment=req.body.comment;
    commentList.push({username:name,comment:newComment});
    res.redirect('/')
})
function getdate(){
    let date=new Date();
    const option={
        weekday: "long",
        month: "long",
        day: "numeric",
    }

    return date.toLocaleString('en-US',option)
}

app.listen(PORT,()=>{console.log(`The server has started on port ${PORT}`)});