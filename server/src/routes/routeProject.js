const express = require('express')
const route = express.Router()
const projectHandler = require('../controller/projectHandler')
const routeProject = (app) => {
   /* route.post('/AddUsertoOrg', prjHandler.addUsertoOrg)
    route.get('/FindUserProject', prjHandler.findAllProjectOfUser)
    route.get('/FindOrgProject', prjHandler.findAllProjectOfOrg)
    route.get('/FindAllUserInOrgn', prjHandler.findAllUserOfOrg)*/
    route.get('/FindAllProject', projectHandler.findAllProject)
    return app.use('/project', route)
 
}
module.exports = routeProject