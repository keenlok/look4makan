
import "./utils/util.js";

function show() {
    // const utils = require('./utils/util');
    let rname = document.getElementById('rname').value;
    let location = document.getElementById('location').value;
    let time = (document.getElementById('time').value);
    // let date = utils.getDateInStr(document.getElementById('date').value);
    let paxNo = document.getElementById('paxNo').value;

    // let components = time.split(":");
    // let firstHalf, secondHalf;
    // let x = parseInt(components[0]);
    // if(x >= 12) {
    //     secondHalf = " PM";
    //     firstHalf = x === 12 ? 12 : x - 12;
    // }
    // else {
    //     secondHalf = " AM";
    //     firstHalf = x === 0 ? 12 : x;
    // }
    // time = firstHalf + "." + components[1] + secondHalf;

    // alert("FUCK" + utils.convert24to12Time("12:30:00"));
    alert(time);
    // alert(document.getElementById('date').value);


    if(confirm("You are trying to make a reservation for " + paxNo + " at " + rname + " located at " + location +
        " for " + date + " at " + time)) {
        if (document.getElementById('user').value === '') {
            alert("⛔️⛔⛔️⛔⛔️⛔⛔️⛔⛔️⛔⛔️⛔⛔️⛔⛔️⛔⛔️⛔⛔️⛔⛔️ \n\n\n" +
                "You need to sign in / create an account to make a reservation! \n\n " +
                "You will be directed to the home page to do so! 😊 \n\n\n" +
                "⛔️⛔⛔️⛔⛔️⛔⛔️⛔⛔️⛔⛔️⛔⛔️⛔⛔️⛔⛔️⛔⛔️⛔⛔️️");
        }
    }
}