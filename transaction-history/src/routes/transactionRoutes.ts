import { Router } from "express";
import {
  getTransactions,
  createTransaction,
} from "../controllers/transactionController";

const router = Router();

router.get("/transactions", getTransactions);
router.post("/transactions", createTransaction);

export default router;
