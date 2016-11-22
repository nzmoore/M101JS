db.companies.aggregate( [
    { $match: { "relationships.person.permalink": "eric-di-benedetto" } },
    { $project: { name: 1, relationships: 1, _id: 0 } },
    { $unwind: "$relationships" },
    { $group: {
        _id: "$relationships.person",
        companies: { $addToSet: "$name" }    
    } }, 
    { $match: { "_id.permalink": "eric-di-benedetto" } },
    { $project: {
       _id: 1,
       companies: 1,
       count: { $size: "$companies" }
    } }   
] )

