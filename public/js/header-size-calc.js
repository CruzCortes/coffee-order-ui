function calculateHeaderHeight() {
    const header = document.querySelector('header'); 
    const mainContent = document.querySelector('.main-content');
    const headerHeight = header.offsetHeight;
    mainContent.style.paddingTop = `${headerHeight}px`;
  }
  document.addEventListener('DOMContentLoaded', calculateHeaderHeight);
  window.addEventListener('resize', calculateHeaderHeight);