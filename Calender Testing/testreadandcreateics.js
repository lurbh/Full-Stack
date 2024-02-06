const readExcel = require('read-excel-file/node');
const ics = require('ics');
const { writeFileSync } = require('fs')

const enumMonth = {
    "Jan" : 1,
    "Feb" : 2,
    "Mar" : 3,
    "April" : 4,
    "Apr" : 4,
}

class DaySchedule 
{
    constructor(day,date,topic,topicmorning,topicafternoon){
        this.day = day;
        this.date = date;
        this.topic = topic;
        this.topicmorning = topicmorning;
        this.topicafternoon = topicafternoon;
    }

        PrintSchedue(){
        let toPrint = `Day: ${this.day}, Date: ${this.date}, Topic: ${this.topic}, Morning Topic: ${this.topicmorning}, Afternoon Topic: ${this.topicafternoon}`;
        console.log(toPrint);
    }
}


async function ReadExcelFile(Calenderlist)
{
    readExcel('./Jan FT 2024 Bells 2.xlsx').then((data) => {
    for (i in data) {
        if (data[i][1] != null && data[i][1] != 'Day' && data[i][1] != 'Saturday' && data[i][1] != 'Sunday' && data[i][4] != 'Good Friday')
        { 
            //console.log(typeof(data[i][2]));
            const calenderEntry = new DaySchedule(data[i][1],data[i][2],data[i][3],data[i][4],data[i][5]);
            //console.log(calenderEntry);
            //calenderEntry.PrintSchedue();
            Calenderlist.push(calenderEntry);
        }
    }
    return;
    //console.log(Calenderlist);
    let events = [];
    for (let item of Calenderlist)
    {
        let title = item.topic;
        let date = item.date.split(" ");
        let matches = date[0].match(/(\d+)/);
        let day = parseInt(matches[0]);
        let month = enumMonth[date[1]];
        //console.log(`Day: ${day}, Month: ${month}`);
        let start1 = [2024,month,day,10,0];
        let start2 = [2024,month,day,14,0];
        let duration = { hours: 3}
        let event1 = {
            title: item.topicmorning ? item.topicmorning : item.topic,
            start: start1,
            duration: duration
        }
        let event2 = {
            title: item.topicafternoon ? item.topicafternoon : item.topic,
            start: start2,
            duration: duration
        }
        //console.log(event1);
        events.push(event1);
        events.push(event2);
    }
    //console.log(events);
    const { error, value } = ics.createEvents(events)
      
      if (error) {
        console.log(error)
        return
      }
      
      console.log(value)
      writeFileSync(`Jan FT 2024 Bells 2.ics`, value)
    })
}

function loadICS(Calenderlist)
{
    let events = [];
    for (let item of Calenderlist)
    {
        let title = item.topic;
        let date = item.date.split(" ");
        let matches = date[0].match(/(\d+)/);
        let day = parseInt(matches[0]);
        let month = enumMonth[date[1]];
        //console.log(`Day: ${day}, Month: ${month}`);
        let start1 = [2024,month,day,10,0];
        let start2 = [2024,month,day,14,0];
        let duration = { hours: 3}
        let event1 = {
            title: item.topicmorning ? item.topicmorning : item.topic,
            start: start1,
            duration: duration
        }
        let event2 = {
            title: item.topicafternoon ? item.topicafternoon : item.topic,
            start: start2,
            duration: duration
        }
        //console.log(event1);
        events.push(event1);
        events.push(event2);
    }
    //console.log(events);
    const { error, value } = ics.createEvents(events)
      
      if (error) {
        console.log(error)
        return
      }
      
      console.log(value)
      writeFileSync(`Jan FT 2024 Bells 2 async.ics`, value)
}

async function main() 
{
    let Calenderlist = []
    ReadExcelFile(Calenderlist);
    console.log(await Calenderlist);
}

main();