import { Request, Response } from "express";
import Transaction from "../models/transaction";

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      startDate,
      endDate,
      transactionType,
      status,
    } = req.query;

    const filter: any = {};

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    }

    if (transactionType) {
      filter.transactionType = transactionType;
    }

    if (status) {
      filter.status = status;
    }

    const transactions = await Transaction.find(filter)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({ page, limit, transactions });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { userId, amount, transactionType, status } = req.body;

    const transaction = new Transaction({
      userId,
      amount,
      transactionType,
      status,
      date: new Date(),
    });

    const savedTransaction = await transaction.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
