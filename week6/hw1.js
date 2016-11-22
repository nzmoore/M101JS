db.companies.aggregate( [
    { $match: { "relationships.person": { $ne: null } } },
    { $project: { name: 1, relationships: 1, _id: 0 } },
    { $unwind: "$relationships" },
    { $group: {
        _id: "$relationships.person",
        companies: { $addToSet: "$name" },
        count: { $sum: 1 }
    } },
    { $sort: { count: -1 } }
] )

