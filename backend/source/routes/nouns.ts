import express from "express";
import daoController from "../controllers/dao";

const router = express.Router();

router.get("/", daoController.getData);

export = router;
