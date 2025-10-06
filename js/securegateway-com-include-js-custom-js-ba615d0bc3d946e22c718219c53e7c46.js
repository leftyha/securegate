// JavaScript to handle custom select menu
const selectedItem = document.querySelector('.selected-item');
const dropdownItems = document.querySelectorAll('.dropdown-list-items li');

// Event listener to toggle dropdown visibility
selectedItem.addEventListener('click', function () {
    const dropdown = document.querySelector('.dropdown-list-items');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Event listener to update selected item
dropdownItems.forEach(item => {
    item.addEventListener('click', function () {
        selectedItem.textContent = item.getAttribute('data-value');
        document.querySelector('.dropdown-list-items').style.display = 'none';
    });
});


// JavaScript to handle custom select menu
const selectedItemFooter = document.querySelector('.selected-item-footer');
const dropdownItemsFooter = document.querySelectorAll('.dropdown-list-items-footer li');

// Event listener to toggle dropdown visibility
selectedItemFooter.addEventListener('click', function () {
    const dropdownFooter = document.querySelector('.dropdown-list-items-footer');
    dropdownFooter.style.display = dropdownFooter.style.display === 'block' ? 'none' : 'block';
});

// Event listener to update selected item
dropdownItemsFooter.forEach(item => {
    item.addEventListener('click', function () {
        selectedItemFooter.textContent = item.getAttribute('data-value');
        document.querySelector('.dropdown-list-items-footer').style.display = 'none';
    });
});


// const selectItem = document.querySelectorAll('.top-menu ul li');
// const setItem = document.querySelector('.header-holder');
// let timeoutId;

// selectItem.forEach(item => {
//     item.addEventListener('mouseover', function () {
//         setItem.classList.add('active');
//         clearTimeout(timeoutId); // Clear the timeout if it exists
//     });

//     item.addEventListener('mouseleave', function () {
//         timeoutId = setTimeout(() => {
//             setItem.classList.remove('active');
//         }, 200); // Delay in milliseconds
//     });
// });




const tabs = document.querySelectorAll('.nav-menu-tabs li');
const contents = document.querySelectorAll('.mega-menu-tab-content');

// Show the first tab content by default
document.getElementById('tab1').style.display = 'flex';


tabs.forEach(tab => {
    tab.addEventListener('mouseover', function () {
        const tabId = this.getAttribute('data-tab');
        contents.forEach(content => {
            content.style.display = 'none';

        });
        document.getElementById(tabId).style.display = 'flex';
        // Remove "active" class from all tabs
        tabs.forEach(t => {
            t.classList.remove('active');
        });

        // Add "active" class to the currently hovered tab
        this.classList.add('active');
    });
});


/////////////////Solution Mega Menu///////////////////

const tabsolution = document.querySelectorAll('.nav-solution-tabs li');
const solContents = document.querySelectorAll('.mega-solution-tab-content');

// Show the first tab content by default
document.getElementById('tab1').style.display = 'flex';


tabsolution.forEach(tab => {
    tab.addEventListener('mouseover', function () {
        const tabId = this.getAttribute('data-tab');
        solContents.forEach(content => {
            content.style.display = 'none';

        });
        document.getElementById(tabId).style.display = 'flex';
        // Remove "active" class from all tabs
        tabsolution.forEach(t => {
            t.classList.remove('active');
        });

        // Add "active" class to the currently hovered tab
        this.classList.add('active');
    });
});



/////////////Partner Mega Menu////////////////


const tabpartner = document.querySelectorAll('.nav-partner-tabs li');
const solPartner = document.querySelectorAll('.mega-partner-tab-content');

// Show the first tab content by default
document.getElementById('tab1').style.display = 'flex';


tabpartner.forEach(tab => {
    tab.addEventListener('mouseover', function () {
        const tabId = this.getAttribute('data-tab');
        solPartner.forEach(content => {
            content.style.display = 'none';

        });
        document.getElementById(tabId).style.display = 'flex';
        // Remove "active" class from all tabs
        tabpartner.forEach(t => {
            t.classList.remove('active');
        });

        // Add "active" class to the currently hovered tab
        this.classList.add('active');
    });
});

/////////////Customer Mega Menu////////////////


const tabcustomer = document.querySelectorAll('.nav-customer-tabs li');
const solCustomer = document.querySelectorAll('.mega-customer-tab-content');

// Show the first tab content by default
document.getElementById('tab1').style.display = 'flex';


tabcustomer.forEach(tab => {
    tab.addEventListener('mouseover', function () {
        const tabId = this.getAttribute('data-tab');
        solCustomer.forEach(content => {
            content.style.display = 'none';

        });
        document.getElementById(tabId).style.display = 'flex';
        // Remove "active" class from all tabs
        tabcustomer.forEach(t => {
            t.classList.remove('active');
        });

        // Add "active" class to the currently hovered tab
        this.classList.add('active');
    });
});


/////////////Resources Mega Menu////////////////


const tabresource = document.querySelectorAll('.nav-resource-tabs li');
const solResource = document.querySelectorAll('.mega-resource-tab-content');

// Show the first tab content by default
document.getElementById('tab1').style.display = 'flex';


tabresource.forEach(tab => {
    tab.addEventListener('mouseover', function () {
        const tabId = this.getAttribute('data-tab');
        solResource.forEach(content => {
            content.style.display = 'none';

        });
        document.getElementById(tabId).style.display = 'flex';
        // Remove "active" class from all tabs
        tabresource.forEach(t => {
            t.classList.remove('active');
        });

        // Add "active" class to the currently hovered tab
        this.classList.add('active');
    });
});




document.addEventListener('DOMContentLoaded', function () {
    const toggleMenus = document.querySelectorAll('.toggle-menu');

    toggleMenus.forEach((toggleMenu) => {
        toggleMenu.addEventListener('click', function (e) {
            e.preventDefault();
            const parentItem = this.closest('.mobile-sub-item');
            // Close all other open menus
            document.querySelectorAll('.mobile-sub-item').forEach(item => {
                if (item !== parentItem && item.classList.contains('open')) {
                    item.classList.remove('open');
                    item.querySelector('.mobile-sub-menu-item-list').style.maxHeight = '0';
                }
            });
            // Toggle the current menu
            const subMenuItemList = parentItem.querySelector('.mobile-sub-menu-item-list');
            if (parentItem.classList.contains('open')) {
                parentItem.classList.remove('open');
                subMenuItemList.style.maxHeight = '0';
            } else {
                parentItem.classList.add('open');
                subMenuItemList.style.maxHeight = subMenuItemList.scrollHeight + 'px';
            }
        });
    });
})






const links = document.querySelectorAll('.link');

links.forEach((link) => {
    link.addEventListener('mouseover', function (e) {
        const tooltipId = link.getAttribute('tooltip-target');
        const tooltip = document.getElementById(tooltipId);

        tooltip.style.display = 'block';
        tooltip.style.top = e.clientY + window.pageYOffset + 'px';
        tooltip.style.left = e.clientX + 'px';
        link.classList.add('hover');
    });

    link.addEventListener('mousemove', function (e) {
        const tooltipId = link.getAttribute('tooltip-target');
        const tooltip = document.getElementById(tooltipId);

        tooltip.style.top = e.clientY + window.pageYOffset + 'px';
        tooltip.style.left = e.clientX + 'px';
    });

    link.addEventListener('mouseout', function () {
        const tooltipId = link.getAttribute('tooltip-target');
        const tooltip = document.getElementById(tooltipId);

        tooltip.style.display = 'none';
        link.classList.remove('hover');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var dropdownItems = document.querySelectorAll('.dropdown-item');
    var effect = document.querySelectorAll('.link');

    dropdownItems.forEach(function (item) {
        item.addEventListener('mouseover', function () {
            var targetCity = this.getAttribute('target-city');
            var tooltip = document.getElementById(targetCity);
            tooltip.style.display = 'block';
            
          
        });

        item.addEventListener('mouseout', function () {
            var targetCity = this.getAttribute('target-city');
            var tooltip = document.getElementById(targetCity);
            tooltip.style.display = 'none';
        });
    });
});


jQuery(window).scroll(function(){
    var sticky = jQuery('.header-holder'),
        scroll = jQuery(window).scrollTop();
  
    if (scroll >= 100) sticky.addClass('header-fixed');
    else sticky.removeClass('header-fixed');
  });

jQuery(document).ready(function () {
    jQuery(".top-menu ul li").on("mouseover", function (e) {
        jQuery(".top-nav-items").removeClass("nav-active"),
            jQuery(this).addClass("nav-active"),
            jQuery(".header-holder, .nav-ovelay-background").addClass("nav-active"),
            jQuery(this).removeClass("nav-active")

    })

    jQuery(".nav-ovelay-background").on("mouseover", function (e) {

        jQuery(".header-holder, .nav-ovelay-background").removeClass("nav-active"),
            jQuery(this).removeClass("nav-active")

    })

    jQuery(".sub-dropdown>a").click(function () {
        jQuery(this).next('.mobile-sub-menu').toggleClass('open');
    });

    jQuery(".mobile-sub-menu-head").click(function () {
        jQuery(this).parent('.mobile-sub-menu').toggleClass('open');
    });
    jQuery(".mobile-toggle").click(function () {
        jQuery('.mobile-menu').toggleClass('open');
        jQuery('.nav-ovelay-background').toggleClass('nav-active-mobile')
    });

    jQuery(".close-menu,.nav-ovelay-background").click(function () {
        jQuery('.mobile-menu, .mobile-sub-menu').removeClass('open');
        jQuery('.nav-ovelay-background').removeClass('nav-active-mobile')
    });

    })