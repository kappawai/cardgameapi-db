const express=require('express')
const app=express()
const MongoClient=require('mongodb').MongoClient
// const date= new Date()
const PORT=3000
// ls .?* hidden files
require('dotenv').config()
// mongodb user kurofunnik pw s5Jtw7sZAN3r00wx

let db,
    dbConnectionStr = 'mongodb+srv://kurofunnik:s5Jtw7sZAN3r00wx@clusterwaiapi.wpnhuj0.mongodb.net/?retryWrites=true&w=majority',
    dbName = 'cardgame'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/',async(req,res)=>{
    const cardDeckIDs=await db.collection('carddeckid').find().toArray()
    // const viprapPerson=await db.collection('carddeckid').countDocuments({vipStatus:true})
    res.render('index.ejs',{info:cardDeckIDs})
})

app.post('/refreshGame',(req,res)=>{
    db.collection('carddeckid').insertOne({cardDeckID: req.body.cardDeckID,devdraw:req.body.devName})
    .then(result=>{
        console.log('Game initializing...')
        res.redirect('/')
    })
})

// app.delete('/deleteRapper',(req,res)=>{
//     db.collection('carddeckid').deleteOne({stageName:req.body.stageNameS})
//     .then(result=>{
//         console.log('Rapper Deleted...')
//         res.json('Rapper Deleted')
//     })
//     .catch(error=>console.error(error))
// })

app.put('/refreshDeck',(req,res)=>{
    db.collection('carddeckid').updateOne({devdraw:req.body.devName},{
        $set:{
            cardDeckID:req.body.cardDeckIDss
        }
    },{
        sort:{_id:-1},
        upsert:false
    })
    .then(result=>{
        console.log('Updating Deck..')
        res.json('Deck updated')
    })
    .catch(error=>console.error(error))
})

// app.put('/vipActivates',(req,res)=>{
//     db.collection('carddeckid').updateOne({stageName:req.body.stageNameS,birthName:req.body.birthNameS},{
//         $set:{
//             vipStatus:true
//         }
//     },{
//         sort:{_id:-1},
//         upsert:false
//     })
//     .then(result=>{
//         console.log('VIP Status is Online..')
//         res.json('VIP Status Online')
//     })
//     .catch(error=>console.error(error))
// })

// app.put('/vipDeactivates',(req,res)=>{
//     db.collection('carddeckid').updateOne({stageName:req.body.stageNameS,birthName:req.body.birthNameS},{
//         $set:{
//             vipStatus:false
//         }
//     },{
//         sort:{_id:-1},
//         upsert:false
//     })
//     .then(result=>{
//         console.log('VIP Status is Offline..')
//         res.json('VIP Status Offline')
//     })
//     .catch(error=>console.error(error))
// })

app.listen(process.env.PORT||PORT,()=>{
    console.log(`Connected to Server @ Port ${PORT}...`)
})