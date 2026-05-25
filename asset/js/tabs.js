const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabList = $$(".js-tabs");

tabList.forEach( (tabs) => {
    const tabButtons = tabs.querySelectorAll(".tab-button");
    const tabPanel = tabs.querySelectorAll(".tab-content__panel");

    function setActiveTab(id) {
        // xoa class
        tabButtons.forEach( tab => tab.classList.remove("active"));
        tabPanel.forEach( tab =>tab.classList.remove("active"));
        // Them class
        const activeBtn = tabs.querySelector(`[data-target="${id}"]`);
        if (activeBtn) activeBtn.classList.add("active");

        const activePanel = tabs.querySelector(`#${id}`);
        if (activePanel) activePanel.classList.add("active");
    }

    tabs.onclick = (event) =>{
    const tab = event.target.closest(".tab-button");
    if (!tab) return;

    const targetId  = tab.dataset.target;
    setActiveTab(targetId );
    }

    tabs.tabIndex = 0;

    tabs.onkeydown = (event) => {
        const valueKey = Number(event.key);
        
        if (valueKey >= 1 && valueKey <= tabButtons.length){
            const id = tabButtons[valueKey - 1].dataset.target;
            setActiveTab(id)
        }
    }

    
})

