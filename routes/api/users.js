const express = require('express');
const router = express.Router();

const { getAllUsers, getUser, deleteUser } = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteUser)

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), getUser)

module.exports = router;
