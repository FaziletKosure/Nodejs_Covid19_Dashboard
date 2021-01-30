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

app.get('/chart',async(req,res)=>{
    const mobilityData= await api.historical.countries({country:'belgium',days:7})
    const dates=Object.keys(mobilityData.timeline.cases)
    const daethsDates=Object.keys(mobilityData.timeline.deaths)
    const data=Object.values(mobilityData.timeline.cases)
    const deathsData=Object.values(mobilityData.timeline.deaths)
    console.log(deathsData)
    // const yescountries= await api.yesterday.countries({sort:'cases'}).then(concole.log)
    res.render('chart',{dates,data,daethsDates,deathsData});
})

app.listen(port,()=>console.log('running on port 8080'))