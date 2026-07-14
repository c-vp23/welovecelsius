document.addEventListener("DOMContentLoaded",function(){if(window.innerWidth>749)return;const searchToggle=document.querySelector("summary.header__icon--search"),searchModal=document.querySelector(".search-modal, .search-modal__content, details-modal.header__search");if(!searchToggle||!searchModal)return;const overlay=document.createElement("div");overlay.id="mobile-search-overlay",overlay.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 9999;
    padding: 20px;
    display: none;
    overflow-y: auto;
  `;const header=document.createElement("div");header.style.cssText=`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `;const title=document.createElement("h2");title.textContent="Search";const closeButton=document.createElement("button");closeButton.innerHTML="\u2715",closeButton.style.cssText=`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 10px;
  `;const originalForm=document.querySelector("form.search");let searchForm;if(originalForm){searchForm=originalForm.cloneNode(!0);const input=searchForm.querySelector('input[type="search"]');input&&(input.style.width="100%",input.style.fontSize="16px",input.style.padding="12px 40px 12px 12px")}header.appendChild(title),header.appendChild(closeButton),overlay.appendChild(header),searchForm&&overlay.appendChild(searchForm),document.body.appendChild(overlay),searchToggle.addEventListener("click",function(e){if(window.innerWidth<=749){e.preventDefault(),e.stopPropagation();const detailsElement=searchToggle.closest("details, details-modal");detailsElement&&detailsElement.removeAttribute("open"),overlay.style.display="block";const input=overlay.querySelector('input[type="search"]');return input&&setTimeout(()=>input.focus(),100),!1}},!0),closeButton.addEventListener("click",function(){overlay.style.display="none"}),searchForm&&searchForm.addEventListener("submit",function(e){e.preventDefault();const input=this.querySelector('input[type="search"]');input&&input.value&&(window.location.href=`/search?q=${encodeURIComponent(input.value)}&type=product`)})});
//# sourceMappingURL=/cdn/shop/t/2/assets/search-fix.js.map?v=161141293800556482731742412441
