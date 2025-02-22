const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1')
    const {IamAuthenticator} = require('ibm-watson/auth')

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey:api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

function urlEmotionAnalyze(urlToAnalyze,res) {
    let naturalLanguageUnderstanding = getNLUInstance();

    const analyzeParams = {
        'url': urlToAnalyze,
        'features': {
            'entities': {
            'emotion': true,
            'limit': 1
            }
        }
    }

    naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => {
        console.log(analysisResults);
        console.log(JSON.stringify(analysisResults.result.entities[0].emotion,null,2));
        return res.send(analysisResults.result.entities[0].emotion,null,2);
        //return res.send(analysisResults);
    }).catch(err => {
        return res.send("Could not do desired operation "+err);
    });
}

function urlSentimentAnalyze(urlToAnalyze,res) {
    let naturalLanguageUnderstanding = getNLUInstance();

    const analyzeParams = {
        'url': urlToAnalyze,
        'features': {
            'entities': {
            'sentiment': true,
            'limit': 1
            }
        }
    }

    naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => {
        console.log(analysisResults);
        console.log(JSON.stringify(analysisResults.result.entities[0].sentiment,null,2));
        return res.send(analysisResults.result.entities[0].emotion,null,2);
        //return res.send(analysisResults);
    }).catch(err => {
        return res.send("Could not do desired operation "+err);
    });
}

function textEmotionAnalyze(textToAnalyze,res) {
    let naturalLanguageUnderstanding = getNLUInstance();

    const analyzeParams = {
        'text': textToAnalyze,
        'features': {
            'entities': {
            'emotion': true,
            'limit': 1
            }
        }
    }

    naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => {
        console.log(analysisResults);
        console.log(JSON.stringify(analysisResults.result.entities[0].emotion,null,2));
        return res.send(analysisResults.result.entities[0].emotion,null,2);
        //return res.send(analysisResults);
    }).catch(err => {
        return res.send("Could not do desired operation "+err);
    });
}

function textSentimentAnalyze(textToAnalyze,res) {
    let naturalLanguageUnderstanding = getNLUInstance();

    const analyzeParams = {
        'text': textToAnalyze,
        'features': {
            'entities': {
            'sentiment': true,
            'limit': 1
            }
        }
    }

    naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => {
        console.log(analysisResults);
        console.log(JSON.stringify(analysisResults.result.entities[0].sentiment,null,2));
        return res.send(analysisResults.result.entities[0].emotion,null,2);
        //return res.send(analysisResults);
    }).catch(err => {
        return res.send("Could not do desired operation "+err);
    });
}

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let urlToAnalyze = req.query.url;
    urlEmotionAnalyze(urlToAnalyze,res);
});

app.get("/url/sentiment", (req,res) => {
    let urlToAnalyze = req.query.url;
    urlSentimentAnalyze(urlToAnalyze,res);
});

app.get("/text/emotion", (req,res) => {
    let textToAnalyze = req.query.text;
    textEmotionAnalyze(textToAnalyze,res);
});

app.get("/text/sentiment", (req,res) => {
    let textToAnalyze = req.query.text;
    textSentimentAnalyze(textToAnalyze,res);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

