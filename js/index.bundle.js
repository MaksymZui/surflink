'use strict';

// Mob menu

const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__mob');
const body = document.body;
const menuCloses = document.querySelector('.header__mob-closes');
const allLinks = document.querySelectorAll('a[href^="#"]');

burger.addEventListener('click', () => {
  menu.classList.toggle('active');
  body.classList.toggle('no-scroll');
});

menuCloses.addEventListener('click', () => {
  if (menu.classList.contains('active') && body.classList.contains('no-scroll')) {
    menu.classList.remove('active');
    body.classList.remove('no-scroll');
  }
});

allLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    if (menu.classList.contains('active') && body.classList.contains('no-scroll')) {
      menu.classList.remove('active');
      body.classList.remove('no-scroll');
    }
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Mob menu

// form

const hoverBlock = document.querySelector('.advertiser');
const hoverImages = document.querySelectorAll('.advertiser__img--anim');

if (window.innerWidth > 768) {
  hoverBlock.addEventListener('mousemove', (e) => {
    const rect = hoverBlock.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const moveX = (mouseX / rect.width - 0.5) * 60;
    const moveY = (mouseY / rect.height - 0.5) * 60;

    hoverImages[0].style.transform = `translate(${moveX}px, ${moveY}px)`;
    hoverImages[1].style.transform = `translate(${-moveX}px, ${-moveY}px)`;
  });

  hoverBlock.addEventListener('mouseout', () => {
    hoverImages.forEach(img => {
      img.style.transform = 'translate(0, 0)';
    });
  });
}


// form

const modal = document.querySelector(".modal");
const madalCloses = document.querySelector(".modal__closes");

madalCloses.addEventListener('click', () => {
  modal.classList.remove('active');
});


const TOKEN = '1623826213:AAGKzroQounl9BI05goNqhuLpZo7C-9Lj_c';
const ID = '@ordermygolos';
const API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

const form = document.querySelector(".form");

form.addEventListener('submit', sendEmailTelegram);

async function sendEmailTelegram(event) {
  event.preventDefault();

  const formBtn = document.querySelector(".form__btn button");

  const { name, company, telegram, message } = Object.fromEntries(new FormData(form).entries());
  const text = `Заявка от ${name}!\nКомпания: ${company}\nTelegram: ${telegram}\nText: ${message}`;

  try {
    formBtn.textContent = 'Dispatch';
    const response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: ID,
        text,
      })
    });

    if (response.ok) {
      form.reset();
      formBtn.textContent = 'Send';
    } else {
      throw new Error(response.statusText);
    }

  } catch (error) {
    console.error(error);
  } finally {
    const modal = document.querySelector(".modal");
    modal.classList.add('active');

    setTimeout(function () {
      modal.classList.remove('active');
    }, 8000);
  }

  // fbq('track', 'Lead');
}

// form 2

const btnModalActive = document.querySelector('.affilate__btn');
const modalTwo = document.querySelector('.modal__form');
const modalTwoCloses = document.querySelector('.modal__form-closes');

btnModalActive.addEventListener('click', () => {
  modalTwo.classList.add('active');
})
modalTwoCloses.addEventListener('click', () => {
  modalTwo.classList.remove('active');
})

const formTwo = document.querySelector(".form__modal");

formTwo.addEventListener('submit', sendEmailTelegramTwo);

async function sendEmailTelegramTwo(event) {
  event.preventDefault();

  const formBtn = document.querySelector(".form__modal-btn button");

  const formData = new FormData(formTwo);
  const { name, address, instant, id, message } = Object.fromEntries(formData.entries());
  const text = `Заявка от ${name}!\nEmail: ${address}\nInstant Messenger: ${instant}\nMessage Id: ${id}\nMessage: ${message}`;

  try {
    formBtn.textContent = 'Dispatch';
    const response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: ID,
        text,
      })
    });

    if (response.ok) {
      formTwo.reset();
      formBtn.textContent = 'Send';
    } else {
      throw new Error(response.statusText);
    }

  } catch (error) {
    console.error(error);
  } finally {
    document.querySelector('.modal__form').classList.remove('active');
    const modal = document.querySelector(".modal");
    modal.classList.add('active');

    setTimeout(function () {
      modal.classList.remove('active');
    }, 8000);
  }

  // fbq('track', 'Lead');
}
