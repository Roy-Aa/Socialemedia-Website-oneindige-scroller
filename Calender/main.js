document.addEventListener('DOMContentLoaded', function () {
    const headerMaand = document.querySelector('.maand');
    const headerJaar = document.querySelector('.jaar');
    const prevYearBtn = document.querySelector('.prev-year');
    const nextYearBtn = document.querySelector('.next-year');
    const mainGrid = document.querySelector('.main-grid');

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth(); 

    
    function updateCalendar() {
        
        mainGrid.innerHTML = '';

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const startDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

        let startingDay = startDayOfWeek - 1;
        if (startingDay < 0) {
            startingDay += 7;
        }

        for (let i = 0; i < startingDay; i++) {
            const emptyBlock = document.createElement('figure');
            emptyBlock.classList.add('main-grid-blocks');
            mainGrid.appendChild(emptyBlock);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const gridBlock = document.createElement('figure');
            gridBlock.classList.add('main-grid-blocks');
            gridBlock.textContent = day;
            mainGrid.appendChild(gridBlock);
        }
    }

    function updateHeader() {
        const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
        headerMaand.textContent = months[currentMonth];
        headerJaar.textContent = currentYear;
    }


    updateCalendar();
    updateHeader();


    prevYearBtn.addEventListener('click', function () {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        updateCalendar();
        updateHeader();
    });

    nextYearBtn.addEventListener('click', function () {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        updateCalendar();
        updateHeader();
    });
});
