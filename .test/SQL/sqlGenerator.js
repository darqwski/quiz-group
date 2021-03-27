const fs = require('fs');
const filePath = './testData.sql';

const NUMBER_OF_QUIZES = 150;
const NUMBER_OF_USERS = 20;
const NUMBER_OF_GAMES = NUMBER_OF_QUIZES*10;

const QUIZ_OFFSET = 1000;
const USERS_OFFSET = 3000;
const GAMES_OFFSET = 5000;

let text = `
TRUNCATE quizes;
TRUNCATE questions;
TRUNCATE answers;
`;

console.log("Generating SQL for quizes");
for(let i =1;i<NUMBER_OF_QUIZES+1;i++){
    const quizId = QUIZ_OFFSET+i;
    text+=`
INSERT INTO \`quizes\`(
   \`quizId\`, \`name\`, \`sumOfPoints\`, \`sumOfGames\`, \`description\`, \`groupId\`,
   \`creatorId\`, \`isActive\`, \`categoryId\`, \`created\`
)
VALUES (${quizId}, 'Quiz ${i}', '0', '0', 'Quiz description ${i}', NULL, '1', '1', '1', NOW());
`;
    for(let j = 1; j< 6;j++){
        const questionId = quizId*10+j;
        text+=`
    INSERT INTO \`questions\` (\`questionId\`, \`quizId\`, \`text\`, \`type\`)
    VALUES (${questionId}, '${quizId}', 'Question ${j} for quiz ${i}', '1');
    `;
        for(let k = 1; k< 5;k++){
            text+=`
        INSERT INTO \`answers\` (\`answerId\`, \`text\`, \`isCorrect\`, \`questionId\`)
        VALUES (${questionId*10+k}, 'Answer ${k} for question ${j}', '${(j*13+k*3)%4 === 0 ? 1 : 0}', '${questionId}');
`
        }
    }
}
console.log("Generating SQL for users");

text+=`
    
    DELETE FROM users WHERE password = '63a9f0ea7bb98050796b649e85481845';
    `
for(let i = 1; i<NUMBER_OF_USERS+1;i++){
   text+=`
   INSERT INTO \`users\` (\`userId\`, \`login\`, \`password\`, \`isConfirmed\`, \`isActive\`, \`email\`, \`joined\`) 
   VALUES (${i+USERS_OFFSET}, 'user_${i}', '63a9f0ea7bb98050796b649e85481845', '1', '1', 'user_${i}@user.com', NOW());

   `
}
text+=`
    
    DELETE FROM games WHERE gameId >= ${GAMES_OFFSET} AND ${GAMES_OFFSET+NUMBER_OF_GAMES} >= gameId;
    `
console.log("Generating SQL for games");
let sumOfPoints = 0;

const userQuizes = []
for(let i = 0;i< NUMBER_OF_GAMES;i++){
    const randomUserId = USERS_OFFSET + 1 +  parseInt(Math.random() * (NUMBER_OF_USERS - 1) + 1)
    const randomQuizId = QUIZ_OFFSET + 1 +  parseInt(Math.random() * (NUMBER_OF_QUIZES - 1) + 1)
    const randomResult = Math.min(parseInt(Math.random() * 6), 5)

    if(userQuizes.some(({user, quiz})=> user === randomUserId && quiz === randomQuizId)){
        i--;
        continue;
    }

    userQuizes.push({user: randomUserId, quiz: randomQuizId});
    const gameId = GAMES_OFFSET+i;
    sumOfPoints+= randomResult;
    text+=`
INSERT INTO \`games\` (\`gameId\`, \`userId\`, \`quizId\`, \`result\`, \`start\`, \`stop\`) 
VALUES (${gameId}, '${randomUserId}', '${randomQuizId}', '${randomResult}', NOW(), NOW());
UPDATE \`quizes\` SET \`sumOfPoints\` = \`sumOfPoints\`+ ${randomResult}, \`sumOfGames\` = \`sumOfGames\`+1 
WHERE \`quizes\`.\`quizId\` = ${randomQuizId};
`;
    for(let j = 1; j< 6;j++){
        const randomAnswer = parseInt((Math.random() * 100)) % 4 + 1
        text +=`
            INSERT INTO \`user_answers\` (\`userAnswerId\`, \`userId\`, \`answerId\`, \`datetime\`, \`questonId\`,\`gameId\`)
            VALUES (NULL, '${randomUserId}', '${(randomQuizId*10+j)*10+randomAnswer}', NOW(), '${randomQuizId*10+j}', '${gameId}');
        `
    }
}

fs.writeFile(filePath, text, (result)=>{
    console.log(result)
});

console.log("Done!")
