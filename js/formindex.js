jQuery(document).ready(function($) {

    $(".ajax-contact-form").submit(function() {
    var str = $(this).serialize();

    $.ajax({
        type: "POST",
        url: "contact.php",
        data: str,
        success: function(msg) {
            if(msg == 'OK') {
                result = '<p>Ваше сообщение отправлено. Специалист скоро свяжется с Вами</p>';
                $(".fields").hide();
                $("#name").val('');
                $("#phone").val('');
                $('textarea').val('')
            } 
            else {
            result = msg;
            }
            $('.from-message').html(result);
        }
        });
        return false;
        });
    });