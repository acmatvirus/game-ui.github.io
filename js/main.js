function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const FUNC = {
    load_first: function () {
        setTimeout(function () {
            $("main").addClass('active');
            let user = getCookie('username');
            if (user != "") {
                $(".box").addClass('d-none');
                $(".tab").removeClass('d-none');
            };
        }, 0);
    },
    creator: function () {
        $(document).on("click", '#creator', function (e) {
            $(this).parent().parent().addClass('animate animate-fade-out');
            setTimeout(function () {
                $(".box").addClass('d-none');
                $(".tab").removeClass('d-none');
            }, 600);

            let nameCha = $(".nes-input").val();
            let nameimgCha = $(".box input:checked").val();
            let imgCha = $(".box input:checked").parent().find('img').attr('src');
            setCookie('username', nameCha, 3600);
            setCookie('nameCha', nameimgCha, 3600);
            setCookie('imageCha', imgCha, 3600);
        });
        $(document).on("click", '#play', function (e) {
            $(".tab").addClass('animate animate-fade-out');
            setTimeout(function () {
                $(".tab").addClass('d-none');
                $(".main").removeClass('d-none');
            }, 600);
        });
        $(document).on("click", '.attack .close', function (e) {
            $(".attack").addClass('d-none');
        });
    },
    init: function () {
        FUNC.load_first();
        FUNC.creator();
    }
};

$(document).ready(function () {
    FUNC.init();
});