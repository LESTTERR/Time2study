// script.js
// Handles tab clicks (navigates to pages) and FAB toggle

document.addEventListener("DOMContentLoaded", function () {
  // Tab Navigation: redirect instead of in-page toggle
  document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;                // e.g. "taskSection"
      const page = target.replace('Section', '').toLowerCase() + '.html';
      window.location.href = page;                      // navigate to separate HTML
    });
  });

  // Floating Action Button (FAB)
  const fabMain = document.getElementById('fabMain');
  const fabOptions = document.querySelector('.fab-options');
  if (fabMain) {
    fabMain.addEventListener('click', () => {
      fabMain.classList.toggle('active');
      fabOptions.classList.toggle('show-options');
    });
  }

  // Calendar expand and dates generation (only on home.html)
  const calendarCard = document.getElementById('calendarCard');
  if (calendarCard) {
    calendarCard.addEventListener('click', () => {
      calendarCard.classList.toggle('expanded');
    });
    const datesGrid = document.getElementById('datesGrid');
    const now = new Date();
    const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= days; i++) {
      const span = document.createElement('span');
      span.textContent = i;
      datesGrid.appendChild(span);
    }
  }
});

