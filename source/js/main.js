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

const receipt = {
    Items: [//товарные позиции
        {
            label: `Оплата товара: ${goodName.value}`, //наименование товара
            price: 300.00, //цена
            quantity: 3.00, //количество
            amount: +amountSum.value, //сумма
            vat: 20, //ставка НДС
            method: 0, // тег-1214 признак способа расчета - признак способа расчета
            object: 0, // тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
        }
    ],
    taxationSystem: 0, //система налогообложения; необязательный, если у вас одна система налогообложения
    email: customerMail.value, //e-mail покупателя, если нужно отправить письмо с чеком
    phone: customerPhone.value, //телефон покупателя в любом формате, если нужно отправить сообщение со ссылкой на чек
    isBso: false, //чек является бланком строгой отчётности
    amounts:
    {
        electronic: +amountSum.value, // Сумма оплаты электронными деньгами
        advancePayment: 0.00, // Сумма из предоплаты (зачетом аванса) (2 знака после запятой)
        credit: 0.00, // Сумма постоплатой(в кредит) (2 знака после запятой)
        provision: 0.00 // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после запятой)
    }
};

const data = {
    cloudPayments: {
        recurrent: { 
            interval: 'Week', 
            period: 1, 
            customerReceipt: receipt
        }
    },
    phone: customerPhone.value
};

const widget = new cp.CloudPayments();

const displayStatus = (message, elem, form) => {
    form.classList.add('form_hide');
    elem.innerText = message;
    elem.classList.add('status_visible');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    widget.charge({
            publicId: 'pk_cb9244c0ae3c52c954604718ef0f4',
            description: `Подписка: ${goodName.value} `,
            amount: +amountSum.value,
            currency: 'RUB',
            invoiceId: 'Заказ номер 1',
            email: customerMail.value,
            accountId: customerName.value,
            skin: "mini",
            data: data
        },
        () => {
            displayStatus(statusText.success, statusBlock, form);
        },
        () => {
            displayStatus(statusText.fail, statusBlock, form);
        }
    );
}); 
