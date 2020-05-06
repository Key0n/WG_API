$(document).ready(function () {
    $('#get_resp').click(function () {
        var username = $('#username').val();

        $.ajax({
            url: `/api/info/${username}/`,
            success: function (data) {
                let tables = ''
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        tables += '<table>';
                        for (let table_key in data[key]) {
                            tables += `<tr>
                                    <th>${table_key}</th>
                                    <td>${data[key][table_key]}</td>
                                </tr>`
                        }
                    }
                    tables += '</table>'
                }
                $('#tables').html(tables);
            },
            error: function (data) {
                $('#tables').html(`<p>${data.statusText}</p>`)
            }
        });


    });
});