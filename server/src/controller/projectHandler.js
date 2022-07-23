const Project = require('../model/project')
const Org = require('../model/organization')
const User = require('../model/user')
const cloudinary = require('../service/cloudinaryConfig')
let getProjectListOfUser = async (user) => {
    let allProject = await Promise.all(user.projectList.map(async (item) => {
        let project = await Project.findOne({
            _id: item
        })
        return {
            id: project._id,
            image: project.projectImage,
            title: project.projectTitle,
            ava: user.avatar,
            author: user.userName,
            address: project.projectAddress,
            deadline: project.projectDeadline
        }
    }))
    return allProject
}
module.exports = {
    addUsertoOrg: async (req, res) => {
        try {
            let {
                userID,
                orgID
            } = req.body
            let org = await Org.findById(orgID)
            let userListOfOrg = org.userList
            userListOfOrg.some(element => {
                if (element === userID) {
                    return res.status(400).json({
                        message: 'User has existed '
                    })
                }
            })
            userListOfOrg.push(userID)
            await org.save()
            console.log(org)
            return res.status(200).json({
                message: 'add user to Organization success'
            })
        } catch (err) {
            return res.status(200).json({
                error: err
            })
        }
    },
    creatProByUser: async (req, res) => {
        console.log(req.body)
        try {
            let {
                userID,
                projectTitle,
                projectAddress,
                projectDeadline
            } = req.body
            let urlImgOrg = await cloudinary.uploader.upload(req.file.path)
            let project = new Project({
                projectTitle: projectTitle,
                projectAuthor: userID,
                projectAddress: projectAddress,
                projectAuthor: userID,
                projectImage: urlImgOrg.url,
                projectDeadline: projectDeadline,
            })
            await project.save()
            let userCreatePro = await User.findOneAndUpdate({
                _id: userID
            }, {
                $push: {
                    projectList: project._id
                }
            })
            return res.status(200).json({
                message: 'Create project success',
                user: userCreatePro
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    },
    findAll: async (req, res) => {
        try {
            let projectList = await Project.find().lean()
            res.status(200).json(projectList)
        } catch (err) {
            res.status(500).json({
                msg: err.message
            })
        }
    },
    findAllProjectOfUser: async (req, res) => {
        try {
            let {
                userName
            } = req.body
            let user = await User.findOne({
                userName
            })
            let allProject = await getProjectListOfUser(user)
            console.log(user)
            return res.status(200).json({
                projectList: allProject
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    },
    findAllProject: async (req, res) => {
        try {
            let user = await User.find()
            let allProject = []
            await Promise.all(user.map(async (index) => {
                let projectOfUser = await getProjectListOfUser(index)
                allProject.push(...projectOfUser)
            }))

            return res.status(200).json({
                prjectList: allProject
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
    }

}