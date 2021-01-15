const dbDefault = {
    countsDef: [{title: 'default', sum: 100, id: 1}, {title: 'second', sum: 200, id: 2}],
    operations: [{
        id: 1,
        date: new Date(),
        groupe: 'transport',
        sum: 3000,
        countId: 1
        },
        {
         id: 2,
         date: new Date(2020, 10, 15),
         groupe: 'transport',
         sum: 2000,
         countId: 2
        },
        {
         id: 3,
         date: new Date(),
         groupe: 'salary',
         sum: 1000,
         countId: 2
        },
        {
         id: 4,
         date: new Date(2020, 10, 16),
         groupe: 'transport',
         sum: 500,
         countId: 2
        },
        {
        id: 5,
        date: new Date(2020, 9, 16),
        groupe: 'transport',
        sum: 500,
        countId: 2
        },
        {
        id: 6,
        date: new Date(2020, 9, 26),
        groupe: 'transport',
        sum: 800,
        countId: 2
        },
        {
        id: 7,
        date: new Date(2020, 9, 25),
        groupe: 'salary',
        sum: 2850,
        countId: 2
        },
        {
        id: 8,
        date: new Date(2020, 10, 25),
        groupe: 'salary',
        sum: 3250,
        countId: 2
        },
        {
        id: 9,
        date: new Date(2020, 11, 25),
        groupe: 'salary',
        sum: 1500,
        countId: 2
        },
        {
        id: 10,
        date: new Date(2020, 11, 25),
        groupe: 'transport',
        sum: 1500,
        countId: 2
        },
        {
        id: 10,
        date: new Date(2020, 11, 25),
        groupe: 'transport',
        sum: 1500,
        countId: 2
        },
        {
        id: 11,
        date: new Date(2020, 8, 25),
        groupe: 'salary',
        sum: 1500,
        countId: 2
        },
        {
        id: 12,
        date: new Date(2020, 8, 25),
        groupe: 'transport',
        sum: 1000,
        countId: 2
        },
        {
        id: 13,
        date: new Date(2020, 7, 25),
        groupe: 'salary',
        sum: 1500,
        countId: 2
        },
        {
        id: 14,
        date: new Date(2020, 7, 25),
        groupe: 'transport',
        sum: 1500,
        countId: 2
        }
    ],
    groupe: [
        {
         name: 'transport',
         type: 'minus',
         id: '1'
        },
        {
         name: 'salary',
         type: 'pluse',
         id: '2'
        }
    ],
}
export default dbDefault;