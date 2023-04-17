import express from 'express'
import daoController from '../controllers/dao'

const router = express.Router()

router.get('/dao/:slug', daoController.getData)

export = router
