(function () {
    function init() {
      const inlineArrow =
        document.getElementById('eduarrow') ||
        document.querySelector('.arrow-section a') ||
        document.querySelector('#relative.arrow') ||
        document.querySelector('a.arrow');
  
      if (!inlineArrow) return;
  
      const href = inlineArrow.getAttribute('href');
  
      if (document.getElementById('mobile-arrow-wrapper')) return;
  
      // Create a wrapper div that sits at the bottom of the page flow
      const wrapper = document.createElement('div');
      wrapper.id = 'mobile-arrow-wrapper';
  
      const mobileArrow = document.createElement('a');
      mobileArrow.href = href;
      mobileArrow.id = 'mobile-arrow';
  
      wrapper.appendChild(mobileArrow);
      const target = document.querySelector('section') || document.querySelector('main') || document.body;
      target.appendChild(wrapper);
  
      const style = document.createElement('style');
      style.textContent = `
        #mobile-arrow-wrapper {
          display: none;
          width: 100%;
          text-align: center;
          padding: 40px 0 32px 0;
        }
        #mobile-arrow {
          display: inline-block !important;
          border-color: #575757 !important;
          border-style: solid !important;
          border-width: 0 3px 3px 0 !important;
          padding: 10px !important;
          cursor: pointer !important;
          transform: rotate(45deg) !important;
          -webkit-transform: rotate(45deg) !important;
          animation: mobile-bounce 3s infinite !important;
          -webkit-animation: mobile-bounce 3s infinite !important;
        }
        @keyframes mobile-bounce {
          0%,20%,50%,80%,100% { transform: rotate(45deg) translateY(0); }
          40%                  { transform: rotate(45deg) translateY(12px); }
          60%                  { transform: rotate(45deg) translateY(6px); }
        }
      `;
      document.head.appendChild(style);
  
      function update() {
        const isMobile = window.innerWidth <= 900;
  
        const arrowParent = inlineArrow.parentElement;
        const arrowSection = document.querySelector('.arrow-section');
  
        if (arrowSection) {
          arrowSection.style.display = isMobile ? 'none' : '';
        } else if (arrowParent && arrowParent.children.length === 1) {
          arrowParent.style.display = isMobile ? 'none' : '';
        }
  
        inlineArrow.style.display = isMobile ? 'none' : '';
        wrapper.style.display = isMobile ? 'block' : 'none';
  
        // Stack project columns on mobile
        const projectRow = document.querySelector('div#relative.container.row');
        if (projectRow) {
          projectRow.style.flexDirection = isMobile ? 'column' : '';
          projectRow.style.alignItems = isMobile ? 'center' : '';
        }
      }
  
      update();
      window.addEventListener('resize', update);
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();