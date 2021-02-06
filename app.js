const express=require("express")
const api=require('novelcovid')
const bodyParser = require('body-parser');


var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

const app=express()

const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: true })); 
app.set('views','./views');
app.set('view engine','ejs');
app.use(express.static('./public'));


app.post('/yesterday', (req, res) => {
    const cntry=(req.body.filter_cntry)
      console.log(cntry)
      res.redirect('/yesterday')
    localStorage.setItem('filterCntry', cntry)
      
    //   res.render('yesterday',{cntry});
     });

app.get('/',async(req,res)=>{
    const global= await api.all();
    console.log(global)
    const countries= await api.countries({sort:'cases'})
    res.render('index',{global,countries});
})

app.get('/yesterday',async(req,res)=>{
    const x=localStorage.getItem('filterCntry')
    const yesglobal= await api.yesterday.all();
    const yescountries= await api.yesterday.countries({sort:'cases'})
    res.render('yesterday',{yesglobal,yescountries,x});
})
app.post('/chart', (req, res) => {
 const cntry=(req.body.country).toLowerCase()
   console.log(cntry)
   res.redirect('/chart')
   localStorage.setItem('myFirstKey', cntry)
  
  });

app.get('/chart',async(req,res)=>{
    
const x=localStorage.getItem('myFirstKey')
   
const mobilityData= await api.historical.countries({country:'belgium',days:7})
const locData= await api.historical.countries({country:x,days:7})
const dates=Object.keys(x ? locData.timeline.cases : mobilityData.timeline.cases)
const daethsDates=Object.keys(x ? locData.timeline.deaths : mobilityData.timeline.deaths)
const data=Object.values(x ? locData.timeline.cases : mobilityData.timeline.cases)
const deathsData=Object.values(x ? locData.timeline.deaths : mobilityData.timeline.deaths)
const country=mobilityData.country
    console.log(deathsData)
    console.log(mobilityData.country)
    console.log(localStorage.getItem('myFirstKey'))
    // localStorage.clear();
    
    res.render('chart',{dates,data,daethsDates,deathsData,x,country});
})

app.listen(port,()=>console.log('running on port 8080'))