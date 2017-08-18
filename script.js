const
    bookingCode = document.getElementById('booking-code'),
    go = document.getElementById('go'),
    fbEditor = '/module/fastboat/admin/editor.reservations.php?action=edit&reservation_id=',
    domains = {
        "LBKFB": "https://book.lombokfastboats.com",
        "GIFB": "https://book.giliislandfastboats.com",
        "BGFB": "http://book.bali-gili.com",
        "LEFB": "https://book.lembonganexpress.com",
        "LTTFB": "https://www.lomboktourtravel.com",
        "LRFB": "https://book.lombokreisen.com"
    }

go.addEventListener('click', function () {
    const
        codeFormat = bookingCode.value.match(/^[a-zA-Z]+/g)[0],
        numberFormat = bookingCode.value.match(/[0-9]+/g)[0];
    chrome.tabs.create({
        url: domains[codeFormat.toUpperCase()] + fbEditor + numberFormat
    });
});