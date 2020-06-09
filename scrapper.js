const request = require("request")
const cheerio = require("cheerio")
let allNoticeText = []

noticeRequest() //initial call

function noticeRequest(){
    request("https://rlacollege.edu.in/view-all-details.php",function(err,response,body){
        if(!err && response.statusCode==200){
            parseHtml(body)
        }
    })
}


function parseHtml(body){
    let $ = cheerio.load(body)
    let allNotice = $("#news a")
    let newNoticeText = []
    if(allNoticeText.length==0){
        for(let i =0;i<allNotice.length;i++){
            allNoticeText.push($(allNotice[i]).text())
        }
    }else{
        for(let i =0;i<allNotice.length;i++){
            if(allNoticeText[i]==$(allNotice[i]).text()){
                //nothing
            }else{
                allNoticeText.push($(allNotice[i]).text())
                newNoticeText.push($(allNotice[i]).text())
            }
        }
    }
    for(let i =0;i<newNoticeText.length;i++){
        console.log(newNoticeText[i])
        console.log("--------------------------------------")
    }

   
}

setInterval(function(){
    noticeRequest()
},10000)