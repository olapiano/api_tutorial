const express = require('express');
const router = express.Router();
const { getAllEmployees, getEmployee, createNewEmployee, deleteEmployee, updateEmployee } = require('../../controllers/employeesController');
const ROLES_LIST = require('./../../config/rolesList');
const verifyRoles = require('./../../middleware/verifyRoles');
// const veryfiJWT = require('../../middleware/verifyJWT');

router.route('/')
    // .get(verifyJWT, getAllEmployees)
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

router.route('/:id')
    .get(getEmployee)

module.exports = router;