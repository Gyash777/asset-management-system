const router = require('express').Router();
const upload = require('../utils/multerConfig');
const controller = require('../controllers/assetController');

router.post(
  '/',
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'files', maxCount: 5 }
  ]),
  controller.create
);

router.get('/', controller.list);
router.put(
  '/:id',
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'files', maxCount: 5 }
  ]),
  controller.update
);
router.delete('/:id', controller.delete);

module.exports = router;
