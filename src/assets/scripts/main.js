var mediaQueryPc = window.matchMedia("screen and (min-width: 992px)");

$(document).ready(function () {
    //______________________________Apply wow smooth scroll and effect for element____________________
    wow = new WOW({
        mobile: false
    });
    wow.init();

    //_____________________________Apply select2 for select/option____________________________________
    $('.select-services').select2({
        placeholder: {
            id: '-1', // the value of the option
            text: 'Chọn dịch vụ'
        }
    });

    //___________________________ Input only number___________________________________________________
    $('.item-details .input-group input, .otp-input').on('input', function (event) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});
//________________________________Handle box event when click radio button____________________________
$(document).on('click', '.vtp-wrap-box-item .box-item input[type=radio]', function () {
    $(this).parents('.box-item').find('.item-details').fadeOut();
    $(this).parents('.box-item').find('.item').removeClass('active');
    $(this).parents('.box-item').addClass('active');
    $(this).parents('.item').addClass('active');
    $(this).parents('.box-item').find('.item-details[for=' + $(this).attr('id') + ']').fadeIn();
    $('.vtp-mobile-menu-overlay').addClass('active');
});

//______________________________Handle check amount button event______________________________________
$(document).on('click', '.item-details .btn-check', function () {
    $(this).hide();
    $(this).parents('.item-details').find('.checkAmount').addClass('active');
    $(this).parents('.item-details').find('.amount').fadeIn();
})

//_____________________________Handle hamburger button event__________________________________________
$(document).on('click', '.vtp-mobile-menu-icon', function () {
    $('.vtp-header-left-block').addClass('active');
    $('.vtp-mobile-menu-overlay').addClass('active');
})

//______________________________Handle over div________________________________________________________
$(document).on('click', '.vtp-mobile-menu-overlay.active', function () {
    $('.vtp-header-left-block').removeClass('active');
    $(this).toggleClass('active');
    $(this).parents('.vtp-body').find('.item-details').fadeOut();
    $(this).parents('.vtp-body').find('.vtp-wrap-box-item .box-item.active').removeClass('active');
})

//______________________________Handle button close popup_____________________________________________
$(document).on('click', '.close-popup', function () {
    $(this).parents('.vtp-wrap-box-item').find('.box-item').removeClass('active');
    $(this).parents('.vtp-wrap-box-item').find('.item-details').fadeOut();
    $('.vtp-mobile-menu-overlay').removeClass('active');
});

//_____________________________Handle event focusout input of white box______________________________
$(document).on('focusout, change', '.item-details input, .item-details select', function () {
    var isValid = true;
    $(this).parents('.item-details').find("input").each(function () {
        if (validateText($(this)) == 0) {
            isValid = false;
        }
    });
    if (isValid && validateSelect($(this).parents('.item-details').find('.select-services')) == 1) {
        $(this).parents('.item-details').find('.button-bar').addClass('active');
        $(this).removeClass('required');
    } else {
        $(this).parents('.item-details').find('.button-bar').removeClass('active');
        $(this).addClass('required');
    }
})

//_______________________________Handle event for login page___________________________________________
//Back step button
$(document).on('click', '.btn-back-step', function () {
    $(this).parents('.vtp-login').css("z-index", 0);
})

//______________________________Handle checkbox term and condition______________________________________
$(document).on('click', '.term-and-condition input[type=checkbox]', function () {
    if ($(this).is(':checked')) {
        $(this).parents('.vtp-login').find('.btn-login-complete').removeClass('disabled');
    }
    else {
        $(this).parents('.vtp-login').find('.btn-login-complete').addClass('disabled');
    }
})

/*_______________________________________Login mobile_________________________________________________*/
//Login by tele number
$(document).on('click', '.btn-login-mobile', function () {
    $('.vtp-login-second-mobile').css('z-index', parseInt($(this).parents('.vtp-login').css('z-index')) + 1);
});
//Input telephone number and next
$(document).on('click', '.btn-continue-step', function () {
    //If tele number existed -> OTP
    var existTele = false;
    if (existTele == false) {
        $('.vtp-login-second-mobile-otp').css('z-index', parseInt($(this).parents('.vtp-login').css('z-index')) + 1).addClass('new-account');
    }

        // else go to input password
    else {
        $('.vtp-login-mobile-psw').css('z-index', parseInt($(this).parents('.vtp-login').css('z-index')) + 1);
    }
});
//Fill password if account existed and next to homepage
$(document).on('click', '.login-otp', function () {
    $('.vtp-login-second-mobile-otp').css('z-index', parseInt($(this).parents('.vtp-login').css('z-index')) + 1);
});
//Step 3 - Fill OTP
$(document).on('click', '.vtp-login-second-mobile-otp .btn-login', function () {
    //If new account -> create password page 
    if ($(this).parents('.vtp-login').hasClass('new-account')) {
        $('.vtp-create-password').css('z-index', parseInt($(this).parents('.vtp-login').css('z-index')) + 1);
    }
        //else redirect to homepage
    else {
        window.location.replace("google.com.vn");
    }
})

//Create password -> input personal info
$(document).on('click', '.vtp-create-password .btn-login', function () {
    $('.vtp-personal-info').css('z-index', parseInt($(this).parents('.vtp-login').css('z-index')) + 1);
})

//Complete personal info and redirect to homepage
$(document).on('click', '.btn-login-complete', function () {
    $('.vtp-login-form').css('z-index', parseInt($(this).parents('.vtp-login').css('z-index')) + 1);
})

/*_________________________________________Login account________________________________________________*/
//Step 1 - Login account
$(document).on('click', '.btn-login-account', function () {
    $('.vtp-login-form').css('z-index', parseInt($(this).parents('.vtp-login').css('z-index')) + 1);
});

//_____________________________Show password event______________________________________________________
$(document).on('click', '.show-password', function () {
    var x = $(this).parents('.form-group').find('input.vtp-password')[0];
    if (x.type === "password") {
        x.type = "text";
        $(this).addClass('active');
    } else {
        x.type = "password";
        $(this).removeClass('active');
    }

})

function validateSelect(ele) {
    if ($(ele).find('option:selected').val().trim().toLowerCase() != 'select an option') {
        return 1;
    }
    else {
        return 0;
    }
}

//______________________________function validate text empty_______________________________________
function validateText(e) {
    if ($(e).val().trim() != '') {
        return 1;
    }
    else {
        return 0;
    }
}

//__________________________________________________________________________________________________