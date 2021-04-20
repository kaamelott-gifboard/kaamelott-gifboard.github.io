window.onload = function () {
    let characterXhr = new XMLHttpRequest();
    let characterDiv = document.getElementById("characters");

    if (characterDiv) {
        characterXhr.onload = function () {
            let data = JSON.parse(characterXhr.responseText);

            data['characters'].forEach(function (character) {
                let link = document.createElement("a");
                let image = document.createElement("img");

                image.src = character.image;
                image.title = character.name;

                let current = characterDiv.getAttribute('data-current');

                if (character.name === current) {
                    image.classList.add('character-icon', 'icon-light-shadow')
                } else if (current === '') { // no selected characters
                    image.classList.add('character-icon', 'icon-dark-shadow')
                } else { // display unselected characters with filter
                    image.classList.add('character-icon', 'icon-dark-shadow', 'character-gray-filter')
                }

                link.href = character.url;
                link.appendChild(image);

                characterDiv.appendChild(link);
            });
        };

        characterXhr.open('GET', characterDiv.getAttribute('data-url'));
        characterXhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        characterXhr.send();
    }

    // ==================================================

    let countXhr = new XMLHttpRequest();
    let input = document.getElementById("quotes");

    if (input) {
        countXhr.onload = function () {
            let data = JSON.parse(countXhr.responseText);

            input.placeholder = 'Rechercher parmi près de '.concat(data, ' répliques...');
        };

        countXhr.open('GET', input.getAttribute('data-url'));
        countXhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        countXhr.send();
    }
};

// ==================================================

document.querySelectorAll('.square_btn').forEach(function (element) {
    element.addEventListener('click', function () {
        let dataId = element.getAttribute('data-id');

        document.getElementById(dataId + "-modal-img").src = document.getElementById(dataId + "-img").getAttribute('data-img');
        document.getElementById(dataId + "-modal").style.display = "block";
    });
});

document.querySelectorAll('.modal-close').forEach(function (element) {
    element.addEventListener('click', function () {
        element.parentNode.parentNode.style.display = "none";
    });
});

window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal-background').forEach(function (element) {
            element.style.display = "none";
        });
    }
})

// ==================================================

document.querySelectorAll('.sharing-btn').forEach(function (element) {
    element.addEventListener('click', function () {
        let button = this.parentNode.getElementsByTagName('button')[0];

        navigator.clipboard.writeText(button.value);

        let title = button.getAttribute('data-title');
        let notification = document.getElementById("notification");
        let text = title + ' copié !';

        if (button.getAttribute('data-type') === 'social') {
            text = 'Lien optimisé pour ' + title + ' copié !';
        }

        notification.innerText = text;
        notification.style.display = "block";

        setTimeout(function Remove() {
            notification.style.display = "none";
        }, 1500);
    });
});
