import express from 'express'
import daoController from '../controllers/dao'
import imageController from '../controllers/image'

const router = express.Router()

router.get('/dao/:slug', daoController.getData)
router.get('/image/:address/:id', imageController.getData)

export = router
