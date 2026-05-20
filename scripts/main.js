function toggleModule(element) {
    const isActive = element.classList.contains('active');

    document.querySelectorAll('.module').forEach(mod => {
        mod.classList.remove('active');
    });

    if (!isActive) {
        element.classList.add('active');
    }
}

function openTab(evt, tabName) {
    evt.stopPropagation();

    const tabsContainer = evt.target.closest('.module-content');
    const contents = tabsContainer.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
    }

    const buttons = tabsContainer.getElementsByClassName("tab-btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");
    evt.target.classList.add("active");
}
