//#region general
let windowSize = $(window).width();
//#endregion

//#region currency functions
function toCurrency(number) {
    if (number == 0)
        return number;
    if (!number)
        return 0;
    number = number.toString().replace(/,/g, '');
    if (number.length > 3) {
        var mod = number.length % 3;
        var output = mod > 0 ? number.substring(0, mod) : '';
        for (var i = 0; i < Math.floor(number.length / 3); i++) {
            if (mod === 0 && i === 0)
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            else
                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return output;
    }
    return number;
};
function toNumber(currency) {
    return currency.toString().replace(/,/g, '');
};
//#endregion

//#region input search focus
function inputFocus(e) {
    $(e.currentTarget).parent().parent().toggleClass("focus");
}

if (windowSize > 768) {
    $("input[name='search']").on("focus", (e) => {
        inputFocus(e);
    });

    $("input[name='search']").on("blur", (e) => {
        inputFocus(e);
    });
}
//#endregion

//#region input with floating label
function floatLabel(e) {
    if (e.currentTarget.value == "") {
        $(e.currentTarget).parent().find("label[for]").toggleClass("focus");
    }
}

$("input.form-control,textarea.form-control").on("focus", (e) => {
    floatLabel(e);
});

$("input.form-control,textarea.form-control").on("blur", (e) => {
    floatLabel(e);
});
//#endregion

//#region select2
function refreshSlc(target) {
    $(`${target}`).select2({
        dir: "rtl",
        language: {
            noResults: () => {
                return "موردی یافت نشد ..."
            }
        }
    });

    $('b[role="presentation"]').hide();
    $('.select2-selection__arrow').html("");
    $('.select2-selection__arrow').append('<i class="fas fa-chevron-down"></i>');
};
//#endregion

$(() => {
    //#region auto close alert
    window.setTimeout(function () {
        $("alert").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 4000);
    //#endregion

    //#region file upload
    $(document).on("click", ".browse", function () {
        var file = $(this).parent().find(".file");
        file.trigger("click");
    });

    $('input[type="file"]').change(function (e) {
        let reader = new FileReader(),
            preview = $(e.target).attr("preview");
        reader.onload = function (e) {
            // get loaded data and render thumbnail.
            $(`#${preview}`).attr("src", e.target.result).removeClass("d-none");
        };
        // read the image file as a data URL.
        if (this.files.length > 0) {
            reader.readAsDataURL(this.files[0]);
        }
    });
    //#endregion
});