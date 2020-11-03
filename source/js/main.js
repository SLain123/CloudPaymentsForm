const form = document.querySelector(`.form`);
const customerName = form.querySelector(`#name`);
const customerPhone = form.querySelector(`#phone`);
const goodName = form.querySelector(`#good`);
const amountSum = form.querySelector(`#amount`);
const customerMail = form.querySelector(`#mail`);
const customerChar = form.querySelector(`#char`);
const statusBlock = document.querySelector('.status');

const statusText = {
    success: "Спасибо за ваше пожертвование",
    fail: "Оплата провалена"
}
const widget = new cp.CloudPayments();

const displayStatus = (message, elem, form) => {
    form.classList.add('form_hide');
    elem.innerText = message;
    elem.classList.add('status_visible');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = {
        "phone": customerPhone.value
    }

    widget.pay('auth',
        {
            publicId: 'pk_cb9244c0ae3c52c954604718ef0f4',
            description: `Оплата товара: ${goodName.value}`,
            amount: +amountSum.value,
            currency: 'RUB',
            invoiceId: 'Заказ номер 1',
            email: customerMail.value,
            accountId: customerName.value,
            skin: "mini",
            data: data
        },
        {
            onSuccess: function () {
                displayStatus(statusText.success, statusBlock, form);
            },
            onFail: function () {
                displayStatus(statusText.fail, statusBlock, form);
            }
        })
}); 