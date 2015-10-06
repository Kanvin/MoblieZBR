require(['backbone'], function(backbone) {
    var one = $('.wrapper').data('first');


    $('.li').add('p').css({
        'background': 'green',
        'border': '.2rem solid black'

    });
    $.camelCase('hello-there');


    $('#first_text').prop('readOnly', true);
    $("input").trigger('focus');

    var formArray = $('form').serializeArray();

    var first_obj = {
            name: "first_object"
        },
        printMyname = function() {
            alert("Hello My name is" + this.name);
        }

    $('#first_submit').on('click', $.proxy(printMyname, first_obj));

    $("#first_form input").on('change', function() {
        formArray = $('form').serializeArray();
        console.dirxml(getFormJson('#first_form');
    });

     //将表单转换成数组
    function getFormJson(form) {
        var o = {};
        var a = $(form).serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }

})
