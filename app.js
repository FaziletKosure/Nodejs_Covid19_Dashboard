const express=require("express")
const api=require('novelcovid')

const app=express()

const port = process.env.PORT || 8080


app.set('views','./views');
app.set('view engine','ejs');
app.use(express.static('./public'));

app.get('/',async(req,res)=>{
    const global= await api.all();
    const countries= await api.countries({sort:'cases'})
    res.render('index',{global,countries});
})

app.get('/yesterday',async(req,res)=>{
    const yesglobal= await api.yesterday.all();
    const yescountries= await api.yesterday.countries({sort:'cases'})
    res.render('yesterday',{yesglobal,yescountries});
})

app.listen(port,()=>console.log('running on port 8080'))