(() => {
    $(document).ready(function () {
        let cardButton = $('.choose-macaroons__card_button');

        $('#burger').click(() => {
            $('#header__menu_list').addClass('open');
        })

        $.each($('#header__menu_list *'), function (index) {
            $('#header__menu_list *').eq(index).click(() => {
                $('#header__menu_list').removeClass('open');
            })
        })

        $('.phoneNumberInput').mask("+375 (999) 999-99-99");
        let url = 'https://testologia.site/checkout';
        let orderInput = $(".order__text-form > input");
        let orderForm = $(".order__text");
        let postOrder = $(".postForm");
        let submitFormButton = $(".order-form__button");
        let invalidFB = $('.invalid-fd');
        let orderInputProduct = $(".order__text-form > input[name='product']");
        let orderInputName = $(".order__text-form > input[name='name']");
        let orderInputPhone = $(".order__text-form > input[name='phone']");
        let loader = $("#loader");

        submitFormButton.click((event) => {
            let hasError = false;
            for (let i = 0; i < orderInput.length; i++) {
                if (!orderInput.eq(i).val()) {
                    orderInput.eq(i).addClass('form-control is-invalid');
                    invalidFB.eq(i).removeClass("d-none");
                    hasError = true;
                    event.preventDefault();
                }
            }
            event.preventDefault();
            if (!hasError) {
                loader.toggleClass('d-none');
                $.ajax({
                    method: 'POST',
                    url: url,
                    data: {
                        product: orderInputProduct.val(),
                        name: orderInputName.val(),
                        phone: orderInputPhone.val()
                    },
                    success: function (msg) {
                        loader.toggleClass('d-none');
                        if (($(msg).prop('success')) === 1) {
                            orderForm.addClass("d-none");
                            postOrder.removeClass("d-none");

                        } else {
                            alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
                        }


                    }

                })
            }
            event.preventDefault();

            setTimeout(()=>{
                orderInput.val('');
                orderForm.removeClass("d-none");
                postOrder.addClass("d-none");
            },5000)
        });

        orderInput.keydown(function () {
            $(this).removeClass("is-invalid");
            $(this).next('.invalid-fd').addClass("d-none");

        });

        cardButton.click((event) => {
            orderInputProduct.val($(event.target).parents('.choose-macaroons__card-buy').prev().text().toUpperCase());
            document.getElementById('3').scrollIntoView();
        })
    })
})()