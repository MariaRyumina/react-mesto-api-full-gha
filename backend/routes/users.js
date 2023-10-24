const router = require('express').Router();
const { getUserByIdValidation, upgradeUserInfoValidation, upgradeAvatarValidation } = require('../middlewares/validation');

const {
  getUsers,
  getUserById,
  upgradeUserInfo,
  upgradeAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.get('/:userId', getUserByIdValidation, getUserById);
router.get('/', getUsers);
router.patch('/me', upgradeUserInfoValidation, upgradeUserInfo);
router.patch('/me/avatar', upgradeAvatarValidation, upgradeAvatar);

module.exports = router;
