const express = require('express');
const authenticate = require('../middlewares/auth');
const Transaction = require('../models/Transaction');
const router = express.Router();

//Posting a new transaction
router.post('/', authenticate, async (req, res) => {
    try {
        const transaction = new Transaction({ ...req.body, user: req.user.id });
        await transaction.save();
        res.status(201).send(transaction);
    } catch (error) {
        res.status(400).send(error);
    }
});


// Get all the exsisting transactions (without filtering by user ID) with pagination
router.get('/', authenticate, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const transactions = await Transaction.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const count = await Transaction.countDocuments();

        res.send({
            transactions,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(500).send(error);
    }
})

// get all the transactions of the loggedin user  with pagination
router.get('/my', authenticate, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const transactions = await Transaction.find({ user: req.user.id })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const count = await Transaction.countDocuments({ user: req.user.id });
        res.send({ transactions, totalPages: Math.ceil(count / limit), currentPage: page });
    } catch (error) {
        res.status(500).send(error);
    }
});

//Get summary of transactions
router.get('/summary', authenticate, async (req, res) => {

    try {
        const query = {};

        if (startDate || endDate) {
            query.date = {}; // Initialize date object if date filters are provided
            if (startDate) {
                const parsedStartDate = new Date(startDate);
                if (isNaN(parsedStartDate.getTime())) {
                    return res.status(400).send({ message: 'Invalid start date format' });
                }
                query.date.$gte = parsedStartDate; // Greater than or equal to start date
            }
            if (endDate) {
                const parsedEndDate = new Date(endDate);
                if (isNaN(parsedEndDate.getTime())) {
                    return res.status(400).send({ message: 'Invalid end date format' });
                }
                query.date.$lte = parsedEndDate; // Less than or equal to end date
            }
        }

        if (category) {
            query.category = category; // Filter by category if provided
        }

        // Retrieve all transactions that match the query
        const transactions = await Transaction.find(query);

        // Calculate total income, total expenses, and balance
        const totalIncome = transactions
            .filter(transaction => transaction.type === 'income')
            .reduce((acc, transaction) => acc + transaction.amount, 0);

        const totalExpenses = transactions
            .filter(transaction => transaction.type === 'expense')
            .reduce((acc, transaction) => acc + transaction.amount, 0);

        const balance = totalIncome - totalExpenses;

        res.send({
            totalIncome,
            totalExpenses,
            balance,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

//Get month wise report of all the exsisting transactions
router.get('/month-wise-report', authenticate, async (req, res) => {
    try {
        // Aggregate transactions by month and category
        const monthlySpending = await Transaction.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$date" }, // Group by month
                        category: "$category"        // Group by category
                    },
                    totalAmount: { $sum: "$amount" } // Calculate total amount
                }
            },
            {
                $sort: { "_id.month": 1 } // Sort results by month
            }
        ]);

        res.send(monthlySpending);
    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});


// Get a specific transaction by transaction_id
router.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params; // Extract transaction ID from route params

    try {
        const transaction = await Transaction.findOne({ _id: id, user: req.user.id }); // Ensure the transaction belongs to the logged-in user

        if (!transaction) {
            return res.status(404).send({ message: 'Transaction not found' });
        }

        res.send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Updating a specific transaction by transaction_id
router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404).send({ message: 'Transaction not found' });
        }

        // Update the transaction with the new data
        Object.assign(transaction, req.body);
        await transaction.save();

        res.send({ message: "Updated transaction successfully" })
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a transaction by ID (no user ID restriction)
router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const transaction = await Transaction.findByIdAndDelete(id);

        if (!transaction) {
            return res.status(404).send({ message: 'Transaction not found' });
        }

        res.send({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});










module.exports = router;
