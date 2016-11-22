db.companies.aggregate( [
    { $match: { "relationships.person.permalink": "josh-stein" } },
    { $project: { name: 1, relationships: 1, _id: 0 } },
    { $unwind: "$relationships" },
    { $group: {
        _id: "$relationships.person",
        companies: { $addToSet: "$name" }    
    } }, 
    { $match: { "_id.permalink": "josh-stein" } }
] )

