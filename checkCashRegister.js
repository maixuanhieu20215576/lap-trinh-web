function checkCashRegister(price, cash, cid) {
    const currencyUnits = [
        ["PENNY", 0.01],
        ["NICKEL", 0.05],
        ["DIME", 0.1],
        ["QUARTER", 0.25],
        ["ONE", 1],
        ["FIVE", 5],
        ["TEN", 10],
        ["TWENTY", 20],
        ["ONE HUNDRED", 100],
    ];
    
    let changeDue = cash - price;
    let totalCID = 0;
    let changeArr = [];

    for (let i = 0; i < cid.length; i++) {
        totalCID += cid[i][1];
    }

    totalCID = parseFloat(totalCID.toFixed(2));

    if (totalCID < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    
    if (totalCID == changeDue) {
        return { status: "CLOSED", change: cid };
    }

    cid = cid.reverse();

    for (let i = 0; i < currencyUnits.length; i++) {
        let currencyName = currencyUnits[i][0];
        let currencyValue = currencyUnits[i][1];
        let currencyAvailable = cid.find(element => element[0] === currencyName)[1];
        let currencyToReturn = 0;

        while (changeDue >= currencyValue && currencyAvailable > 0) {
            changeDue -= currencyValue;
            currencyAvailable -= currencyValue;
            currencyToReturn += currencyValue;
            changeDue = parseFloat(changeDue.toFixed(2));
        }

        if (currencyToReturn > 0) {
            changeArr.push([currencyName, currencyToReturn]);
        }
    }

    if (changeDue > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    return { status: "OPEN", change: changeArr };
}
