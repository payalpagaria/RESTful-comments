import  Express  from "express";
import bodyParser from "body-parser";
import { v4 } from "uuid";

const PORT=3000;
const app=Express();
const commentList=[]
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.render('all',{Day:getdate(),comments:commentList});
})
app.post('/',(req,res)=>{
    let com_id=v4();
    let name=req.body.username;
    let newComment=req.body.comment;
    commentList.push({id:com_id,username:name,comment:newComment});
    res.redirect('/')
})
app.get("/:id",(req,res)=>{
    const comment_id=req.params.id;
    res.render('show',{prid:comment_id,comments:commentList});
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