var ItoApiKey;

chrome.storage.sync.get({
    api_key: ''
}, function (items) {
    ItoApiKey = items.api_key;
});


var
    fastboatBookingCode = document.getElementById('fastboat-booking-code'),
    fastboatGo = document.getElementById('fastboat-go'),
    fastboatEditorUrl = '/module/fastboat/admin/editor.reservations.php?action=edit&reservation_id=',
    fastboatDomains = {

        "LTTFB": "https://www.lomboktourtravel.com",
        "BGFB": "http://book.bali-gili.com",
        "GIFB": "https://book.giliislandfastboats.com",
        "KCFB": "https://tiket.kapalcepat.com",
        "BTGFB": "http://book.balitogilis.com",

        "LRFB": "https://book.lombokreisen.com",
        "LBKFB": "https://book.lombokfastboats.com",
        "LEFB": "https://book.lembonganexpress.com",
        "PEFB": "https://book.penidaexpress.com",

        "LOTFB": "https://lastonetours.com",
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
    xhttp.open("GET", "https://www.indotravelonline.com/currency/api/convert?api_key=" + ItoApiKey + "&currency_id_from=" + currencyFrom.value + "&currency_id_to=" + currencyTo.value + "&amount=" + currencyAmount.value + "&formatted=1", true);
    xhttp.send();
});