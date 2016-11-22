db.grades.aggregate([
     { $project: { _id: 0, student_id: 1,class_id: 1, scores: { $filter: {  input: "$scores", as: "score", cond: { $ne: [ "$$score.type", "quiz" ] } } }     } },
    
     { $project: {
         _id: 0,  
         class_id: 1,
         scores: 1,
         average_score: { $avg: "$scores.score" }
      } 
   } ,
    { $group : { _id : "$class_id", class_avg: { $avg: "$average_score" } } },
])
