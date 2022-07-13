const mongoose = require('mongoose');
const organizationSchema = new mongoose.Schema({
    projectList: [{ type: mongoose.Types.ObjectId, ref: 'Project' }],
    userList: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    Oname: {
        type: String,
        required: true
    },
    OLocation: {
        type: String,
        required: true
    },
    ODesc: {
        type: String,
        required: true
    },
    OMail: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Organization', organizationSchema)