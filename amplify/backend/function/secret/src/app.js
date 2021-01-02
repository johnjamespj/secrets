const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')

AWS.config.update({
  region: process.env.TABLE_REGION
})

if (process.env.ENV === undefined)
  AWS.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000'
  })

const dynamodb = new AWS.DynamoDB.DocumentClient()

let tableName = "scrtstore"
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV
}

const partitionKeyName = "id"
const path = "/secret"
const hashKeyPath = `${path}/:${partitionKeyName}`
const env = process.env.ENV

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

function validateString(str, name) {
  if (str === '' || str === null || str === undefined)
    throw `${name} should not be empty`
  return str
}

function response(msg = null, view = null, error = null){
  return {
    error: error,
    msg,
    view,
  }
}

function errorResponse(error){
  return response(null, null, error)
}

app.get(hashKeyPath, function (req, res) {
  let queryParams = {
    TableName: tableName,
    Key: {
      id: req.params[partitionKeyName]
    }
  }

  dynamodb.get(queryParams, (err, data) => {
    if (err || data.Item === undefined) {
      res.statusCode = 500
      console.log(err)
      res.json(errorResponse('Couldnt find the message or invalid url!'))
    } else {
      const msg = data.Item

      if (msg.vanishMode) {
        const q = {
          TableName: tableName,
          Key: {
            id: req.params[partitionKeyName]
          }
        }

        dynamodb.delete(q, (err) => {
          if (err) {
            res.statusCode = 500
            console.log(err)
            res.json(errorResponse('Something went wrong!'))
          } else {
            res.json(response(msg.msg))
          }
        })
      } else {
        const updateParams = {
          TableName: tableName,
          ExpressionAttributeNames: {
            '#a': 'views'
          },
          ExpressionAttributeValues: {
            ':v' : 1
          },
          UpdateExpression: 'set #a = #a + :v',
          Key: {
            id: req.params[partitionKeyName]
          }
        }
        dynamodb.update(updateParams, (err) => {
          if (err) {
            res.statusCode = 500
            console.log(err)
            res.json(errorResponse('Something went wrong!'))
          } else {
            res.json(response(msg.msg, msg.views + 1))
          }
        })
      }
    }
  })

})

app.post(path, (req, res) => {
  try {
    const id = validateString(req.body.id, 'id')
    const msg = validateString(req.body.msg, 'msg')
    const vanishMode = validateString(req.body.vanishMode, 'vanishMode')

    const params = {
      TableName: tableName,
      Item: {
        [partitionKeyName]: id,
        views: 0,
        msg,
        vanishMode
      }
    }

    dynamodb.put(params, (err) => {
      if (err) {
        res.statusCode = 500
        console.log(err)
        res.json(errorResponse('Something went wrong!'))
      } else {
        res.json(response('message added!', msg.views))
      }
    })

  } catch (msg) {
    res.statusCode = 500
    res.json(errorResponse(msg))
  }
})

app.listen(3000, function () {
  console.log("App started")
})

module.exports = app
