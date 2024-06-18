const express = require('express');
const { updateUser, fetchUser } = require('../controller/user');
const router=express.Router();

router.patch('/update/:id',updateUser)
      .get('/:id',fetchUser);
exports.router=router;