const dbDefault = {
    countsDef: [{title: 'Сейф', sum: 50000, id: 1}, {title: 'Гаманець', sum: 5000, id: 2}, {title: 'Картка', sum: 30000, id: 2}],
    operationsDef: [{
        id: 1,
        date: new Date(),
        groupe: 'Транспорт',
        groupeType: 'expenses',
        sum: -500,
        countId: 2
        },
        {
         id: 2,
         date: new Date(2020, 10, 15),
         groupe: 'Продукти',
         groupeType: 'expenses',
         sum: -2000,
         countId: 2
        },
        {
         id: 3,
         date: new Date(),
         groupe: 'Зарплата',
         groupeType: 'earnings',
         sum: 20000,
         countId: 2
        },
        {
         id: 4,
         date: new Date(2020, 10, 16),
         groupe: 'Аптека',
         groupeType: 'expenses',
         sum: -500,
         countId: 2
        },
        {
        id: 5,
        date: new Date(2020, 9, 16),
        groupe: 'Транспорт',
        groupeType: 'expenses',
        sum: -500,
        countId: 1
        },
        {
        id: 6,
        date: new Date(2020, 9, 26),
        groupe: 'Продукти',
        groupeType: 'expenses',
        sum: -800,
        countId: 1
        },
        {
        id: 7,
        date: new Date(2020, 9, 25),
        groupe: 'Зарплата',
        groupeType: 'earnings',
        sum: 25000,
        countId: 3
        },
        {
        id: 8,
        date: new Date(2020, 10, 25),
        groupe: 'Зарплата',
        groupeType: 'earnings',
        sum: 3250,
        countId: 1
        },
        {
        id: 9,
        date: new Date(2020, 11, 25),
        groupe: 'Зарплата',
        groupeType: 'earnings',
        sum: 1500,
        countId: 1
        },
        {
        id: 10,
        date: new Date(2020, 11, 25),
        groupe: 'Транспорт',
        groupeType: 'expenses',
        sum: -500,
        countId: 2
        },
        {
        id: 11,
        date: new Date(2020, 11, 25),
        groupe: 'Аптека',
        groupeType: 'expenses',
        sum: -1500,
        countId: 2
        },
        {
        id: 12,
        date: new Date(2020, 8, 25),
        groupe: 'Подарунки',
        groupeType: 'earnings',
        sum: 1500,
        countId: 2
        },
        {
        id: 13,
        date: new Date(2020, 8, 25),
        groupe: 'Транспорт',
        groupeType: 'expenses',
        sum: -1000,
        countId: 2
        },
        {
        id: 14,
        date: new Date(2020, 7, 25),
        groupe: 'Зарплата',
        groupeType: 'earnings',
        sum: 20000,
        countId: 2
        },
        {
        id: 15,
        date: new Date(2020, 7, 25),
        groupe: 'Продукти',
        groupeType: 'expenses',
        sum: -1500,
        countId: 2
        }
    ],
    groupeDef: [
        {
         name: 'Зарплата',
         type: 'earnings',
         id: '1'
        },
        {
        name: 'Подарунки',
        type: 'earnings',
        id: '2'
        },
        {
        name: 'Відсодки',
        type: 'earnings',
        id: '3'
        },
        {
        name: 'Продукти',
        type: 'expenses',
        id: '4'
        },
        {
         name: 'Транспорт',
         type: 'expenses',
         id: '5'
        },
        {
        name: 'Аптека',
        type: 'expenses',
        id: '6'
        },
        {
        name: 'Гулянки',
        type: 'expenses',
        id: '7'
        }
    ],
}
export default dbDefault;