// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(function () {
    var tableData = [
        {
            "name": "Gökhan Türkmen", "tckn": "2895441662", "phone": "5323335566", "birthPlace": "Kayseri", "children": [
                { "name": "Ahmet Yılmaz", "tckn": "98765432101", "phone": "5342227788", "birthPlace": "İstanbul" }
            ]
        },
        {
            "name": "Fatma Turunç", "tckn": "223123512412", "phone": "5335556644", "birthPlace": "Adana", "children": [
                { "name": "Ayşe Tok", "tckn": "22335578906", "phone": "5443215566", "birthPlace": "Mersin" }
            ]
        },
        {
            "name": "Mehmet Akın", "tckn": "12345678912", "phone": "5451112233", "birthPlace": "Ankara", "children": [
                { "name": "Mustafa Ok", "tckn": "55874698532", "phone": "5884136655", "birthPlace": "Ordu" }
            ]
        }
    ];

    tableData.forEach((person, index) => {
        $("#tableBody").append(`
                    <tr class="expandable" data-id="${index}">
                        <td class="expand-button">+</td>
                        <td>${person.name}</td>
                        <td><a href="#" class="tckn-link" data-info='${JSON.stringify(person)}'>${person.tckn}</a></td>
                        <td><a href="#" class="phone-link" data-info='${JSON.stringify(person)}'>${person.phone}</a></td>
                    </tr>
                `);

        person.children.forEach(child => {
            $("#tableBody").append(`
                        <tr class="details child-of-${index}" style="display: none;">
                            <td></td>
                            <td>${child.name}</td>
                            <td><a href="#" class="tckn-link" data-info='${JSON.stringify(child)}'>${child.tckn}</a></td>
                            <td><a href="#" class="phone-link" data-info='${JSON.stringify(child)}'>${child.phone}</a></td>
                        </tr>
                    `);
        });
    });

    $(document).on("click", ".expand-button", function () {
        var parentRow = $(this).closest("tr");
        var id = parentRow.data("id");
        $(".child-of-" + id).toggle();
    });

    $(document).on("click", ".tckn-link", function (e) {
        e.preventDefault();
        var data = JSON.parse($(this).attr("data-info"));
        $("#popupContent").html(`
                    <strong>Ad Soyad:</strong> ${data.name}<br>
                    <strong>TC No:</strong> ${data.tckn}<br>
                    <strong>Doğum Yeri:</strong> ${data.birthPlace}
                `);
        $("#infoPopup").fadeIn();
    });

    $(document).on("click", ".phone-link", function (e) {
        e.preventDefault();
        var data = JSON.parse($(this).attr("data-info"));
        $("#popupContent").html(`
                            <strong>Ad Soyad:</strong> ${data.name}<br>
                            <strong>Telefon:</strong> ${data.phone}<br>
                            <a href="tel:${data.phone}">Ara</a>
                        `);
        $("#infoPopup").fadeIn();
    });

    $(".close").click(function () {
        $("#infoPopup").fadeOut();
    });
});