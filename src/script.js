var ItoUser, ItoPass;

chrome.storage.sync.get({
    username: '',
    password: ''
}, function (items) {
    ItoUser = items.username;
    ItoPass = items.password;
});


var
    fastboatBookingCode = document.getElementById('fastboat-booking-code'),
    fastboatGo = document.getElementById('fastboat-go'),
    fastboatEditorUrl = '/module/fastboat/admin/editor.reservations.php?action=edit&reservation_id=',
    fastboatDomains = {
        "LBKFB": "https://book.lombokfastboats.com",
        "GIFB": "https://book.giliislandfastboats.com",
        "BGFB": "http://book.bali-gili.com",
        "LEFB": "https://book.lembonganexpress.com",
        "LTTFB": "https://www.lomboktourtravel.com",
        "LRFB": "https://book.lombokreisen.com",
        "LOT": "https://lastonetours.com",
        "LOTFB": "https://lastonetours.com",
        "BTGFB": "http://book.balitogilis.com"
    }

fastboatGo.addEventListener('click', function () {
    var
        codeFormat = fastboatBookingCode.value.match(/^[a-zA-Z]+/g)[0],
        numberFormat = fastboatBookingCode.value.match(/[0-9]+/g)[0];
    chrome.tabs.create({
        url: fastboatDomains[codeFormat.toUpperCase()] + fastboatEditorUrl + numberFormat
    });
});


var
    currencyGo = document.getElementById('currency-go'),
    currencyAmount = document.getElementById('currency-amount'),
    currencyFrom = document.getElementById('currency-from'),
    currencyTo = document.getElementById('currency-to'),
    currencyResult = document.getElementById('currency-result');

currencyGo.addEventListener('click', function (e) {
    e.preventDefault();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            currencyResult.innerHTML = data.result;
        }
    };
    xhttp.open("GET", "https://bank-data.indotravelonline.com/currency/api/convert?username=" + ItoUser + "&password=" + ItoPass + "&currency_id_from=" + currencyFrom.value + "&currency_id_to=" + currencyTo.value + "&amount=" + currencyAmount.value + "&formatted=1", true);
    xhttp.send();
});