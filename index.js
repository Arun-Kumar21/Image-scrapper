const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const path = require("path");

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));

app.listen(port , ()=>{
    console.log(`sever running on port ${port}`)
})

app.get('/' , (req , res)=>{
    res.sendFile(path.join(__dirname , "template/index.html"))
})


const articles = []

app.post('/images' , (req , res)=>{
    const {webUrl} = req.body;

    axios.get(webUrl).then(response=>{
        const html = response.data;
        const $ = cheerio.load(html);

        $(`img` , html).each(function () {
            const imgDesc = $(this).attr('alt');
            const imgUrl = $(this).attr('src');
            articles.push({
                imgDesc ,
                imgUrl
            })
        })
        res.send(articles)
    }).catch(err => {
        console.log(err);
    })
})
