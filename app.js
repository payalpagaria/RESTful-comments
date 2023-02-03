import  Express  from "express";
import bodyParser from "body-parser";
import { v4 } from "uuid";
import methodOverride from "method-override";

const PORT=3000;
const app=Express();
const commentList=[]
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.get('/',(req,res)=>{
    res.render('all',{Day:getdate(),comments:commentList});
})
app.get('/newcomment',(req,res)=>{
    res.render('new',{Day:getdate()});
    res.redirect('/');

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
    const comm=commentList.find(c=>c.id===comment_id);

    res.render('show',{comm});
})

app.get("/:id/edit",(req,res)=>{
    const comment_id=req.params.id;
    const comm=commentList.find(c=>c.id===comment_id);
    res.render('edit',{comm});


})
app.patch("/:id",(req,res)=>{
    const comment_id=req.params.id;
    const newcomm=req.body.comment;
    const comm=commentList.find(c=>c.id===comment_id);
    comm.comment=newcomm;
    res.redirect('/');
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