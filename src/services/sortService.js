export default class sortService {
    getAllEarnings = (dataArr) => {
        return dataArr.filter(item=>item.groupeType === 'earnings')
    } 

    getAllExpenses = (dataArr) => {
        return dataArr.filter(item=>item.groupeType === 'expenses')
    } 

    groupedByDate = (dataArr) => {
        const formatDataArr = dataArr.sort((a, b)=>new Date(b.date) - new Date(a.date)).map(item=>{
            return {
                ...item,
                date: new Date(item.date).toLocaleDateString('uk', {day: 'numeric', month: 'long', year: 'numeric'})
            }     
        });

        const uniqueDate = [...new Set(formatDataArr)];

        let obj = {};

        uniqueDate.forEach(item=>{
            let title = item.date;
            let arr = [];
            dataArr.forEach(elem=>{
                if (item.date === new Date(elem.date).toLocaleDateString('uk', {day: 'numeric', month: 'long', year: 'numeric'})){
                    arr = [...arr, elem];
                    obj[title] = arr;
                }
            })
        })
        return obj
    }

    groupedByMonth = (dataArr) => {
        const earningsArr = this.getAllEarnings(dataArr);
        const expensesArr = this.getAllExpenses(dataArr);
        
        const earningsByDate = this.groupedByDate(earningsArr);
        const expensesByDate = this.groupedByDate(expensesArr);

        console.log(expensesArr)

    }
}