
const createEmployeeRecord = (employee) => {  
    return {
        firstName: employee[0], 
        familyName: employee[1], 
        title: employee[2], 
        payPerHour: employee[3], 
        timeInEvents: [], 
        timeOutEvents: []
    }
}

const createEmployeeRecords =  (employees) => {
    return employees.map(record => createEmployeeRecord(record))
}; 

const createTimeInEvent = (employee, dateStamp) => {
   let [date, hour] = dateStamp.split(" ")

   let timeIn = {
       type: "TimeIn",
       hour: parseInt(hour), 
       date: date
   };
     employee.timeInEvents.push(timeIn);  
     return employee;
};

const createTimeOutEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(" ");

    let timeOut = {
        type: "TimeOut", 
        hour: parseInt(hour),
        date:date
    };
    employee.timeOutEvents.push(timeOut);
    return employee;
};

const hoursWorkedOnDate = (employee, dateStamp) => {
    const {timeInEvents} = employee;
    const {timeOutEvents} = employee;
     
    const timeIn = timeInEvents.find(event => event.date === dateStamp) 
    const timeOut = timeOutEvents.find(event => event.date === timeIn.date) 
    
    const  hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;        
};
        
function wagesEarnedOnDate(employee, dateStamp) {
    const rate = employee.payPerHour;

    return hoursWorkedOnDate(employee, dateStamp) * rate;

}

const allWagesFor = (employee) => {
    const {timeInEvents} = employee;
    const {timeOutEvents} = employee;
    
    let totalWage = timeInEvents.reduce(function(accumulate, wage) { 
       return accumulate + wagesEarnedOnDate(employee, wage.date)
    }, 0);
    
    return totalWage;
};

function calculatePayroll (employee) {

    let employeeArray = Object.entries(employee)

    let fullPayRoll = employeeArray.reduce(function (acc, employee) {
        return acc+= allWagesFor(employee[1])
    }, 0)

    return fullPayRoll;
}


