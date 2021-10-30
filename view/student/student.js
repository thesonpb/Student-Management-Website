
const addBtnQuestion = document.querySelector('.js-add-question')
const questionForm = document.querySelector('.js-question-form')
const formQuestionClose = document.querySelector('.js-close-btn')

const addBtnTodo = document.querySelector('.js-add-todo')
const todoForm = document.querySelector('.js-todo-form')
const formTodoClose = document.querySelector('.js-close-todo-btn')

function showQuestionForm() {
    if (!questionForm.classList.contains('open')) {
        questionForm.classList.add('open')
    } else {
        questionForm.classList.remove('open')
    }
}

function closeQuestionForm() {
    questionForm.classList.remove('open')
}

function showTodoForm() {
    if (!todoForm.classList.contains('open')) {
        todoForm.classList.add('open')
    } else {
        todoForm.classList.remove('open')
    }
}

function closeTodoForm() {
    todoForm.classList.remove('open')
}

addBtnQuestion.addEventListener('click', showQuestionForm)

formQuestionClose.addEventListener('click', closeQuestionForm)

addBtnTodo.addEventListener('click', showTodoForm)

formTodoClose.addEventListener('click', closeTodoForm)



const dropBtn = document.querySelector('.js-dropbtn')
const dropItem = document.querySelector('.js-drop-item')
const main = document.querySelector('#main')

function showDropdown() {
    if (!dropItem.classList.contains('open')) {
        dropItem.classList.add('open')
    } else {
        dropItem.classList.remove('open')
    }
}

function closeDropdown() {
    dropItem.classList.remove('open')
}

// main.addEventListener('click', closeDropdown)

dropBtn.addEventListener('click', showDropdown);


(function ($) {
    $('.nav li').click(function () {
        $(this).addClass('active')
        $('.nav li').not($(this)).removeClass('active');
        $('.main:nth-of-type(' + $(this).data('rel') + '').stop().fadeIn(400, 'linear').siblings('.main').stop().fadeOut(0, 'linear');
    });
})(jQuery);