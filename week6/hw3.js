db.companies.aggregate([
    { $match: { "founded_year": 2004 } },
    { $match: { "funding_rounds": { $exists: true, $ne: [ ]} } },
    { $project: { 
        _id: 0,
        name: 1,
        total_rounds: { $size: "$funding_rounds" },
        avgFunds: { $avg: "$funding_rounds.raised_amount" }
    } }, 
     { $match: { "total_rounds": { $gte: 5 } }},
     { $sort: { avgFunds: 1 } }
    ]).pretty()
